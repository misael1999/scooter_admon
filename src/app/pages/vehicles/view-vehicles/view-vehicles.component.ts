import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../services/vehicles.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddVehiclesComponent } from '../add-vehicles/add-vehicles.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.component.html',
  styleUrls: ['./view-vehicles.component.scss']
})
export class ViewVehiclesComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', ordering: '', status: 1 };

  loadingVehicles: boolean;
  vehicles: Array<any> = [];
  // background: ThemePalette = 'primary';

  constructor(private vehiculeService: VehiclesService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles() {
    this.loadingVehicles = true;
    this.vehiculeService.getVehicles(this.params)
      .subscribe((data: any) => {
        this.vehicles = data.results;
        // console.log(this.vehicles);
        this.loadingVehicles = false;
        this.length = data.count;
      }, error => {
        this.loadingVehicles = false;
      });
  }

  openDialogAddV() {
    const dialogRef = this.dialog.open(AddVehiclesComponent, {
      disableClose: true,
      width: '500px',
      data: { vehicle: null }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getVehicles();
      }
    });
  }

  editarVehicle(vehicle) {
    const dialogRef = this.dialog.open(AddVehiclesComponent, {
      disableClose: true,
      width: '500px',
      data: { vehicle }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.getVehicles();
      }
    });
  }


  deleteVehicle(id: number, alias) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear a ${alias}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.vehiculeService.deleteVehicle(id)
          .subscribe(data => {
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'El vehiculo se bloqueado correctamente',
              timer: 2000
            });
            this.getVehicles();
          });
      }
    });
  }

  ordenamiento(value: string) {
    this.params.ordering = value;
    this.getVehicles();
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


