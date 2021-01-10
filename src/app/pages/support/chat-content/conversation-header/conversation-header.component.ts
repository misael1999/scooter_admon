import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailComponent } from 'src/app/pages/orders/orders-detail/orders-detail.component';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.scss']
})
export class ConversationHeaderComponent extends ValidationForms implements OnInit {

  showOrderInfo: boolean;
  @Input() support;
  @Input() total;
  @Input() loadingMessages;

  constructor(private dialog: MatDialog, private supportService: SupportService) { super(); }

  ngOnInit(): void {
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      width: '90%',
      data: { orderId: order.id }
    });
  }

  async openOrCloseSupport(is_open) {
    console.log(this.support);
    console.log(is_open);
    
    const confirmationAction = await this.showMessageConfirm("De abrir o cerrar el soporte");

    if (!confirmationAction.value) return;

    this.supportService.openOrCloseSupport(this.support.id, is_open)
      .subscribe((data: any) => {
        this.showSwalMessage("Soporte abierto o cerrado correctamente");
      }, error => {
        this.showSwalMessage("Error al abrir o cerrar soporte", 'error');
      });
  }

}
