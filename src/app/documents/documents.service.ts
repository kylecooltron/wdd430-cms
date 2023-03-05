import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirebaseService } from '../firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient, private firebase: FirebaseService) {
    this.maxDocumentId = this.getMaxId(this.documents);
  }

  getDocuments() {
    /**
     * Returns array of all documents
     */
    this.http.get<Document[]>(this.firebase.getUrl(this.firebase.DOCUMENTS_TABLE)).subscribe(
      {
        next: (documents: Document[]) => {
          this.documents = documents.sort();
          this.maxDocumentId = this.getMaxId(this.documents);
          this.documentListChangedEvent.next(this.documents.slice());
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

  storeDocuments() {
    this.http.put(
      this.firebase.getUrl(this.firebase.DOCUMENTS_TABLE),
      JSON.stringify(this.documents),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).subscribe(
      () => {
        this.documentListChangedEvent.next(this.documents.slice());
      }
    )
  }

  getDocument(id: string): Document | undefined {
    /**
     * Finds a single document with given id
     * Returns null if no document was found
     */
    return this.documents.find(document => document.id == id)
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }


  getMaxId(documentList: Document[]): number {
    return Math.max(...documentList.map(o => +o.id));
  }

  addDocument(newDocument: Document) {
    if (newDocument == null) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document | undefined, newDocument: Document | undefined) {
    if (originalDocument == null || newDocument == null) {
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

}
