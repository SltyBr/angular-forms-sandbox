import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl } from 'src/app/dynamic-forms/base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ng-container [formGroup]="formGroup">
      <label [for]="control.controlKey">{{ control.config.label }}</label>
      <input [formControlName]="control.controlKey" [id]="control.controlKey" [value]="control.config.value" [type]="control.config.type">
    </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicInputComponent extends BaseDynamicControl {}
