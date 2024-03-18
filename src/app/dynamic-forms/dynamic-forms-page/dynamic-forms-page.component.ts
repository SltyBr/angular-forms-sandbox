import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DynamicControl, DynamicFormConfig } from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { banWords } from 'src/app/reactive-forms/validators/ban-words.validator';
import { DynamicControlResolver } from 'src/app/dynamic-forms/dynamic-control-resolver.service';
import { ControlInjectorPipe } from 'src/app/dynamic-forms/control-injector.pipe';

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlInjectorPipe],
  templateUrl: './dynamic-forms-page.component.html',
  styleUrls: ['./dynamic-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsPageComponent implements OnInit {
  form!: FormGroup;

  protected formLoadingTrigger = new Subject<'user' | 'company'>();
  protected formConfig$!: Observable<DynamicFormConfig>;
  private http = inject(HttpClient);
  protected controlResolver = inject(DynamicControlResolver);

  ngOnInit() {
    this.formConfig$ = this.formLoadingTrigger.pipe(
      switchMap(config => this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)),
      tap(({ controls }) => {
        this.buildForm(controls)
      })
    )
  }

  private buildForm(controls: DynamicFormConfig['controls']) {
    this.form = new FormGroup({});
    Object.keys(controls).forEach(key => this.buildControls(key, controls[key], this.form));
    console.log(this.form.value)
  }

  private buildControls(controlKey: string, config: DynamicControl, formGroup: FormGroup) {
    if (config.controlType === 'group') {
      this.buildGroup(controlKey, config.controls, formGroup);
      return;
    }
    const validators = this.resolveValidators(config);
    formGroup.addControl(controlKey, new FormControl(config.value, validators));
  }

  private buildGroup(controlKey: string, controls: DynamicControl['controls'], parentFormGroup: FormGroup) {
    if (!controls) return;

    const nestedFormGroup = new FormGroup({});
    Object.keys(controls).forEach(key => this.buildControls(key, controls[key], nestedFormGroup));
    parentFormGroup.addControl(controlKey, nestedFormGroup)
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();

  }

  private resolveValidators({validators = {}}: DynamicControl) {
    return (Object.keys(validators) as Array<keyof typeof validators>).map(validatorKey => {
      const validatorValue = validators[validatorKey]
      if (validatorKey === 'required') {
        return Validators.required
      }
      if (validatorKey === 'email') {
        return Validators.email
      }
      if (validatorKey === 'minLength' && typeof validatorValue === 'number') {
        return Validators.minLength(validatorValue)
      }
      if (validatorKey === 'banWords' && Array.isArray(validatorValue)) {
        return banWords(validatorValue);
      }
      if (validatorKey === 'requiredTrue') {
        return Validators.requiredTrue
      }
      return Validators.nullValidator
    })
  }
}
