import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';
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
  // Poligonos con todas las zonas
  polygones = [];
  station: any;
  restricted_zones_activated: boolean;
  promotions_zones_activated: boolean;

  constructor(private zonesService: ZonesService,
              private dialog: MatDialog, private profileService: ProfileService) { super(); }

  ngOnInit(): void {
    this.getStation();
    this.getArea();
    this.getZones();
  }

  getStation() {
    this.station = JSON.parse(localStorage.getItem('station'));
    // console.log(this.station);
    if (this.station.promotions_zones_activated !== null) {
      this.promotions_zones_activated = this.station.promotions_zones_activated;
      this.restricted_zones_activated = this.station.restricted_zones_activated;
    }
  }

  async changeSlidePromotions(e) {
    this.promotions_zones_activated = e.source.checked;

    // this.allowCancellations = true;
    const resp = await this.showMessageConfirm((e.source.checked ? 'Activar' : 'Desactivar') + ' promociones por zonas');
    if (resp.dismiss) {
      this.promotions_zones_activated = !this.promotions_zones_activated;
      return;
    } else {
      this.saveConfigInfo();
    }

  }

  async changeSlideRestricted(e) {
    this.restricted_zones_activated = e.source.checked;

    // this.allowCancellations = true;
    const resp = await this.showMessageConfirm((e.source.checked ? 'Activar' : 'Desactivar') + ' restricciones por zonas');
    if (resp.dismiss) {
      this.restricted_zones_activated = !this.restricted_zones_activated;
      return;
    } else {
      this.saveConfigInfo();
    }

  }


  saveConfigInfo() {

    const config = {
      restricted_zones_activated: this.restricted_zones_activated,
      promotions_zones_activated: this.promotions_zones_activated,
    };
    this.profileService.updateStation({ config })
      .subscribe((data: any) => {
        // this.showSwalMessage('Configuración actualizada correctamente');
        // this.loadingSaveInfo = false;
        localStorage.setItem('station', JSON.stringify(data.data));
        // this.isChangeConfig = false;
        // location.reload();
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        // this.loadingSaveInfo = false;
      });

  }

  getArea() {
    this.loadingArea = true;
    this.zonesService.getAreaByStation()
      .subscribe((data: any) => {
        this.loadingArea = false;
        this.setPolygon(data.poly.coordinates);

      }, error => {
        this.loadingArea = false;
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  getZones() {
    this.zonesService.getZones()
      .subscribe((data: any) => {
        this.zones = data.results;
        // console.log(this.zones);
      }, error => {
        alert(error.errors.message);
      });
  }

  openDialog(zone = null) {
    const dialogRef = this.dialog.open(AddZoneDialogComponent, {
      disableClose: true,
      minWidth: '60%',
      minHeight: '500px',
      data: { zone }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getZones();
        }
      });
  }

  setPolygon(coordinates) {
    for (const points of coordinates) {
      for (const coordinate of points) {
        this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
      }
    }
    console.log(this.paths);
  }

  /*   setPolygonesByZones(zones) {
      for (const zone of zones) {
        for (const points of zones.poly.coordinates) {
          for (const coordinate of points) {
            this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
          }
        }
      }
    } */

}
