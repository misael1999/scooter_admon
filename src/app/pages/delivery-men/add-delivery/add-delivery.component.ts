import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { VehiclesService } from '../../../services/vehicles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


export interface DialogData {
  delivery: any;
}


@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;
  adressForm: FormGroup;
  vehicles;
  delivery: any;

  constructor(private deliveryService: DeliveryMenService, private vehicleService: VehiclesService,
    private fb: FormBuilder, public dialogRef: MatDialogRef<AddDeliveryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.delivery = data.delivery;
    if (this.delivery) {
      this.buildEditDeliveryForm(this.delivery);
      this.builEditAdressDeliveryForm(this.delivery);
    } else {
      this.buildDeliveryForm();
      this.builAdressDeliveryForm();
    }
  }

  ngOnInit(): void {
    this.getVehicles();
    // this.buildDeliveryForm();
    // this.builAdressDeliveryForm();
  }

  // Se obtienen los vehiculos para mostrarlos en el select
  getVehicles() {
    this.vehicleService.getVehicles({status: 1})
      .subscribe((data: any) => {
        this.vehicles = data.results;
      }, error => {
        return;
      });
  }


  // Agregamos un nuevo repartidor
  addDelivery() {
    if (this.deliveryForm.invalid || this.adressForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      this.adressForm.markAllAsTouched();
      return;
    }
    const delivery = this.deliveryForm.value;
    const deliveryAdress = this.adressForm.value;
    delivery.address = deliveryAdress;
    if (this.delivery) {
      this.editDelivery(delivery, this.delivery.id);
    }
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
      phone_number: [null, [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}')), Validators.maxLength(10),
      Validators.minLength(10)]],
      salary_per_order: [null, Validators.required],
      password: [null, Validators.required],
      vehicle_id: [null, Validators.required],
    });
  }
  builAdressDeliveryForm() {
    this.adressForm = this.fb.group({
      street: [null],
      suburb: [null],
      postal_code: [null],
      exterior_number: [null],
      inside_number: [null],
      references: [null],
    });
  }
  // Fin


  // Editar un repartidor ==========================================
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
      phone_number: [delivery.phone_number, [Validators.required, Validators.pattern(new RegExp('[0-9 ]{10}')), Validators.maxLength(10),
      Validators.minLength(10)]],
      salary_per_order: [delivery.salary_per_order, Validators.required],
      password: [delivery.password, Validators.required],
      vehicle_id: [delivery.vehicle_id, Validators.required],
    });
  }
  builEditAdressDeliveryForm(delivery) {
    console.log(this.delivery.address);
    this.adressForm = this.fb.group({
      street: [delivery.address.street],
      suburb: [delivery.address.suburb],
      postal_code: [delivery.address.postal_code],
      exterior_number: [delivery.address.exterior_number],
      inside_number: [delivery.address.inside_number],
      references: [delivery.address.references],
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
