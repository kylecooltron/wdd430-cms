import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { test_documents } from '../test_documents';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {

  documents: Document[] = [];
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();


  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );
  }


}
