import { Component, OnInit } from '@angular/core';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeliveryMenService } from 'src/app/services/delivery-men.service';
import { ValidationForms } from 'src/app/utils/validations-forms';


@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent extends ValidationForms implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  params = { limit: 25, offset: 0, search: '', ordering: '', status: 1 };
  deliverys: Array<any> = [];
  loadingDelivery: boolean;

  constructor(private dialog: MatDialog, private deliveryService: DeliveryMenService) {
    super();
  }

  ngOnInit(): void {
    this.getDeliveryMen();
  }

  getDeliveryMen() {
    this.loadingDelivery = true;
    this.deliveryService.getDeliverys(this.params)
      .subscribe((data: any) => {
        this.deliverys = data.results;
        console.log(this.deliverys);
        this.length = data.count;
        console.log(this.deliverys);
        this.loadingDelivery = false;
      });
  }

  dialogAddDelivery(deliveryMan = null) {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      disableClose: true,
      width: '60%',
      minWidth: '500px',
      data: { deliveryMan }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getDeliveryMen();
        }
      });
  }

  showList(status) {
    this.params.status = status;
    this.getDeliveryMen();
  }

  disabledDelivery(deliveryManId) {
    this.deliveryService.deleteDelivery(deliveryManId)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor bloqueado correctamente');
        this.getDeliveryMen();
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  enableDelivery(deliveryManId) {
    this.deliveryService.unLockDeliveryMan(deliveryManId)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor desbloqueado correctamente');
        this.getDeliveryMen();
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  search(value) {
    this.params.search = value;
    this.getDeliveryMen();
  }


  // Metodo paginator
  getPages(e): PageEvent {
    if (this.deliverys.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getDeliveryMen();
  }



}
