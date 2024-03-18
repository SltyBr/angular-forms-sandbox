import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl, dynamicControlProvider } from 'src/app/dynamic-forms/base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [dynamicControlProvider],
  template: `
    <label [for]="control.controlKey">{{ control.config.label }}</label>
    <select [formControlName]="control.controlKey" [id]="control.controlKey" [value]="control.config.value">
      <option *ngFor="let o of control.config.options" [value]="o.value">{{o.label}}</option>
    </select>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicSelectComponent extends BaseDynamicControl {}
