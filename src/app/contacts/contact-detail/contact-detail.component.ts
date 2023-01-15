import { Component } from '@angular/core';
import { Contact } from '../contact.model'
import { test_contacts } from '../test_data';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})


export class ContactDetailComponent {

  selected_contact: Contact = test_contacts[0];

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
    console.log(detail_list);
    return detail_list;
  }

}
