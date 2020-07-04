import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiclesService } from '../../../services/vehicles.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewVehiclesComponent } from '../view-vehicles/view-vehicles.component';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.scss']
})
export class AddVehiclesComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private vehicleService: VehiclesService, private fb: FormBuilder, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildVehicleForm();
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }



  
  editVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicle = this.vehicleForm.value;

    this.vehicleService.editVehicle(vehicle)
    .subscribe((data: any) => {

    } );

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
          title: 'Vehiculo Agregado',
          imageAlt: 'add'
          ,
          timer: 1500
        });
        alert(data.message);

        console.log(data);

      }, error => {
        console.log('Error' + error);
      }
      );
  }

  buildVehicleForm() {
    this.vehicleForm = this.fb.group({
      alias: [null, Validators.required],
      model: [null, Validators.required],
      year: [null, Validators.required],
      plate: [null, Validators.required],
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


