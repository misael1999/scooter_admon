import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';
import Swal from 'sweetalert2';

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

  statusFilter: boolean;

  // Parametros para el paginado
  params = { limit: 15, offset: 0, search: '', ordering: '', status: '1, 2' };
  deliverys: Array<any> = [];
  loadingDelivery: boolean;

  constructor(private deliveryService: DeliveryMenService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDelivery();
  }

  dialogAddDelivery() {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      disableClose: true,
      // width: '600px',
      // height: '700px',
      data: { delivery: null }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getDelivery();
      }
    });
  }

  dialogEditDelivery(delivery) {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      disableClose: true,
      // width: '600',
      data: { delivery }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getDelivery();
      }
    });
  }


  getDelivery() {
    this.loadingDelivery = true;
    this.deliveryService.getDeliverys(this.params)
      .subscribe((data: any) => {
        this.deliverys = data.results;
        console.log(this.deliverys);
        console.log(this.deliverys);
        this.loadingDelivery = false;
        this.length = data.count;
      }, error => {
        this.loadingDelivery = false;
        return;
      });
  }


  deleteDelivery(id: number, nombre: string) {
    Swal.fire({
      title: 'Eliminar',
      text: `Esta seguro de eliminar a ${nombre}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.deliverys.splice(1);
        this.deliveryService.deleteDelivery(id)
          .subscribe();
        Swal.fire({
          title: 'Eliminado',
          type: 'success',
          text: 'El vehiculo se elimino correctamente',
          timer: 2000
        });
        this.getDelivery();
      }
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
