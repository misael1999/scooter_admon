import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { regexp } from './regexp';

export class GlobalValidator {

    static mailFormat(control: FormControl): ValidationResult {

        if (control.value !== '' && !regexp.email.test(control.value)) {
            return { incorrectMailFormat: true };
        }

        return null;
    }



    static phoneFormat(control: FormControl): ValidationResult {
        let count = 0;

        // tslint:disable-next-line:forin
        for (const i in control.value) {
            const char = control.value[i];
            if (!isNaN(char) && char !== ' ') { count++; }
        }

        return count === 10 || (count === 0 && control.value.length === 0) ? null : { incorrectPhoneFormat: true };
    }

    static phoneOrMail(control: FormControl): ValidationResult {
        const errorMail = GlobalValidator.mailNotRequiredFormat(control);
        const errorPhone = GlobalValidator.phoneNotRequiredFormat(control);
        if (!errorMail || !errorPhone) {
            return null;
        } else { return { incorrectPhoneOrMailFormat: true }; }
    }

    static maxAmount(max: number): ValidatorFn {
        return (c: AbstractControl): ValidationResult | null => {
            const controlValue = c.value.toString();
            let amount = '';
            // tslint:disable-next-line:forin
            for (const i in controlValue) {
                const char = controlValue[i];
                if (!isNaN(char) || char === '.') { amount += char; }
            }
            return Number(amount) <= max ? null : { incorrectMaxAmount: true };
        };
    }

    static mailNotRequiredFormat(control: FormControl): ValidationResult {
        if (control.value !== '' && !regexp.email.test(control.value)) {
            return { incorrectMailFormat: true };
        }

        return null;
    }

    static phoneNotRequiredFormat(control: FormControl): ValidationResult {
        let count = 0;

        // tslint:disable-next-line:forin
        for (const i in control.value) {
            const char = control.value[i];
            if (!isNaN(char) && char !== ' ') { count++; }
        }

        return count === 10 || (count === 0 && !control.value) ? null : { incorrectPhoneFormat: true };
    }

    static urlFormat(control: FormControl): ValidationResult {
        if (control.value !== '' && !regexp.url.test(control.value)) {
            return {
                incorrectUrlFormat: true
            };
        }
        return null;
    }

    static passwordFormat(control: FormControl): ValidationResult {
        if (control.value !== '' && !regexp.password.test(control.value)) {
            return {
                incorrectPasswordFormat: true
            };
        }
        return null;
    }
    static onlyIntegerNumbers(control: FormControl): ValidationResult {
        if (control.value !== '' && !regexp.onlyIntegerNumbers.test(control.value)) {
            return {
                incorrectNumberFormat: true
            };
        }
        return null;
    }

    static noSpecialCharacters(control: FormControl): ValidationResult {
        if (control.value !== '' && !regexp.noSpecialCharacteres.test(control.value)) {
            return {
                incorrectSpecialCharacters: true
            };
        }
        return null;
    }

    static confirmPassword(control: AbstractControl) {
        const password = control.get('password').value; // to get value in input tag
        const confirmPassword = control.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors( {matchPassword: true} );
        } else {
            return null;
        }
    }

}


interface ValidationResult {
    [key: string]: boolean;
}

