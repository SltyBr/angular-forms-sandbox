import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl, dynamicControlProvider } from 'src/app/dynamic-forms/base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlInjectorPipe } from 'src/app/dynamic-forms/control-injector.pipe';
import { DynamicControlResolver } from 'src/app/dynamic-forms/dynamic-control-resolver.service';

@Component({
  selector: 'app-dynamic-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlInjectorPipe],
  viewProviders: [dynamicControlProvider],
  template: `
    <fieldset [formGroupName]="control.controlKey">
      <legend>{{ control.config.label }}</legend>
      <ng-container *ngFor="let control of control.config.controls | keyvalue">
        <ng-container
          [ngComponentOutlet]="controlResolver.resolve(control.value.controlType) | async"
          [ngComponentOutletInjector]="control.key | controlInjector : control.value"
        ></ng-container>
      </ng-container>
    </fieldset>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGroupComponent extends BaseDynamicControl {
  @HostBinding('class') override hostClass = 'form-field-group';
  controlResolver = inject(DynamicControlResolver);
}
