import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];


  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    /**
     * Returns array of all contacts
     */
    return this.contacts;
  }

  getContact(id: string): Contact | undefined {
    /**
     * Finds a single contact with given id
     * Returns null if no contact was found
     */
    return this.contacts.find(contact => contact.id == id)
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

}
