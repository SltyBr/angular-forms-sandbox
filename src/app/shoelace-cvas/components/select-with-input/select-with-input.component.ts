import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SlFormAdapterDirective } from 'src/app/shoelace-cvas/directives/sl-form-adapter.directive';
import { SlCheckbox, SlInput, SlSelect } from '@shoelace-style/shoelace';
import { NativeColorPickerComponent } from 'src/app/shoelace-cvas/components/native-color-picker/native-color-picker.component';

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

@Component({
  selector: 'app-select-with-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SlFormAdapterDirective, NativeColorPickerComponent],
  templateUrl: './select-with-input.component.html',
  styleUrls: ['./select-with-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectWithInputComponent implements OnInit {
  @Input() fonts = fonts;
  @ViewChild('checkbox', { static: true })
  checkboxRef!: ElementRef<SlCheckbox>;
  private fb = inject(FormBuilder);
  public formGroup = this.fb.group({
    fontFamily: 'Inter',
    fontSize: 14,
    checkbox: true
  });
  private parentFormGroup = inject(FormGroupDirective);

  ngOnInit(): void {
    this.parentFormGroup.form.addControl('text', this.formGroup);
    //this.checkboxRef.nativeElement.checked = true
  }

  onCheckbox(event: Event): void {
    //console.log(event)
  }

  // public onTouch!: () => void;

  // writeValue(value: any): void {
  //   value && this.formGroup.setValue(value, { emitEvent: false });
  // }
  // registerOnChange(fn: (val: any) => void): void {
  //   this.formGroup.valueChanges.subscribe(fn);
  // }
  // registerOnTouched(fn: any): void {
  //   this.onTouch = fn;
  // }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.formGroup.disable() : this.formGroup.enable()
  // }

  // onSelectChange(event: Event): void {
  //   const value = (event.target as SlSelect).value as string;
  //   this.formGroup.controls.fontFamily.setValue(value);
  // }

  // onInputChange(event: Event): void {
  //   const value = (event.target as SlInput).value;
  //   this.formGroup.controls.fontSize.setValue(+value);
  // }
}
