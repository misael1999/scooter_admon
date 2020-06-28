import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.scss']
})
export class AddVehiclesComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private vehicleService: VehiclesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildVehicleForm();
  }

  addVehicle() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }
    const vehicle = this.vehicleForm.value;
    this.vehicleService.createVehicle(vehicle)
      .subscribe((data: any) => {
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


