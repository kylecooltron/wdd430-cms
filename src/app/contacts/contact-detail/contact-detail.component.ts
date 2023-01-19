import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})


export class ContactDetailComponent {
  @Input() contact: Contact;

  get_detail_list(contact: Contact) {
    /**
     * Returns list of details to display
     */
    let detail_list = [];
    detail_list.push(
      { name: "Email", value: contact.email }
    )
    detail_list.push(
      { name: "Phone", value: contact.phone }
    )
    return detail_list;
  }

}
