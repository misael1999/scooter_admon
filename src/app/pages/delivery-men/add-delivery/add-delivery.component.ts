import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  adressForm: FormGroup;
  vehicles: Array<any> = [];

  constructor(private deliveryService: DeliveryMenService, private vehicleService: VehiclesService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<AddDeliveryComponent>) {
  }

  ngOnInit(): void {
    this.getVehicles();
    this.buildDeliveryForm();
    this.builAdressDeliveryForm();
  }

  // Se obtienen los vehiculos para mostrarlos en el select
  getVehicles() {
    this.vehicleService.getVehicles()
      .subscribe((data: any) => {
        this.vehicles = data.results;
      }, error => {
        return;
      });
  }


  // Agregamos un nuevo repartidor
  addDelivery() {
    if (this.deliveryForm.invalid && this.adressForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      this.adressForm.markAllAsTouched();
      return;
    }
    const delivery = this.deliveryForm.value;
    const deliveryAdress = this.adressForm.value;
    delivery.address = deliveryAdress;
    this.deliveryService.createDelevery(delivery)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Se agrego un nuevo repartidor',
          type: 'success',
          timer: 2000
        });
        this.dialogRef.close(true);
      }, error => {
        console.log('Error al agregar' + error);
      });
  }

  // Se contrulle el formulario para un repartidor nuevo
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
  // Fin ==========================


  // Editar un repartidor
  editDelivery(delivery, idDelivery) {
    this.deliveryService.editDelivery(idDelivery, delivery)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Se edito el repartidor',
          type: 'success',
          confirmButtonText: 'Aceptar',
          timer: 2000
        });
        this.dialogRef.close(true);
        this.adressForm = data;
      });
  }

  buildEditDeliveryForm(delivery) {
    this.deliveryForm = this.fb.group({
      name: [delivery.name, Validators.required],
      last_name: [delivery.last_name, Validators.required],
      phone_number: [delivery.phone_number, Validators.required],
      salary_per_order: [delivery.salary_per_order, Validators.required],
      password: [delivery.password, Validators.required],
      vehicle_id: [delivery.vehicle_id, Validators.required],
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
