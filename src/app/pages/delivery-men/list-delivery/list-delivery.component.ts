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
  pageEvent: PageEvent;
  searchText;

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
        // console.log(this.deliverys);
        this.length = data.count;
        this.loadingDelivery = false;
      });
  }

  dialogAddDelivery(deliveryMan = null) {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      minWidth: '80%',
      maxWidth: '80%',
      // minHeight: '40%',
      // maxHeight: '40%',
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


  searchBy(value: string) {
    this.params.search = value;
    this.deliveryService.searchText = value;
    this.getDeliveryMen();
  }

  clearSearch() {
    this.params.search = '';
    this.deliveryService.searchText = '';
    this.searchText = "";
    this.getDeliveryMen();
  }

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
