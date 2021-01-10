import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent extends ValidationForms implements OnInit {

  @Input() supports = [];
  @Input() loading: boolean;
  supportSelected;
  @Output() supportSelectedEvent = new EventEmitter<any>();
  @Output() filterSelected = new EventEmitter<any>();


  constructor() { super(); }


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
