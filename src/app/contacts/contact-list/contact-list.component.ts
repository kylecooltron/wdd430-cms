import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  term: string;
  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  private subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
      this.contacts = contactsList;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // public onSelected(contact: Contact) {
  //   // this.selectedContactEvent.emit(contact);
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }


  search(value: string) {

    this.term = value;

  }

}


