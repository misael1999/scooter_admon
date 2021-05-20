import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailComponent } from 'src/app/pages/orders/orders-detail/orders-detail.component';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.scss']
})
export class ConversationHeaderComponent extends ValidationForms implements OnInit, OnChanges {

  showOrderInfo: boolean;
  @Input() support;
  @Input() total;
  @Input() loadingMessages;
  @Input() closeOrderDetail = false;

  constructor(private dialog: MatDialog, private supportService: SupportService) { super(); }

  ngOnInit(): void {
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      width: '90%',
      data: { orderId: order.id }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const closeOrderUpdated = changes.closeOrderDetail;

    if (closeOrderUpdated && closeOrderUpdated.previousValue) {
      if (this.closeOrderDetail) {
        this.showOrderInfo = false;
      }
      return;
    }

  }

  async openOrCloseSupport(is_open) {
    console.log(this.support);
    console.log(is_open);

    const confirmationAction = await this.showMessageConfirm('De abrir o cerrar el soporte');

    if (!confirmationAction.value) { return; }

    this.supportService.openOrCloseSupport(this.support.id, is_open)
      .subscribe((data: any) => {
        this.showSwalMessage('Soporte abierto o cerrado correctamente');
      }, error => {
        this.showSwalMessage('Error al abrir o cerrar soporte', 'error');
      });
  }

}
