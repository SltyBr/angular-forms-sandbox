import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reusable-forms-cva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reusable-forms-cva.component.html',
  styleUrls: ['./reusable-forms-cva.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReusableFormsCvaComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      password: [],
      profile: []
    });
  }

  submit() {
    console.log(this.signupForm.value);
  }
}
