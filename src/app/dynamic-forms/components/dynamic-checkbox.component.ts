import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from 'src/app/dynamic-forms/base-dynamic-control';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  imports: sharedDynamicControlDeps,
  viewProviders: [dynamicControlProvider],
  template: `
    <input type="checkbox" [formControlName]="control.controlKey" [checked]="control.config.value" [id]="control.controlKey" >
    <label [for]="control.controlKey">{{ control.config.label }}</label>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCheckboxComponent extends BaseDynamicControl{

}
