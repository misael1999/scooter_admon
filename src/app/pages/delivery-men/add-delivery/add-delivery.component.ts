import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeliveryMenService } from '../../../services/delivery-men.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss']
})
export class AddDeliveryComponent implements OnInit {
  deliveryForm: FormGroup;

  constructor(private deliveryService: DeliveryMenService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  addVehicles() {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }
    const delivery = this.deliveryForm.value;
    this.deliveryService.createDelevery(delivery)
      .subscribe((data: any) => {
        alert(data.message);
        console.log(data);
      }, error => {
        console.log('Error' + error);
      });

  }
  buildDeliveryForm() {
    this.deliveryForm = this.fb.group({
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
