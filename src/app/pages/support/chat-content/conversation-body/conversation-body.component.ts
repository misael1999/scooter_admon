import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-conversation-body',
  templateUrl: './conversation-body.component.html',
  styleUrls: ['./conversation-body.component.scss']
})
export class ConversationBodyComponent implements OnInit, OnChanges {

  @Input() messages;
  @Input() loadingMessages: boolean;
  station;


  constructor(private supportService: SupportService) {
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }


}
