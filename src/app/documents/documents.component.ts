import { Component } from '@angular/core';
import { Document } from './document.model';
// import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: []
})
export class DocumentsComponent {
  selectedDocument: Document;

  constructor() { }

  ngOnInit() {
  }
}
