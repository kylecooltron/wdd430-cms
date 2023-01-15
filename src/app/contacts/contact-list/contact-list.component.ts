import { Component } from '@angular/core';
import { test_contacts } from '../test_data';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor() {
    // use test contact list
    this.contacts = test_contacts;
  }

}
