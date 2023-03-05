import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { test_documents } from '../test_documents';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  loading: boolean = false;

  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
  private subscription: Subscription;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.loading = true;
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
