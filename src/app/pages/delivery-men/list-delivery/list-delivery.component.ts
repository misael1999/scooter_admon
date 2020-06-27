import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [5, 10, 25, 100];

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




}
