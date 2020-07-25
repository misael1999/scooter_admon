import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DeliveryMenService } from 'src/app/services/delivery-men.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-delivery-block',
  templateUrl: './list-delivery-block.component.html',
  styleUrls: ['./list-delivery-block.component.scss']
})
export class ListDeliveryBlockComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  statusFilter: boolean;

  // Parametros para el paginado
  params = { limit: 15, offset: 0, search: '', ordering: '', status: 2 };
  deliverys: Array<any> = [];
  loadingDelivery: boolean;

  constructor(private deliveryService: DeliveryMenService,
     private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDelivery();
  }

  desbloquear(delivery) {
    this.deliveryService.unLockDeliveryMan(delivery.id)
      .subscribe((data) => {
        console.log(data);
        this.showMessageSuccess("Repartidor activado");
        this.getDelivery();
      }, error => {
        this.showMessageError(error.errors.message);
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

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['main-snackbar']
    });
  }

  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}
