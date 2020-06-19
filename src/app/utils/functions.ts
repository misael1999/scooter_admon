import { FormGroup, Validators } from '@angular/forms';
import * as CONSTANTS from './constants';
import { GlobalValidator } from './validators';

export function markAsTouched(form: FormGroup) {
    const controls = form.controls;
    for (const control in controls) {
        if (control) {
            form.get(control).markAsTouched();
        }
    }
}

export const globalValid = [GlobalValidator.noSpecialCharacters, Validators.required, Validators.maxLength(CONSTANTS.MAX_LENGTH_GLOBAL)];
export const optionalGlobalValid = [GlobalValidator.noSpecialCharacters,
    Validators.maxLength(CONSTANTS.MAX_LENGTH_GLOBAL)];
export const globalValidNumbers = [GlobalValidator.noSpecialCharacters, Validators.required];
export const globalValidEmail = [GlobalValidator.mailFormat, Validators.required];
export const globalValidPhoneNumber = [GlobalValidator.phoneFormat, Validators.required];
export const globalValidator = GlobalValidator;

