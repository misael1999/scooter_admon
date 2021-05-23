import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ScrollDirective } from 'src/app/directives/scroll.directive';
import { MessageSupportModel } from 'src/app/models/message_support.model';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../../services/web-socket.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent extends ValidationForms implements OnInit, OnChanges, AfterViewInit {
  support;
  supportId: number;
  @Input() newMessageSocket: MessageSupportModel;
  @Input() newMessageService: any;
  @Output() closeChatEvent = new EventEmitter<any>();
  closeOrderDetail = false;
  @ViewChild('conversationBody') conversationBody: ElementRef;
  @ViewChild(ScrollDirective) scrollDirective!: ScrollDirective;
  messages: MessageSupportModel[] = [];
  loadingMessages;
  params = { limit: 15, offset: 0, page: 1, ordering: '-created' };
  chatBodyHtml: HTMLElement;
  chatGroups: [] = [];
  station;

  // Infinite Scroll
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;

  // Pagination
  count: number;
  loadingMore: boolean;
  savedHeight;

  constructor(
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      this.params = { limit: 15, offset: 0, page: 1, ordering: '-created' };
      this.messages = [];
      this.chatGroups = [];
      this.supportId = params.chatId;
      this.getChat(this.supportId);
    });
  }

  ngOnInit(): void {
    this.station = JSON.parse(localStorage.getItem('station'));
    if (this.support) {
      this.loadingMessages = true;
      this.getMessagesSupport();
    }

    this.webSocketService.getCurrentSocket()
      .subscribe((payload: any) => {
        switch (payload.type_notification) {
          case 'NEW_CHAT_MESSAGE':
            if (payload.data.chat_id != this.support.id) { return; }
            this.newMessageChatSocket(payload);
            return;
          case 'ALL_MESSAGES_VIEWED':
            if (payload.data.ID != this.support.id) { return; }
            this.allMessagesViewedSocket(payload);
            return;
          case 'MESSAGE_VIEWED':
            if (payload.data.chat_id != this.support.id) { return; }
            this.messageViewedSocket(payload);
            return;
        }
      });
  }

  ngAfterViewInit() {
    // this.chatBodyHtml = this.conversationBody.nativeElement;
  }


  getMessagesSupport() {
    if (this.support) {
      this.supportService.getMessages(this.support.id, this.params)
        .subscribe((data: any) => {
          this.messages = data.results.reverse();
          // this.messages = this.messages
          this.count = data.count;
          this.loadingMessages = false;
          this.scrollToBottom();
        }, error => {
          alert('Error al obtener los mensajes');
          this.loadingMessages = false;
        });
    }
  }

  getChat(supportId) {
    this.loadingMessages = true;
    this.supportService.getMessages(supportId, this.params)
      .subscribe((data: any) => {
        this.support = data.results;
        this.loadingMessages = false;
        this.count = data.count;
        // this.groupMessages(this.messages);
        this.scrollToBottom();
        setTimeout(() => {
          this.chatBodyHtml = this.conversationBody.nativeElement;
        });
      }, error => {
        this.showSwalMessage('Ha ocurrido un error al consultar el chat', 'error');
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const supportUpdated = changes.support;
    const newMessageUpdated = changes.newMessageSocket;

    if (supportUpdated && supportUpdated.previousValue) {
      this.loadingMessages = true;
      this.params = { limit: 15, offset: 0, page: 1, ordering: '-created' };
      this.scrollDirective.reset();
      this.getMessagesSupport();
    }
    if (newMessageUpdated && newMessageUpdated.currentValue) {
      if (!this.newMessageSocket) { return; }
      // Comprobrar si corresponde al soporte
      if (this.newMessageSocket.support != this.support.id) { return; }

      this.newMessage(this.newMessageSocket);
      this.newMessageSocket = null;

    }
  }



  scrollToBottom() {
    setTimeout(() => {
      let xH = this.chatBodyHtml.scrollHeight;
      this.chatBodyHtml.scrollTo({
        top: xH,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

  newMessage(message: MessageSupportModel) {
    const messagesTemp = [...this.messages];
    messagesTemp.push(message);
    this.messages = messagesTemp;
    this.count = this.count + 1;
    this.scrollToBottom();
  }

  // Scroll Up
  onUp() {
    if (this.count <= this.messages.length) { return; }
    // Paginar
    this.params.offset = this.params.offset + this.params.limit;
    // Get more messages
    this.closeOrderDetail = true;
    this.getMoreMessages(this.params);
  }

  getMoreMessages(params = {}) {
    this.loadingMore = true;
    this.supportService.getMessages(this.support.id, params)
      .subscribe((data: any) => {
        this.count = data.count;
        // Concatenar mensajes
        this.scrollDirective.prepareFor('up'); // this method stores the current scroll position
        const oldMessages = [...this.messages];
        this.messages = data.results.reverse();
        this.messages = this.messages.concat(...oldMessages);
        this.loadingMore = false;
        setTimeout(() => this.scrollDirective.restore());
      }, error => {
        this.loadingMore = false;
        this.showSwalMessage('Ha ocurrido un error al obtener más mensajes', 'error');
      });
  }


  newMessageChatSocket(payload) {
    // this.supportService.updateNewMessage(payload.data);
    // this.newMessage(payload.data);
    // this.newMessageSocket = null;
    // this.messages.push(payload.data);
    // this.messageService.markMessageAsViewed(this.chat.ID, payload.data.ID, {})
    //   .subscribe();
  }

  allMessagesViewedSocket(payload) {
    // this.chatGroups = this.chatGroups.map((chat) => {
    //   chat.messages = chat.messages.map((message) => { message.viewed = true; message.viewed_date = new Date(); return message; });
    //   return chat;
    // });
  }

  messageViewedSocket(payload) {
    // this.chatGroups = this.chatGroups.map((chat) => {
    //   chat.messages = chat.messages.map((message) => {
    //     if (message.ID == payload.message_id) {
    //       message.viewed = true;
    //       message.viewed_date = new Date();
    //     }
    //     return message;
    //   });
    //   return chat;
    // });
  }
}
