import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SlFormAdapterDirective } from 'src/app/shoelace-cvas/directives/sl-form-adapter.directive';

@Component({
  selector: 'app-native-color-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './native-color-picker.component.html',
  styleUrls: ['./native-color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NativeColorPickerComponent implements OnInit {
  public formControl = new FormControl('#111111');
  public parentForm = inject(FormGroupDirective);

  ngOnInit(): void {
    this.parentForm.form.addControl('native-color', this.formControl)
  }
}
