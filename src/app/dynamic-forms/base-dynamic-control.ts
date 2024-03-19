import { KeyValue } from '@angular/common';
import { Directive, HostBinding, OnInit, StaticProvider, inject } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { CONTROL_DATA } from 'src/app/dynamic-forms/control-data.token';
import { DynamicControl } from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms.model';
import { banWords } from 'src/app/reactive-forms/validators/ban-words.validator';

export const comparatorFn = (
  a: KeyValue<string, DynamicControl>,
  b: KeyValue<string, DynamicControl>
): number => a.value.order - b.value.order;

export const dynamicControlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Directive()
export class BaseDynamicControl implements OnInit {
  @HostBinding('class') hostClass = 'form-field';
  control = inject(CONTROL_DATA);

  private parentGroupDir = inject(ControlContainer);

  protected formControl: AbstractControl = new FormControl(
    this.control.config.value, this.resolveValidators(this.control.config)
  );

  ngOnInit(): void {
    (this.parentGroupDir.control as FormGroup).addControl(this.control.controlKey, this.formControl)
  }

  private resolveValidators({ validators = {} }: DynamicControl) {
    return (Object.keys(validators) as Array<keyof typeof validators>).map(
      (validatorKey) => {
        const validatorValue = validators[validatorKey];
        if (validatorKey === 'required') {
          return Validators.required;
        }
        if (validatorKey === 'email') {
          return Validators.email;
        }
        if (
          validatorKey === 'minLength' &&
          typeof validatorValue === 'number'
        ) {
          return Validators.minLength(validatorValue);
        }
        if (validatorKey === 'banWords' && Array.isArray(validatorValue)) {
          return banWords(validatorValue);
        }
        if (validatorKey === 'requiredTrue') {
          return Validators.requiredTrue;
        }
        return Validators.nullValidator;
      }
    );
  }
}
