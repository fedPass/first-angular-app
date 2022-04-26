import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function checkWhiteSpaceValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        const hasWhiteSpace = value.includes(" ");
        console.log('spazi bianchi?',hasWhiteSpace);
        return hasWhiteSpace ? {whiteSpace:true}: null;
    }
}