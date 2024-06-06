import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from 'src/app/shoelace-cvas/components/color-picker/color-picker.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RangeWithInputComponent } from 'src/app/shoelace-cvas/components/range-with-input/range-with-input.component';
import { SelectWithInputComponent } from 'src/app/shoelace-cvas/components/select-with-input/select-with-input.component';
import { NativeColorPickerComponent } from 'src/app/shoelace-cvas/components/native-color-picker/native-color-picker.component';

@Component({
  selector: 'app-shoelace-cvas-page',
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerComponent,
    ReactiveFormsModule,
    RangeWithInputComponent,
    SelectWithInputComponent,
    NativeColorPickerComponent
  ],
  templateUrl: './shoelace-cvas-page.component.html',
  styleUrls: ['./shoelace-cvas-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoelaceCvasPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  public formGroup = this.fb.group({});

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
