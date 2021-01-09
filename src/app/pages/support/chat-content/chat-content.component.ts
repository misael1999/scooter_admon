import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit {

  @Input() support;

  constructor() { }

  ngOnInit(): void {
  }

}
