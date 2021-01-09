import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-conversation-body',
  templateUrl: './conversation-body.component.html',
  styleUrls: ['./conversation-body.component.scss']
})
export class ConversationBodyComponent implements OnInit, OnChanges {

  messages = [];
  loadingMessages;
  @Input() support;
  station;
  params = { limit: 15, offset: 0 }

  constructor(private supportService: SupportService) { }


  ngOnInit(): void {
    this.station = JSON.parse(localStorage.getItem('station'));
    if (this.support) {
      this.loadingMessages = true;
      this.getMessagesSupport();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const supportUpdated = changes['support'];
    if (supportUpdated.previousValue) {
      this.loadingMessages = true;
      this.getMessagesSupport();
    }
  }

  getMessagesSupport() {
    if (this.support) {
      this.supportService.getMessages(this.support.id, this.params)
        .subscribe((data: any) => {
          this.messages = data.results;
          console.log(this.messages);
          this.loadingMessages = false;
        }, error => {
          alert('Error al obtener los mensajes');
          this.loadingMessages = false;
        });
    }
  }

}
