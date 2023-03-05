import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  private maxMessageId: number;

  constructor(private http: HttpClient, private firebase: FirebaseService) {
  }

  getMaxId(messageList: Message[]): number {
    return Math.max(...messageList.map(o => +o.id));
  }

  getMessages() {
    /**
     * Returns array of all messages
     */
    this.http.get<Message[]>(this.firebase.getUrl(this.firebase.MESSAGES_TABLE)).subscribe(
      {
        next: (messages: Message[]) => {
          this.messages = messages.sort();
          this.maxMessageId = this.getMaxId(this.messages);
          this.messageChangedEvent.next(this.messages.slice());
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

  storeMessages() {
    this.http.put(
      this.firebase.getUrl(this.firebase.MESSAGES_TABLE),
      JSON.stringify(this.messages),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).subscribe(
      () => {
        this.messageChangedEvent.next(this.messages.slice());
      }
    )
  }

  getMessage(id: string): Message | undefined {
    /**
     * Finds a single contact with given id
     * Returns null if no contact was found
     */
    return this.messages.find(message => message.id == id)
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }

}
