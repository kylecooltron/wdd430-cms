import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender: string = "1";
  @ViewChild('subjectInput') subject: ElementRef;
  @ViewChild('msgTextInput') msgText: ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

  onSendMessage() {
    /**
     * Creates a new Message and passes it to the service
     */
    this.messageService.addMessage(
      new Message(
        "1",
        this.subject.nativeElement.value,
        this.msgText.nativeElement.value,
        this.currentSender
      )
    )

  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }

}
