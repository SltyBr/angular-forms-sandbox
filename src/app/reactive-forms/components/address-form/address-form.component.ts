import { ChangeDetectionStrategy, Component, Host, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input() controlKey = '';
  private controlContainer = inject(ControlContainer);
  private fb = inject(FormBuilder);

  get parentForm(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentForm.addControl(
      this.controlKey, this.fb.nonNullable.group({
        fullAddress: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postCode: [0, [Validators.required]],
      }),
    )
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(this.controlKey)
  }
}
