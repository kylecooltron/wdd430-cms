import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { LocalhostService } from '../localhost.service';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  // private maxMessageId: number;

  constructor(private http: HttpClient, private localhost: LocalhostService) {
  }

  // getMaxId(messageList: Message[]): number {
  //   return Math.max(...messageList.map(o => +o.id));
  // }

  sortAndSend() {
    // this.messages.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessages() {
    /**
     * Returns array of all messages
     */
    this.http.get<Message[]>(this.localhost.getUrl(this.localhost.MESSAGES_TABLE)).subscribe(
      {
        next: (messages: Message[]) => {
          this.messages = messages;
          console.log(this.messages);
          // this.messages = messages.sort();
          // this.maxMessageId = this.getMaxId(this.messages);
          // this.messageChangedEvent.next(this.messages.slice());
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

  // storeMessages() {
  //   this.http.put(
  //     this.firebase.getUrl(this.firebase.MESSAGES_TABLE),
  //     JSON.stringify(this.messages),
  //     {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }
  //   ).subscribe(
  //     () => {
  //       this.messageChangedEvent.next(this.messages.slice());
  //     }
  //   )
  // }

  getMessage(id: string): Message | undefined {
    /**
     * Finds a single contact with given id
     * Returns null if no contact was found
     */
    return this.messages.find(message => message.id == id)
  }

  // addMessage(message: Message) {
  //   this.messages.push(message);
  //   // this.messageChangedEvent.emit(this.messages.slice());
  //   this.storeMessages();
  // }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, object: Message }>(this.localhost.getUrl(this.localhost.MESSAGES_TABLE),
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.object);
          this.sortAndSend();
        }
      );
  }

}
