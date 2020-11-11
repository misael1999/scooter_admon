import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ZonesService } from 'src/app/services/zones.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { AddZoneDialogComponent } from '../add-zone-dialog/add-zone-dialog.component';

@Component({
  selector: 'app-main-zones',
  templateUrl: './main-zones.component.html',
  styleUrls: ['./main-zones.component.scss']
})
export class MainZonesComponent extends ValidationForms implements OnInit {

  loadingArea: boolean;
  paths = [];
  zones = [];

  constructor(private zonesService: ZonesService,
              private dialog: MatDialog) { super()}

  ngOnInit(): void {
    this.getArea();
    this.getZones();
  }

  getArea() {
    this.loadingArea = true;
    this.zonesService.getAreaByStation()
      .subscribe((data: any ) => {
        this.loadingArea = false;
        this.setPolygon(data.poly.coordinates);
      }, error => {
        this.loadingArea = false;
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  getZones() {
    this.zonesService.getZones()
    .subscribe((data: any) => {
      this.zones = data.results;
    }, error => {
      alert(error.errors.message);
    });
  }

  openDialog(zone = null) {
    const dialogRef = this.dialog.open(AddZoneDialogComponent, {
      disableClose: true, 
      minWidth: '60%',
      minHeight: '500px',
      data: {zone}
    });
  }

  setPolygon(coordinates) {
    for (const points of coordinates) {
      for (const coordinate of points) {
        this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
      }
    }
  }

}
