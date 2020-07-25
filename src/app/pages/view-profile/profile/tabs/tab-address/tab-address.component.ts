import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/pages/traicing/map-traicing/map-location/map-location.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-address',
  templateUrl: './tab-address.component.html',
  styleUrls: ['./tab-address.component.scss']
})
export class TabAddressComponent implements OnInit {

  addressForm: FormGroup;
  loadingSaveInfo = false;
  station: any;
  address: any;
  isChangeAddress = false;

  // google maps zoom level
  zoom = 17;
  currentMarker: Marker = {
    lat: 18.462859841665864,
    lng: -97.39279966871719,
    draggable: false
  };

  // initial center position for the map
  lat = 18.462859841665864;
  lng = -97.39279966871719;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.station = this.profileService.station;
    this.address = this.station.address;
    this.buildAddressForm(this.address);
    this.getPoint(this.address.point);
  }

  getPoint(point) {
    if (point.coordinates) {
      this.currentMarker.lat = point.coordinates[1],
      this.currentMarker.lng = point.coordinates[0]

      this.lat = point.coordinates[1];
      this.lng = point.coordinates[0];
    }
  }

  buildAddressForm(address) {
    this.addressForm = this.fb.group({
      street: [address.street, Validators.required],
      suburb: [address.suburb, Validators.required],
      postal_code: [address.postal_code, Validators.required],
      exterior_number: [address.exterior_number, Validators.required],
      inside_number: [address.inside_number],
      references: [address.references]
    });
  }

  setMarkerMap($event) {
    this.currentMarker.lat = $event.coords.lat;
    this.currentMarker.lng = $event.coords.lng;
    this.currentMarker.draggable = true;
    this.isChangeAddress = true;
  }

  saveAddressInfo() {

    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
  
    const info = this.addressForm.value;
    info.point = {lat: this.currentMarker.lat, lng: this.currentMarker.lng};
    
    this.loadingSaveInfo = true;
    
    this.profileService.updateStation({address: info})
    .subscribe((data: any) => {
      this.showMessageSuccess('Dirección actualizada correctamente');
      this.loadingSaveInfo = false;
      localStorage.setItem('station', JSON.stringify(data.data));
      // location.reload();
      this.addressForm.markAsPristine();
      this.isChangeAddress = false;
    }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSaveInfo = false;
      });

  }

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

  isFieldInvalid(form: FormGroup, field: string) {
    return (
      (!form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldValid(form: FormGroup, field: string) {
    return (
      (form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldHasError(form: FormGroup, field: string, error: string) {
    return (
      (form.get(field).hasError(error))
    );
  }

}
