import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageSupportModel } from 'src/app/models/message_support.model';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-conversation-footer',
  templateUrl: './conversation-footer.component.html',
  styleUrls: ['./conversation-footer.component.scss']
})
export class ConversationFooterComponent extends ValidationForms implements OnInit {

  @Input() support;
  // @Input() messages = [];
  @Output() newMessage = new EventEmitter<MessageSupportModel>();
  messageText;
  station;

  constructor(private supportService: SupportService) { super() }

  ngOnInit(): void {
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  sendMessage(text) {

    if (text == null || text == '' || text == undefined) return;
    // Mensaje temporal
    const newMessageModel = new MessageSupportModel(
      this.station.user.id,
    this.support.user,
    this.messageText,
    new Date()) 
    this.messageText = null;
    // ======= Enviar mensaje ======== 
    this.newMessage.emit(newMessageModel)

    this.supportService.sendMessageSupport(this.support.id,{text})
    .subscribe((data: any) => {
      // this.messages.push(data);
        // this.showSwalMessage("Mensaje enviado", 'success')
    }, error => {
      alert('Error al enviar el mensaje');
    });

  }

}
