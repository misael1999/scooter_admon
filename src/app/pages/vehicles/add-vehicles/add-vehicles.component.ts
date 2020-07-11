import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiclesService } from '../../../services/vehicles.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewVehiclesComponent } from '../view-vehicles/view-vehicles.component';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';


@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.scss']
})

export class AddVehiclesComponent implements OnInit {
  typeVehicles: Array<any> = [];
  vehicleForm: FormGroup;

  constructor(private vehicleService: VehiclesService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddVehiclesComponent>) { }

  ngOnInit(): void {
    this.getTypeVehicle();
    this.buildVehicleForm();
  }

  getTypeVehicle() {
    this.vehicleService.getTypeVehicles()
      .subscribe((data: any) => {
        this.typeVehicles = data.data;
        console.log('Los tipos', this.typeVehicles);
      }, error => {
      });
  }

  editVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicle = this.vehicleForm.value;
  }

  addVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicle = this.vehicleForm.value;
    this.vehicleService.createVehicle(vehicle)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Se agrego un nuevo vehiculo',
          type: 'success',
          timer: 2000
        });
        this.dialogRef.close(true);
      }, error => {
        console.log('Error' + error);
      }
      );
  }

  buildVehicleForm() {
    this.vehicleForm = this.fb.group({
      alias: [null, Validators.required],
      model: [null, Validators.required],
      type_vehicle_id: [null, Validators.required],
      year: [null, Validators.required],
      plate: [null, Validators.required],
    });
  }

  // Metodos para validar ==============================
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


