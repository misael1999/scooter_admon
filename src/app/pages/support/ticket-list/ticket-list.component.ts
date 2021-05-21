import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { SupportService } from '../../../services/support.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent extends ValidationForms implements OnInit {
  @Input() supports = [];
  @Input() loading: boolean;
  supportSelected;
  @Output() searchEvent = new EventEmitter<string>();
  @Output() supportSelectedEvent = new EventEmitter<any>();
  @Output() filterSelected = new EventEmitter<any>();
  searchText;
  isSearch: boolean;


  constructor(private supportService: SupportService) {
    super();
    this.supportService.newMessage$.subscribe((message: any) => {
      console.log('DAra', this.supports);

      const chatIndex = this.supports.findIndex((chat) => chat.ID == message.chat_id);
      if (chatIndex < 0) return;
      const chatTemp = this.supports[chatIndex];
      chatTemp.chat_messages.unshift(message);
      this.supports.splice(chatIndex, 1);
      this.supports.unshift(chatTemp);
    })
  }


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
    switch (supportTypeId) {
      case 1:
        return 'badge-secondary';
      case 2:
        return 'badge-warning';
      case 3:
        return 'badge-info';
      default:
        return 'badge-success';
    }
  }

  searchChat(value) {
    if (value == "" || value == null) {
      return;
    }
    this.isSearch = true;
    this.searchText = value;
    this.searchEvent.emit(value);
  }

  cleanSearch() {
    this.searchText = null;
    this.isSearch = false;
    this.searchEvent.emit('');
  }

  openMobile() {
    // this.openChatEvent.emit("open");
  }


}
