import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ScrollDirective } from 'src/app/directives/scroll.directive';
import { MessageSupportModel } from 'src/app/models/message_support.model';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent extends ValidationForms implements OnInit, OnChanges, AfterViewInit {

  @Input() support;
  @Input() newMessageSocket: MessageSupportModel;
  @ViewChild("conversationBody") conversationBody: ElementRef;
  @ViewChild(ScrollDirective) scrollDirective!: ScrollDirective;
  messages: MessageSupportModel[] = [];
  loadingMessages;
  station;
  params = { limit: 15, offset: 0, ordering: "-created" }
  chatBodyHtml: HTMLElement;

  // Infinite Scroll
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;

  // Pagination
  count: number;
  loadingMore: boolean;
  savedHeight;

  constructor(private supportService: SupportService) { super(); }

  ngOnInit(): void {
    this.station = JSON.parse(localStorage.getItem('station'));
    if (this.support) {
      this.loadingMessages = true;
      this.getMessagesSupport();
    }
  }

  ngAfterViewInit() {
    this.chatBodyHtml = this.conversationBody.nativeElement;
  }


  getMessagesSupport() {
    if (this.support) {
      this.supportService.getMessages(this.support.id, this.params)
        .subscribe((data: any) => {
          this.messages = data.results.reverse();;
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

  ngOnChanges(changes: SimpleChanges): void {
    const supportUpdated = changes['support'];
    const newMessageUpdated = changes['newMessageSocket'];
    
    if (supportUpdated && supportUpdated.previousValue) {
      this.loadingMessages = true;
      this.params = { limit: 15, offset: 0, ordering: "-created" };
      this.scrollDirective.reset(); 
      this.getMessagesSupport();
    }
    if (newMessageUpdated && newMessageUpdated.currentValue) {
      if(!this.newMessageSocket) return;
      // Comprobrar si corresponde al soporte
      if (this.newMessageSocket.support != this.support.id) return;

      this.newMessage(this.newMessageSocket);
      this.newMessageSocket = null;

    }
  }

  scrollToBottom() {

    setTimeout(() => {
      // var chatWindow = document.getElementById('messages-content');
      var xH = this.chatBodyHtml.scrollHeight;
      this.chatBodyHtml.scrollTo({
        top: xH,
        left: 0,
        behavior: 'smooth'
      });
    }, 100)
  }

  newMessage(message: MessageSupportModel) {
    const messagesTemp= [...this.messages];
    messagesTemp.push(message);
    this.messages = messagesTemp;
    this.scrollToBottom();
  }

  // Scroll Up
  onUp() {
    if (this.count <= this.messages.length) return;
    console.log("MASSSSSS");
    // this.savedHeight = this.chatBodyHtml.scrollHeight - this.chatBodyHtml.scrollTop;
    // Get more messages
    this.params.offset = this.params.offset + this.params.limit;
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
          setTimeout(() => this.scrollDirective.restore());          // this.chatBodyHtml.scrollTo(0, this.savedHeight);
        }, error => {
          this.loadingMore = false;
          this.showSwalMessage("Ha ocurrido un error al obtener más mensajes", 'error');
        });
  }

}
