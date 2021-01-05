import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  @Input() supports = [];
  @Input() loading: boolean;
  supportSelected;
  @Output() supportSelectedEvent = new EventEmitter<any>();


  constructor() { }


  ngOnInit(): void {
  }

  supportSelect(support) { 
    this.supportSelected = support;
    this.supportSelectedEvent.emit(support);
  }

}
