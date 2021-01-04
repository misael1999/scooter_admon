import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.scss']
})
export class ConversationHeaderComponent implements OnInit {

  showOrderInfo: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
