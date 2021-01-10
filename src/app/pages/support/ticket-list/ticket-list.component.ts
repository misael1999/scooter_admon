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
  @Output() filterSelected = new EventEmitter<any>();


  constructor() { }


  ngOnInit(): void {
  }

  supportSelect(support) { 
    this.supportSelected = support;
    this.supportSelectedEvent.emit(support);
  }

  filterSupport(value) {
    this.filterSelected.emit(value);
  }

  getSupportClass(supportTypeId) {
    switch(supportTypeId) {
      case 1:
        return 'badge-secondary'
      case 2:
        return 'badge-warning'
      case 3:
        return 'badge-info'
      default:
        return 'badge-success'
    }
  }

}
