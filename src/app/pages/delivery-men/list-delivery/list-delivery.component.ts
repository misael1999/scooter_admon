import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  status: boolean;

  // Parametros para el paginado
  params = { limit: 15, offset: 0, search: '', ordering: '', status: '1' };
  deliverys: Array<any> = [];
  loadingDelivery: boolean;

  constructor(private deliveryService: DeliveryMenService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDelivery();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      width: '600px',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe();

  }


  getDelivery() {
    this.loadingDelivery = true;
    this.deliveryService.getDeliverys(this.params)
      .subscribe((data: any) => {
        this.deliverys = data.results;
        this.loadingDelivery = false;
        this.length = data.count;
      }, error => {
        this.loadingDelivery = false;
        return;
      });
  }

  searchBy(value: string) {
    this.params.search = value;
    this.getDelivery();
  }
  ordenamiento(value: string) {
    this.params.ordering = value;
    this.getDelivery();
  }

  // Metodo paginator
  getPages(e): PageEvent {
    if (this.deliverys.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getDelivery();
  }
  // ==========================================



}
