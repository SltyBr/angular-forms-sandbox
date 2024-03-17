import { Directive, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CONTROL_DATA } from 'src/app/dynamic-forms/control-data.token';

@Directive()
export class BaseDynamicControl {
    control = inject(CONTROL_DATA);
    protected parentFormGroup = inject(ControlContainer);
    get formGroup() {
        return this.parentFormGroup.control as FormGroup;
    }
}