import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../services/vehicles.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddVehiclesComponent } from '../add-vehicles/add-vehicles.component';


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
  params = { limit: 15, offset: 0, search: '', order_status: 8, ordering: '' };
  vehicles: Array<any> = [];

  loadingVehicles: boolean;

  constructor(private vehiculeService: VehiclesService, private dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddVehiclesComponent, {
      width: '500px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  ngOnInit(): void {
    this.getVehicles();

  }

  getVehicles() {
    this.loadingVehicles = true;
    this.vehiculeService.getVehicles()
      .subscribe((data: any) => {
        this.vehicles = data.results;
        this.loadingVehicles = false;
        this.length = data.count;
        console.log('Los vehiculos registrados son ', this.vehicles);
      }, error => {
        this.loadingVehicles = false;
      });
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
  // ==========================================

}


