import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeliveryMenService } from 'src/app/services/delivery-men.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';

@Component({
  selector: 'app-main-delivery-men',
  templateUrl: './main-delivery-men.component.html',
  styleUrls: ['./main-delivery-men.component.scss']
})
export class MainDeliveryMenComponent extends ValidationForms implements OnInit {
  length = 100;
  pageIndex = 0;
  pageSize = 25;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  params = { limit: 25, offset: 0, search: '', ordering: '', status: 1 };
  deliveryMens: Array<any> = [];
  loadingData: boolean;
  searchText;

  constructor(
    private dialog: MatDialog,
    private deliveryService: DeliveryMenService) {
    super();
  }

  ngOnInit(): void {
    this.getDeliveryMens();
  }

  getDeliveryMens() {
    this.loadingData = true;
    this.deliveryService.getDeliverys(this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.deliveryMens = data.results;
        this.length = data.count;
        this.deliveryService.params = this.params;
        this.pageSize = this.params.limit;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
      });
  }

  openDialogAddDelivery() {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      width: '850px',
      data: {}
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getDeliveryMens();
        }
      });
  }

  orderBy(status) {
    this.params.ordering = status;
    this.deliveryService.params = this.params;
    this.getDeliveryMens();
  }

  showList(status) {
    this.params.status = status;
    this.getDeliveryMens();
  }

  searchBy(value) {
    this.params.search = value;
    this.deliveryService.searchText = value;
    this.getDeliveryMens();
  }

  clearSearch() {
    this.params.search = '';
    this.deliveryService.searchText = '';
    this.searchText = '';
    this.getDeliveryMens();
  }

  getPages(e): PageEvent {
    if (this.deliveryMens.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getDeliveryMens();
  }
}
