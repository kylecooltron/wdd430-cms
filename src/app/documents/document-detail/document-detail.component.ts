import { Component } from '@angular/core';
import { Document } from '../document.model'
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  document: Document | undefined;
  nativeWindow: any;

  constructor(
    private documentService: DocumentsService,
    private windowService: WindRefService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.document = this.documentService.getDocument(params['id']);
        }
      );

    this.nativeWindow = this.windowService.getNativeWindow()
  }

  onView() {
    if (this.document) {
      this.nativeWindow.open(
        this.document.url
      );
    }
  }

  onDelete() {
    if (this.document) {
      this.documentService.deleteDocument(this.document);
      this.router.navigate(['/documents']);
    }
  }


}
