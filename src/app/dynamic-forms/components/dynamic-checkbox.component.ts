import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl } from 'src/app/dynamic-forms/base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ng-container [formGroup]="formGroup">
      <input type="checkbox" [formControlName]="control.controlKey" [checked]="control.config.value" [id]="control.controlKey" >
      <label [for]="control.controlKey">{{ control.config.label }}</label>
    </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCheckboxComponent extends BaseDynamicControl{

}
