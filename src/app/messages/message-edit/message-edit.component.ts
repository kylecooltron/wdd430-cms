import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender: string = "Kyle";
  @ViewChild('subjectInput') subject: ElementRef;
  @ViewChild('msgTextInput') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage() {
    /**
     * Creates a new Message and emits a message event with it.
     */
    this.addMessageEvent.emit(
      new Message(
        1,
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
