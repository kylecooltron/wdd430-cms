import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalhostService } from '../localhost.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient, private localhost: LocalhostService) {
    this.maxDocumentId = this.getMaxId(this.documents);
  }

  getDocuments() {
    /**
     * Returns array of all documents
     */
    this.http.get<Document[]>(this.localhost.getUrl(this.localhost.DOCUMENTS_TABLE)).subscribe(
      {
        next: (documents: Document[]) => {
          this.documents = documents;
          // this.documents = documents.sort();
          // this.maxDocumentId = this.getMaxId(this.documents);
          // this.documentListChangedEvent.next(this.documents.slice());
          this.sortAndSend();
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log("GET request complete.");
        }
      }
    )
  }

  // storeDocuments() {
  //   this.http.put(
  //     this.localhost.getUrl(this.localhost.DOCUMENTS_TABLE),
  //     JSON.stringify(this.documents),
  //     {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   ).subscribe(
  //     () => {
  //       this.documentListChangedEvent.next(this.documents.slice());
  //     }
  //   )
  // }

  sortAndSend() {
    this.documents.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string): Document | undefined {
    /**
     * Finds a single document with given id
     * Returns null if no document was found
     */
    return this.documents.find(document => document.id == id)
  }

  // deleteDocument(document: Document) {
  //   if (!document) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   // this.documentListChangedEvent.next(this.documents.slice());
  //   this.storeDocuments();
  // }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.localhost.getUrl(this.localhost.DOCUMENTS_TABLE) + document.id)
      .subscribe(
        (response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(documentList: Document[]): number {
    return Math.max(...documentList.map(o => +o.id));
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, document: Document }>(this.localhost.getUrl(this.localhost.DOCUMENTS_TABLE),
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  // updateDocument(originalDocument: Document | undefined, newDocument: Document | undefined) {
  //   if (originalDocument == null || newDocument == null) {
  //     return;
  //   }
  //   let pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   // this.documentListChangedEvent.next(this.documents.slice());
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document | undefined, newDocument: Document | undefined) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put(this.localhost.getUrl(this.localhost.DOCUMENTS_TABLE) + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

}
