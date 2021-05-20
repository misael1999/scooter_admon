import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryMenService } from 'src/app/services/delivery-men.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent extends ValidationForms implements OnInit {
  @Input() deliveryMens;
  @Input() params;
  @Output() reloadDeliveryMens = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog, private deliveryService: DeliveryMenService) {
    super();
  }

  ngOnInit(): void { }

  async disabledDelivery(deliveryManId) {
    const confirmation = await this.showMessageConfirm('De bloquear al repartidor');
    if (!confirmation.value) { return; }

    this.deliveryService.deleteDelivery(deliveryManId)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor bloqueado correctamente');
        this.reloadDeliveryMens.emit(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  async enableDelivery(deliveryManId) {
    const confirmation = await this.showMessageConfirm('De desbloquear al repartidor');
    if (!confirmation.value) { return; }

    this.deliveryService.unLockDeliveryMan(deliveryManId)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor desbloqueado correctamente');
        this.reloadDeliveryMens.emit(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  openDialogEditDelivery(deliveryMan) {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      width: '850px',
      data: { deliveryMan }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        this.reloadDeliveryMens.emit(true);
      });
  }
}
