import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { AddVehiclesComponent } from '../add-vehicles/add-vehicles.component';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-vehicles-block',
  templateUrl: './view-vehicles-block.component.html',
  styleUrls: ['./view-vehicles-block.component.scss']
})
export class ViewVehiclesBlockComponent implements OnInit {


  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', status: 2 };

  loadingVehicles: boolean;
  vehicles: Array<any> = [];

  constructor(private vehiculeService: VehiclesService,
     private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.loadingVehicles = true;
    this.vehiculeService.getVehicles(this.params)
      .subscribe((data: any) => {
        this.vehicles = data.results;
        this.loadingVehicles = false;
        this.length = data.count;
      }, error => {
        this.loadingVehicles = false;
      });
  }


  desbloquear(vehicle) {
    Swal.fire({
      title: 'Desbloquear',
      text: `El vehiculo se va a desbloquear`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Desbloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.vehiculeService.unLockVehicle(vehicle.id)
          .subscribe(data => {
            this.showMessageSuccess("Vehiculo activado");
            this.getVehicles();
          }, error => {
            this.showMessageError(error.errors.message);
          });

      }
    });

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

  deleteVehicle(id: number, alias) {
    Swal.fire({
      title: 'Eliminar',
      text: `Esta seguro de bloquear a ${alias}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.vehiculeService.deleteVehicle(id)
          .subscribe(data => {
            Swal.fire({
              title: 'Eliminado',
              type: 'success',
              text: 'El vehiculo se elimino correctamente',
              timer: 2000
            });
            this.getVehicles();

          });

      }
    });
  }

  searchBy(value: string) {
    this.params.search = value;
    this.getVehicles();
  }

  // Metodo paginator
  getPages(e): PageEvent {
    if (this.vehicles.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getVehicles();
  }

}
