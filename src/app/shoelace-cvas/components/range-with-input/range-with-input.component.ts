import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlControls } from 'src/app/shoelace-cvas/directives/sl-form-adapter.directive';
import { BaseShoelaceCva } from 'src/app/shoelace-cvas/shoelace-cvas.model';
import { SlRange } from '@shoelace-style/shoelace';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-range-with-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './range-with-input.component.html',
  styleUrls: ['./range-with-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RangeWithInputComponent,
      multi: true
    }
  ]
})
export class RangeWithInputComponent extends BaseShoelaceCva {
  @Input() label = '';
  @Input() max = 150;
  @ViewChild('elRef', {static: true})
  elRef!: ElementRef<SlRange>;

  setValue(event: Event): void {
    const value = (event.target as SlControls).value;
    this.writeValue(value);
    this.onChange(value);
  }
}
