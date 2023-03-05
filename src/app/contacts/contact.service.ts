import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient, private firebase: FirebaseService) {
    this.maxContactId = this.getMaxId(this.contacts);
  }

  getContacts() {
    /**
     * Returns array of all contacts
     */
    this.http.get<Contact[]>(this.firebase.getUrl(this.firebase.CONTACTS_TABLE)).subscribe(
      {
        next: (contacts: Contact[]) => {
          this.contacts = contacts.sort();
          this.maxContactId = this.getMaxId(this.contacts);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log("GET request complete.");
        }
      }
    )
  }

  storeDocuments() {
    this.http.put(
      this.firebase.getUrl(this.firebase.CONTACTS_TABLE),
      JSON.stringify(this.contacts),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    )
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeDocuments();
  }

  getMaxId(contactList: Contact[]): number {
    return Math.max(...contactList.map(o => +o.id));
  }

  addContact(newContact: Contact) {
    if (newContact == null) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeDocuments();
  }

  updateContact(originalContact: Contact | undefined, newContact: Contact) {
    if (originalContact == null || newContact == null) {
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeDocuments();
  }


}
