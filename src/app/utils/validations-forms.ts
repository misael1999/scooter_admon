import { FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal, { SweetAlertResult, SweetAlertType } from 'sweetalert2';



export class ValidationForms {


    constructor() { }

    isFieldInvalid(group: FormGroup, field: string): boolean {
        return (
            (group.get(field).invalid && group.get(field).touched)
        );
    }

    isFieldValid(group: FormGroup, field: string): boolean {
        return (
            (group.get(field).valid && group.get(field).touched)
        );
    }

    hasFieldError(group: FormGroup, field: string, error: string): boolean {
        return (group.get(field).hasError(error));
    }


    showSwalMessage(message, type: SweetAlertType = 'success') {
        Swal.fire({
            title: message,
            type: type,
            timer: 3000
          });
    }

    showMessageConfirm(message: string): Promise<SweetAlertResult> {
        return Swal.fire({
          title: '¿Estas seguro?',
          text: message,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si'
        });
      }

}