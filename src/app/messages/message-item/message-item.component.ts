import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message: Message;
  messageSender: string;
  subscription: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact | undefined = this.contactService.getContact(this.message.sender);
    this.contactService.getContacts();
    this.messageSender = contact?.name ?? "loading...";
    this.subscription = this.contactService.contactListChangedEvent.subscribe(() => {
      contact = this.contactService.getContact(this.message.sender);
      this.messageSender = contact?.name ?? this.message.sender;
    })
    if (contact) {
      this.messageSender = contact.name;
    }
  }
}
