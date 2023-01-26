import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { test_documents } from '../test_documents';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  documents: Document[] = [];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {
    // use test contact list
    this.documents = test_documents;
  }

  public onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
