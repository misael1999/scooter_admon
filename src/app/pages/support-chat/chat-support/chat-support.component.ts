import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { delay, retryWhen } from 'rxjs/operators';
import { SupportService } from 'src/app/services/support.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { MessageSupportModel } from 'src/app/models/message_support.model';


@Component({
  selector: 'app-chat-support',
  templateUrl: './chat-support.component.html',
  styleUrls: ['./chat-support.component.scss']
})
export class ChatSupportComponent implements OnInit {

  isClose = true;
  isMinimized = false;
  messageText = '';
  loadingMessage: boolean;
  binaryString;
  user;
  messages;
  chatSupport;
  @ViewChild('conversationBody') conversationBody: ElementRef;

  chatBodyHtml: HTMLElement;


  station;

  visible = false;

  params = { limit: 10, offset: 0, is_open: 'true' };
  supportSelected: any;
  count;
  loadingMessages;

  // SOCKETS
  stationId = localStorage.getItem('station_id');
  token = localStorage.getItem('access_token');
  WS_SOCKET = `${environment.WS_SOCKET}/ws/support/${this.stationId}/?token=${this.token}`;

  // mensagem
  newMessage = null;

  constructor(private supportService: SupportService,
              private webSocketService: WebSocketService,
              private snotify: SnotifyService) { }

  ngOnInit(): void {
    this.station = JSON.parse(localStorage.getItem('station'));
    this.getSupportChat();
    this.connectToWebSocketChat();
  }

  changeVisible(): void {
    this.visible = !this.visible;
  }

  supportSelect(event) {
    this.supportSelected = event;
    this.getMessagesSupport();
  }

  getMessagesSupport() {
    if (this.supportSelected) {

      this.supportService.getMessages(this.supportSelected.id, this.params)
        .subscribe((data: any) => {
          this.messages = data.results;
          // this.messages = this.messages
          this.count = data.count;
          this.loadingMessages = false;
          /*  this.scrollToBottom(); */

        }, error => {
          alert('Error al obtener los mensajes');
          this.loadingMessages = false;
        });
    }
  }


  scrollToBottom() {
    setTimeout(() => {
      const xH = this.chatBodyHtml.scrollHeight;
      this.chatBodyHtml.scrollTo({
        top: xH + 10000,
        left: 0,
        behavior: 'smooth'
      });
    }, 500);
  }

  // Socket para recepcion de mensajes
  connectToWebSocketChat() {
    this.webSocketService.connect(this.WS_SOCKET).pipe(
      retryWhen((errors) => errors.pipe(delay(5000)))
    ).subscribe((data: any) => {
      if (data.data.type && data.data.type === 'NEW_MESSAGE_SUPPORT') {
        this.playAudio();
        this.newMessage = data.data.message;
        this.showNewMessageNotification();
      }
    });
  }

  // Autdio de mensaje de entrada
  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/sounds/message.mp3';
    audio.load();
    audio.play();
  }


  showNewMessageNotification() {
    if (!this.supportSelected || (this.newMessage.support != this.supportSelected.id)) {
      const message = `Mensaje nuevo| ID:${this.newMessage.support}| Mensaje: ${this.newMessage.text}`;
      this.snotify.info(message, {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: SnotifyPosition.centerTop
      });
      return;
    }
  }


  getSupportChat() {
    /*  this.messagesService.getSupportChat()
       .subscribe((data: any) => {
         this.chatSupport = data.data
         if (this.chatSupport) {
           this.getMessagesSupport();
         }
       }, error => {
         // alert("NO SE ENCONTRO EL CHAT");
       }); */
  }

  openChatSupport() {
    this.isClose = false;
    setTimeout(() => {
      this.chatBodyHtml = this.conversationBody.nativeElement;
      this.scrollToBottom();
    }, 500);

  }

  sendMessage(text) {

    if (text == null || text == '' || text == undefined) { return; }
    // Mensaje temporal
    const newMessageModel = new MessageSupportModel(
      this.station.user.id,
      this.supportSelected.user,
      this.messageText,
      new Date());
    this.messageText = null;


    // ======= Enviar mensaje ========
    /* this.newMessage.emit(newMessageModel) */

    this.supportService.sendMessageSupport(this.supportSelected.id, { text })
      .subscribe((data: any) => {
        this.messages.push(data);



        // this.messages.push(data);
        // this.showSwalMessage("Mensaje enviado", 'success')
      }, error => {
        alert('Error al enviar el mensaje');
      });

  }

  createChatMessage(message, file) {
    /*   this.messagesService.createChatMessage(this.chatSupport.ID, { message: message, file_media: file, is_chat_support: true })
        .subscribe((data: any) => {
          // this.messages.push(data);
          // this.showSwalMessage("Mensaje enviado", 'success')
        }, error => {
          alert("Error al crear el mensaje, intentalo más tarde");
          // this.showSwalMessage("Error al enviar el mensaje", 'error')
        }); */
  }

  createChatOrMessage(message, file) {
    /*  this.messagesService.createChatOrMessage({ message, file_media: file, is_chat_support: true })
       .subscribe((data: any) => {
         if (data.message == "Chat created") {
           this.chatSupport = data.data;
         }
         // this.messages.push(data);
         // this.showSwalMessage("Mensaje enviado", 'success')
       }, error => {
         alert("Error al crear el mensaje, intentalo más tarde");
         // this.showSwalMessage("Error al enviar el mensaje", 'error')
       }); */
  }

  selectFileMedia(evt) {

    const file = evt.target.files[0];

    if (!file) {
      // formTemp.get('picture').setValue(this.sliders[index].picture);
      // this.slidersArrayForm.controls[index] = formTemp;
      return;
    }
    if (file.type.indexOf('image') < 0 && file.type.indexOf('application/pdf') < 0) {

      // this.myInputVariable.nativeElement.value = '';
      // this.showSwalMessage('El archivo seleccionado no es tipo permitido', 'error');
      // formTemp.get('picture').setValue(this.sliders[index].picture);
      // this.slidersArrayForm.controls[index] = formTemp;
      return;
    }

    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // setTimeout(() => {
    //   this.updatedDocument(documentId, this.binaryString, file.name);
    // }, 100);

  }

  deleteImage() {
    this.binaryString = null;
    // this.inputFile.nativeElement.value = null;
  }

  handleReaderLoaded(e) {
    this.binaryString = btoa(e.target.result);
  }

  addEmoji(event) {
    this.messageText = `${this.messageText}${event.emoji.native}`;
    // this.isEmojiPickerVisible = false;
  }


  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
