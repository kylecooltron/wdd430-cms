import { Component, Input } from '@angular/core';
import { Document } from '../document.model'

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent {
  @Input() document: Document;

  // get_detail_list(document: Document) {
  //   /**
  //    * Returns list of details to display
  //    */
  //   let detail_list = [];
  //   detail_list.push(
  //     { name: "Name", value: document.name }
  //   )
  //   detail_list.push(
  //     { name: "Description", value: document.description }
  //   )
  //   detail_list.push(
  //     { name: "URL", value: document.url }
  //   )
  //   return detail_list;
  // }
}
