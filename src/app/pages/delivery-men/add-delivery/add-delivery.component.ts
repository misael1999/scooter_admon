import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeliveryMenService } from 'src/app/services/delivery-men.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent extends ValidationForms implements OnInit {
  deliveryForm: FormGroup;
  deliveryMan;
  loadingSave: boolean;

  constructor(private fb: FormBuilder,
              private deliveryService: DeliveryMenService,
              public dialogRef: MatDialogRef<AddDeliveryComponent>,
              @Inject(MAT_DIALOG_DATA)
    public data: any) {
    super();
    if (data.deliveryMan) {
      this.deliveryMan = data.deliveryMan;
      this.buildUpdateForm(this.deliveryMan);
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void { }

  createDelivery() {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }
    const delivery = this.deliveryForm.value;
    this.loadingSave = true;
    if (this.deliveryMan) {
      // ======= Actualizar repartidor ========
      this.updateDelivery(this.deliveryMan.id, delivery);
    } else {
      // ======= Agregar repartidor ========
      this.addDelivery(delivery);
    }
  }

  addDelivery(delivery) {
    this.deliveryService.createDelevery(delivery)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor agregado correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }

  buildForm() {
    this.deliveryForm = this.fb.group(
      {
        name: [null, Validators.required],
        last_name: [null, Validators.required],
        phone_number: [null, [Validators.required, Validators.minLength(10)]],
        password: [null, Validators.required],
        vehicle_plate: [null, Validators.required],
        vehicle_model: [null, Validators.required],
        vehicle_year: [null, Validators.required],
        vehicle_color: [null, Validators.required],
        vehicle_type: [null, Validators.required],
      }
    );
  }

  updateDelivery(deliveryManId, delivery) {
    if (delivery.password == null) {
      delete delivery.password;
    }
    this.deliveryService.editDelivery(deliveryManId, delivery)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor actualizado correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }

  buildUpdateForm(deliveryMan) {
    console.log(deliveryMan);
    this.deliveryForm = this.fb.group(
      {
        name: [deliveryMan.name, Validators.required],
        last_name: [deliveryMan.last_name, Validators.required],
        phone_number: [deliveryMan.phone_number, [Validators.required, Validators.minLength(10)]],
        password: [null],
        vehicle_plate: [deliveryMan.vehicle_plate, Validators.required],
        vehicle_model: [deliveryMan.vehicle_model, Validators.required],
        vehicle_year: [deliveryMan.vehicle_year, Validators.required],
        vehicle_color: [deliveryMan.vehicle_color, Validators.required],
        vehicle_type: [deliveryMan.vehicle_type, Validators.required],
      }
    );
  }
}
