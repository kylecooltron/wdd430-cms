import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: undefined | Document;
  document: undefined | Document;
  editMode: boolean = false;
  id: string;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (this.id == null) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
        if (this.originalDocument == null) {
          this.editMode = false;
          return;
        }
        this.editMode = true;
        this.document = structuredClone(this.originalDocument);
      })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      value.children,
    );
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.editMode = false;
    this.router.navigateByUrl('/documents');
  }


  onCancel() {
    this.router.navigateByUrl('/documents');
  }

}
