import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(
      2,
      "Ad",
      "New boat available!",
      "Karl",
    ),
    new Message(
      2,
      "Spam",
      "You won!",
      "AdBot",
    ),
    new Message(
      2,
      "Why aren't you responding?",
      "It's been forever man.",
      "Karl",
    )
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }


}
