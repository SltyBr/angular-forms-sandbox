import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from 'src/app/dynamic-forms/base-dynamic-control';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: sharedDynamicControlDeps,
  viewProviders: [dynamicControlProvider],
  template: `
    <label [for]="control.controlKey">{{ control.config.label }}</label>
    <input [formControlName]="control.controlKey" [id]="control.controlKey" [value]="control.config.value" [type]="control.config.type">
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicInputComponent extends BaseDynamicControl {}
