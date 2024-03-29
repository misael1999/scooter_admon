import { FormGroup } from '@angular/forms';
import Swal, { SweetAlertResult, SweetAlertType } from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

export class ValidationForms {

    constructor() { }

    isFieldTouched(group: FormGroup, field: string): boolean {
        return (group.get(field)?.touched);
    }

    isFieldDirty(group: FormGroup, field: string): boolean {
        return (group.get(field)?.dirty);
    }

    isFieldInvalid(group: FormGroup, ...fields: string[]): boolean {
        return fields.some(field => group.get(field)?.invalid && group.get(field)?.touched);
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
            type,
            timer: 3000,
            confirmButtonColor: '#02D3EF',
            confirmButtonText: 'Aceptar',
        });
    }

    showMessageConfirm(message: string): Promise<SweetAlertResult> {
        return Swal.fire({
            title: '¿Estás seguro?',
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#02D3EF',
            cancelButtonColor: '#E2584C',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            reverseButtons: true
        });
    }
}
