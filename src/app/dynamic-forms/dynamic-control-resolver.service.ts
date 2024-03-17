import { Injectable, Type } from '@angular/core';
import { DynamicCheckboxComponent } from 'src/app/dynamic-forms/components/dynamic-checkbox.component';
import { DynamicInputComponent } from 'src/app/dynamic-forms/components/dynamic-input.component';
import { DynamicSelectComponent } from 'src/app/dynamic-forms/components/dynamic-select.component';
import { DynamicControl } from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms.model';

type DynamicControlsMap = {
  [T in DynamicControl['controlType']]: Type<any>
}

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {
  private controlComponents: DynamicControlsMap = {
    input: DynamicInputComponent,
    select: DynamicSelectComponent,
    checkbox: DynamicCheckboxComponent
  };

  resolve(controlType: keyof DynamicControlsMap) {
    return this.controlComponents[controlType];
  }
}
