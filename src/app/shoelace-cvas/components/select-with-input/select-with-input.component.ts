import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SlFormAdapterDirective } from 'src/app/shoelace-cvas/directives/sl-form-adapter.directive';
import { SlCheckbox, SlInput, SlSelect } from '@shoelace-style/shoelace';
import { NativeColorPickerComponent } from 'src/app/shoelace-cvas/components/native-color-picker/native-color-picker.component';

export function valueOf<T = string>(event: Event): T {
  return (event as any).target.value;
}


export const fonts = [
  'Arial-Black',
  'Arial',
  'Comic-Sans-MS',
  'Courier-New',
  'Georgia',
  'Helvetica-Neue',
  'Impact',
  'Inter', //шрифт системы
  'Times-New-Roman',
  'Trebuchet-MS',
  'Verdana',
]

export enum FontFamily {
  ArialBlack,
  Arial,
  ComicSansMS,
  CourierNew,
  Georgia,
  HelveticaNeue,
  Impact,
  Inter,
  TimesNewRoman,
  TrebuchetMS,
  Verdana,
}

export const fontFamilyValue: Record<FontFamily, string> = {
  [FontFamily.ArialBlack]:
      'Arial Black, "Helvetica CY", "Nimbus Sans L", sans-serif',
  [FontFamily.Arial]: 'Arial, "Helvetica CY", "Nimbus Sans L", sans-serif',
  [FontFamily.ComicSansMS]: 'Comic Sans MS, "Monaco CY", sans-serif',
  [FontFamily.CourierNew]: 'Courier New, "Nimbus Mono L", monospace',
  [FontFamily.Georgia]: 'Georgia, "Century Schoolbook L", serif',
  [FontFamily.HelveticaNeue]:
      '"Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif',

  [FontFamily.Impact]: 'Impact, "Charcoal CY", sans-serif',
  [FontFamily.Inter]: 'Inter', //шрифт системы
  [FontFamily.TimesNewRoman]:
      'Times New Roman, "Times CY", "Nimbus Roman No9 L", serif',
  [FontFamily.TrebuchetMS]: 'Trebuchet MS, "Helvetica CY", sans-serif',
  [FontFamily.Verdana]: 'Verdana, "Geneva CY", "DejaVu Sans", sans-serif',
};

export const fontControlValue = new Map<string, number>([
  ['Arial Black', FontFamily.ArialBlack],
  ['Arial', FontFamily.Arial],
  ['Comic Sans MS', FontFamily.ComicSansMS],
  ['Courier New', FontFamily.CourierNew],
  ['Georgia', FontFamily.Georgia],
  ['Helvetica Neue', FontFamily.HelveticaNeue],
  ['Impact', FontFamily.Impact],
  ['Inter', FontFamily.Inter], //шрифт системы
  ['Times New Roman', FontFamily.TimesNewRoman],
  ['Trebuchet MS', FontFamily.TrebuchetMS],
  ['Verdana', FontFamily.Verdana],
]);

@Component({
  selector: 'app-select-with-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SlFormAdapterDirective, NativeColorPickerComponent],
  templateUrl: './select-with-input.component.html',
  styleUrls: ['./select-with-input.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectWithInputComponent implements OnInit {
  @Input() fonts = fonts;
  @ViewChild('checkbox', { static: true })
  checkboxRef!: ElementRef<SlCheckbox>;
  @ViewChild('selectRef', { static: true })
  selectRef!: ElementRef<SlSelect>;
  private fb = inject(FormBuilder);
  public formGroup = this.fb.group({
    fontFamily: 'Inter',
    fontSize: 14,
    checkbox: true
  });
  private parentFormGroup = inject(FormGroupDirective);

  public selectForm = this.fb.group({
    select: 'Georgia, "Century Schoolbook L", serif'
  });
  selectValue!: any;

  select = fontControlValue;

  ngOnInit(): void {
    this.parentFormGroup.form.addControl('text', this.formGroup);
    this.setSelectControlValue();

    this.selectForm.valueChanges.subscribe(console.log)
  }

  onSelectChange(event: Event): void {
    const value = Number(valueOf(event)) as FontFamily;
    console.log(value)
    const controlValue = fontFamilyValue[value];
    if (controlValue) {
      this.selectForm.controls.select.setValue(controlValue);
      this.selectForm.controls.select.markAsDirty();
    }
  }

  onSelectBlur(): void {
    this.selectForm.controls.select.markAsTouched();
  }

  setSelectControlValue(): void {
    const value = Object.entries(fontFamilyValue).find(([, value]) => this.selectForm.controls.select.value === value);

    if (value && value[0]) {
      const selectValue = value[0];
      this.selectRef.nativeElement.value = selectValue;
      console.log(this.selectRef.nativeElement.value)
    }
  }
}
