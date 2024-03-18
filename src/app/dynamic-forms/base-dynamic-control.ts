import { Directive, HostBinding, StaticProvider, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { CONTROL_DATA } from 'src/app/dynamic-forms/control-data.token';

export const dynamicControlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Directive()
export class BaseDynamicControl {
  @HostBinding('class') hostClass = 'form-field';
  control = inject(CONTROL_DATA);
}
