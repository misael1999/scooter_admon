import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  adressForm: FormGroup;
  vehicles: Array<any> = [];

  constructor(private deliveryService: DeliveryMenService, private vehicleService: VehiclesService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getVehicles();
    this.buildDeliveryForm();
    this.builAdressDeliveryForm();
  }

  getVehicles() {
    this.vehicleService.getVehicles()
      .subscribe((data: any) => {
        this.vehicles = data.results;
      }, error => {
        return;
      });
  }


  addDelivery() {
    if (this.deliveryForm.invalid && this.adressForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      this.adressForm.markAllAsTouched();
      return;
    }
    const delivery = this.deliveryForm.value;
    const deliveryAdress = this.adressForm.value;
    console.log(delivery);
    console.log(deliveryAdress);
    this.deliveryService.createDelevery(delivery + deliveryAdress)
      .subscribe((data: any) => {
        alert(data.message);
        console.log(data);
      }, error => {
        console.log('Error al agregar' + error);
      });

  }

  buildDeliveryForm() {
    this.deliveryForm = this.fb.group({
      name: [null, Validators.required],
      last_name: [null, Validators.required],
      phone_number: [null, Validators.required],
      salary_per_order: [null, Validators.required],
      password: [null, Validators.required],
      vehicle_id: [null, Validators.required],
    });
  }

  builAdressDeliveryForm() {
    this.adressForm = this.fb.group({
      street: [null, Validators.required],
      suburb: [null, Validators.required],
      postal_code: [null, Validators.required],
      exterior_number: [null, Validators.required],
      inside_number: [null, Validators.required],
      references: [null, Validators.required],
    });
  }

  // Methods the verification in the form
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
