import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { retryWhen } from 'rxjs/internal/operators/retryWhen';
import { SupportService } from 'src/app/services/support.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { environment } from 'src/environments/environment';
import { SnotifyPosition, SnotifyService } from 'ng-snotify';
import { ActivatedRoute, Router } from '@angular/router';
import { StationModel } from '../../../models/station.model';

@Component({
  selector: 'app-main-support',
  templateUrl: './main-support.component.html',
  styleUrls: ['./main-support.component.scss']
})
export class MainSupportComponent implements OnInit {
  stationId = localStorage.getItem('station_id');
  token = localStorage.getItem('access_token');
  supportId;
  WS_SOCKET = `${environment.WS_SOCKET}/ws/support/${this.stationId}/?token=${this.token}`;
  user: StationModel;
  loadingSupports = false;
  @ViewChild("chatContent") chatContent: ElementRef;

  // Info
  supports = [];
  params = { limit: 10, offset: 0, is_open: 'true', search: '' };
  supportSelected;
  newMessage = null;

  constructor(
    private webSocketService: WebSocketService,
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute,
    private snotify: SnotifyService,
    private router: Router) {
    this.user = JSON.parse(localStorage.getItem('station'));

    if (this.activatedRoute.snapshot.firstChild) {
      this.activatedRoute.firstChild
        .params.subscribe((params) => {
          this.supportId = params.chatId;
        });
    }
  }

  ngOnInit(): void {
    this.connectToWebSocket();
    this.getSupports();
  }

  getSupports() {
    this.loadingSupports = true;
    this.supportService.getSupports(this.params)
      .subscribe((data: any) => {
        this.loadingSupports = false;
        this.supports = data.results;
        console.log(this.supports, data);
        // this.countNewMessages();
        if (data.count > 0 && !this.supportId) {
          this.supportSelected = this.supports[0];
          console.log(this.supportSelected);
          this.router.navigateByUrl('/support/' + this.supports[0].id + '/messages');
          setTimeout(() => {
            this.supportSelected.messagesNotViewed = 0;
            this.supports[0] = this.supportSelected;
          }, 3000);
        } else if (this.supportId) {
          this.openChat(this.supportId);
        }
      }, error => {
        this.loadingSupports = false;
      });
  }

  countNewMessages() {
    this.supports.forEach((chat) => {
      chat.messagesNotViewed = 0;
      chat.chat_messages.forEach((message) => {
        if (message.viewed === false && message.sender_by_id != this.user.id) { chat.messagesNotViewed = chat.messagesNotViewed + 1; }
      });
    });
  }

  deleteChat() {
    this.supportId = null;
    this.getSupports();
  }

  supportSelectedEvent(support) {
    this.supportSelected = support;
  }

  searchChat(value) {
    this.params.search = value;
    this.getSupports();
  }

  openChat(event) {
    this.chatContent.nativeElement.classList.add("open");
    this.supportService.chatContent = this.chatContent.nativeElement;
  }



  ngOnDestroy(): void {
    this.webSocketService.closeConnection();
  }

  connectToWebSocket() {
    this.webSocketService.connect(this.WS_SOCKET).pipe(
      retryWhen((errors) => errors.pipe(delay(5000)))
    ).subscribe((data: any) => {
      if (data.data.type && data.data.type === 'NEW_MESSAGE_SUPPORT') {
        this.newMessage = data.data.message;
        this.showNewMessageNotification();
      }
    });
  }

  filter(isOpen) {
    this.params.is_open = isOpen;
    this.getSupports();
  }

  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/sounds/message.mp3';
    audio.load();
    audio.play();
  }

  showNewMessageNotification() {
    this.playAudio();
    const message = `${this.newMessage.message}`;
    if (!this.supportSelected || (this.newMessage.support != this.supportSelected.id)) {
      const snotifyMessage = this.snotify.success(message ? message : 'Imagen recibida', 'Mensaje nuevo', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: SnotifyPosition.centerTop
      });
      snotifyMessage.id = 1;
      return;
    }
  }
}
