import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailComponent } from 'src/app/pages/orders/orders-detail/orders-detail.component';

@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.scss']
})
export class ConversationHeaderComponent implements OnInit {

  showOrderInfo: boolean;
  @Input() support;
  @Input() total;
  @Input() loadingMessages;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      width: '90%',
      data: { order }
    });
  }

}
