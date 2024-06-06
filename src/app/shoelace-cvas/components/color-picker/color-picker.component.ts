import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlCheckbox, SlColorPicker, SlInput, SlRange, SlSelect, SlSwitch, SlTextarea } from '@shoelace-style/shoelace';
import { BaseShoelaceCva } from 'src/app/shoelace-cvas/shoelace-cvas.model';

type SlControls = SlInput | SlRange | SlSwitch | SlTextarea | SlSelect;

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true
    }
  ]
})
export class ColorPickerComponent extends BaseShoelaceCva {
  @Input() label: string = '';
  @ViewChild('elRef', {static: true})
  elRef!: ElementRef<SlColorPicker>
}
