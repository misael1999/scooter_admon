import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private dialog: MatDialog, private deliveryService: DeliveryMenService) {
    super();
  }

  ngOnInit(): void { }


  disabledDelivery(deliveryManId) {
    this.deliveryService.deleteDelivery(deliveryManId)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor bloqueado correctamente');
        // this.getDeliveryMens();
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  enableDelivery(deliveryManId) {
    this.deliveryService.unLockDeliveryMan(deliveryManId)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor desbloqueado correctamente');
        // this.getDeliveryMens();
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  dialogAddDelivery(deliveryMan = null) {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      width: '850px',
      data: { deliveryMan }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          // this.getDeliveryMens();
        }
      });
  }


}
