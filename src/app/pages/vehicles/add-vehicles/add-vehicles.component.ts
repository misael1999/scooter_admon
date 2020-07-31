import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiclesService } from '../../../services/vehicles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

export interface DialogData {
  vehicle: any;
}

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.scss']
})

export class AddVehiclesComponent implements OnInit {
  typeVehicles: Array<any> = [];
  vehicleForm: FormGroup;
  vehicle: any;

  constructor(private vehicleService: VehiclesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddVehiclesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.vehicle = data.vehicle;
    if (this.vehicle) {
      this.buildEditVehicleForm(this.vehicle);
    } else {
      this.buildVehicleForm();

    }
  }

  ngOnInit(): void {
    this.getTypeVehicle();
  }

  getTypeVehicle() {
    this.vehicleService.getTypeVehicles()
      .subscribe((data: any) => {
        this.typeVehicles = data.data;
      }, error => {
        return;
      });
  }



  addVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicle = this.vehicleForm.value;

    if (this.vehicle) {
      this.editVehicle(vehicle, this.vehicle.id);
      return;
    }
    this.vehicleService.createVehicle(vehicle)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Se agrego un nuevo vehiculo',
          type: 'success',
          timer: 2000
        });
        this.dialogRef.close(true);
      }, error => {
        console.error('El error es', error.errors.message);

        Swal.fire({
          title: 'error',
          type: 'success',
          confirmButtonText: 'Aceptar',
        });
      });
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

  // Editar vehiculo
  editVehicle(vehicle, idVehicle) {
    this.vehicleService.editVehicle(idVehicle, vehicle)
      .subscribe((data: any) => {
        Swal.fire({
          title: 'Se edito el vehiculo',
          type: 'success',
          confirmButtonText: 'Aceptar',
          timer: 2000
        });
        this.dialogRef.close(true);
        this.vehicleForm = data;
        // console.log(this.vehicleForm);
      });
  }
  buildEditVehicleForm(vehicle) {
    this.vehicleForm = this.fb.group({
      alias: [vehicle.alias, Validators.required],
      model: [vehicle.model, Validators.required],
      type_vehicle_id: [vehicle.type_vehicle_id, Validators.required],
      year: [vehicle.year, Validators.required],
      plate: [vehicle.plate, Validators.required],
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


