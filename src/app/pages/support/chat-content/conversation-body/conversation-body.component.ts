import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-conversation-body',
  templateUrl: './conversation-body.component.html',
  styleUrls: ['./conversation-body.component.scss']
})
export class ConversationBodyComponent implements OnInit, OnChanges {
  @Input() messages;
  @Input() support;
  @Input() loadingMessages: boolean;
  @Input() chatGroups;

  station;

  constructor() {
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  ngOnInit() { }

  ngOnChanges() { }
}
