import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-rates',
  templateUrl: './tab-rates.component.html',
  styleUrls: ['./tab-rates.component.scss']
})
export class TabRatesComponent implements OnInit {

  station: any;
  services = [];
  ratesServicesForm: FormGroup;
  servicesForm;
  loadingSaveInfo = false;


  constructor(private profileService: ProfileService,
    private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildRateServicefForm();
    this.station = this.profileService.station;
    this.services = this.station.services;
    this.addRateService(this.services);
  }

  // Builds forms
  buildRateServicefForm() {
    this.ratesServicesForm = this.fb.group({
      services: this.fb.array([], Validators.required),
    });
  }

  // 
  addRateService(services: Array<any>): void {
    this.servicesForm = this.ratesServicesForm.get('services') as FormArray;
    services.forEach((service) => {
      this.servicesForm.push(this.createRateService(service));
    });
    // this.deleteRateService(event.service_id);
  }


  createRateService(service): FormGroup {
    return this.fb.group({
      service_id: [service.service_id],
      service_name: [service.service],
      base_rate_price: [service.base_rate_price, Validators.required],
      from_kilometer: [service.from_kilometer, Validators.required],
      to_kilometer: [service.to_kilometer, Validators.required],
      price_kilometer: [service.price_kilometer, Validators.required]
    });
  }

  get rateServiceFormData(): any { return this.ratesServicesForm.get('services'); }


  deleteRateService(serviceId: any) {
    const rates = this.ratesServicesForm.get('services') as FormArray;
    const index = rates.controls.findIndex((control) => {
      return control.get('service_id').value === serviceId;
    });
    rates.removeAt(index);
  }

  saveRatesInfo() {
    if (this.ratesServicesForm.invalid) {
      this.ratesServicesForm.markAllAsTouched();
      return;
    }

    const services = this.ratesServicesForm.get('services').value;
    this.loadingSaveInfo = true;
    this.profileService.updateStation({ services })
      .subscribe((data: any) => {
        this.showMessageSuccess('Tarífas actualizada correctamente');
        this.loadingSaveInfo = false;
        // localStorage.setItem('station', JSON.stringify(data.data));
        // location.reload();
        this.ratesServicesForm.markAsPristine();
      }, error => {
        this.loadingSaveInfo = false;
        this.showMessageError(error.errors.message);
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


  // Metodos para validar
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
