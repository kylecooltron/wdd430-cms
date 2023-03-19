import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { LocalhostService } from '../localhost.service';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  // private maxContactId: number;

  constructor(private http: HttpClient, private localhost: LocalhostService) {
    // this.maxContactId = this.getMaxId(this.contacts);
  }

  sortAndSend() {
    this.contacts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContacts() {
    /**
     * Returns array of all contacts
     */
    this.http.get<Contact[]>(this.localhost.getUrl(this.localhost.CONTACTS_TABLE)).subscribe(
      {
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          // this.contacts = contacts.sort();
          // this.maxContactId = this.getMaxId(this.contacts);
          // this.contactListChangedEvent.next(this.contacts.slice());
          this.sortAndSend();
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

  // storeDocuments() {
  //   this.http.put(
  //     this.firebase.getUrl(this.firebase.CONTACTS_TABLE),
  //     JSON.stringify(this.contacts),
  //     {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   ).subscribe(
  //     () => {
  //       this.contactListChangedEvent.next(this.contacts.slice());
  //     }
  //   )
  // }



  getContact(id: string): Contact | undefined {
    /**
     * Finds a single contact with given id
     * Returns null if no contact was found
     */
    console.log(id);
    return this.contacts.find(contact => contact.id == id)
  }

  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   // this.contactListChangedEvent.next(this.contacts.slice());
  //   this.storeDocuments();
  // }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete(this.localhost.getUrl(this.localhost.CONTACTS_TABLE) + contact.id)
      .subscribe(
        (response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  // getMaxId(contactList: Contact[]): number {
  //   return Math.max(...contactList.map(o => +o.id));
  // }

  // addContact(newContact: Contact) {
  //   if (newContact == null) {
  //     return;
  //   }
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   // this.contactListChangedEvent.next(this.contacts.slice());
  //   this.storeDocuments();
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, contact: Contact }>(this.localhost.getUrl(this.localhost.CONTACTS_TABLE),
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }



  // updateContact(originalContact: Contact | undefined, newContact: Contact) {
  //   if (originalContact == null || newContact == null) {
  //     return;
  //   }
  //   let pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //     return;
  //   }

  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   // this.contactListChangedEvent.next(this.contacts.slice());
  //   this.storeDocuments();
  // }

  updateContact(originalContact: Contact | undefined, newContact: Contact | undefined) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put(this.localhost.getUrl(this.localhost.CONTACTS_TABLE) + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }


}
