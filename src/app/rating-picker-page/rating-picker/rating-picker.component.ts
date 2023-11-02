import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@polymer/paper-input/paper-textarea'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EditableContentDirective } from 'src/app/rating-picker-page/value-accessor/editable-content.directive';

@Component({
  selector: 'app-rating-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditableContentDirective],
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RatingPickerComponent {
  private fb = inject(FormBuilder);
  public form = this.fb.group({
    reviewText: ''
  })

  public onSubmit(): void {
    console.log(this.form.value);
    this.form.reset();
  }
}
