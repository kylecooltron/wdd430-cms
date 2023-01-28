import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    /**
     * Returns array of all documents
     */
    return this.documents;
  }

  getDocument(id: string): Document | undefined {
    /**
     * Finds a single document with given id
     * Returns null if no document was found
     */
    return this.documents.find(document => document.id == id)
  }

}
