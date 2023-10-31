import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordShouldMatch(control: AbstractControl): ValidationErrors | null {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordShouldMatch: true }
}