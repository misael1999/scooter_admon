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

  // Parametros para el paginado
  params = { limit: 15, offset: 0, search: '', order_status: 8, ordering: '' };
  deliverys: Array<any> = [];
  loadingDelivery: boolean;

  constructor(private deliveryService: DeliveryMenService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDelivery();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      width: '600px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }


  getDelivery() {
    this.loadingDelivery = true;
    this.deliveryService.getDeliverys()
    .subscribe( (data: any) => {
      this.deliverys = data.results;
      this.loadingDelivery = false;
      this.length = data.count;
      console.log('Los repartidores registrados son ', this.deliverys);
    }, error => {
      this.loadingDelivery = false;
    });

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
