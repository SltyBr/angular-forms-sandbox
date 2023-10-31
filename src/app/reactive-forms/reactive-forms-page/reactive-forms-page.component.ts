import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo } from 'src/app/core/user-info';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserSkillsService } from 'src/app/core/user-skills.service';
import { Subscription, bufferCount, filter, startWith, tap } from 'rxjs';
import { banWords } from 'src/app/reactive-forms/validators/ban-words.validator';
import { passwordShouldMatch } from 'src/app/reactive-forms/validators/password-should-match';
import { UniqueNameValidator } from 'src/app/reactive-forms/validators/unique-name.validator';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: ['./reactive-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {
  private ageValidatorSub!: Subscription;
  private formPendingState!: Subscription;
  ngOnDestroy(): void {
    this.ageValidatorSub?.unsubscribe();
    this.formPendingState?.unsubscribe();
  }
  public userInfo: UserInfo = {
    firstName: 'Pavel',
    lastName: '',
    nickname: '',
    email: '',
    yearOfBirth: 0,
    passport: '',
    fullAddress: '',
    city: '',
    postCode: 0,
    password: '',
    confirmPassword: ''
  }

  public phoneLabels = ['home', 'work', 'main'];

  public userSkills$ = inject(UserSkillsService).getSkills().pipe(
    tap(skills => this._buildSkillsControls(skills))
  );

  private _fb = inject(FormBuilder);
  private _cdr = inject(ChangeDetectorRef);
  private uniqueValidator = inject(UniqueNameValidator);
  @ViewChild(FormGroupDirective)
  private formRef!: FormGroupDirective;
  private initialFormValue: any;

  public form = this._fb.group({
    firstName: this._fb.nonNullable.control('Pavel', [Validators.required, Validators.minLength(3), banWords(['test', 'test1'])]),
    lastName: ['Popov', [Validators.required, Validators.minLength(2)]],
    nickName: ['Slty',
      {
        validators: [Validators.required, Validators.minLength(2), Validators.pattern(/^[\w.]+$/)],
        asyncValidators: [this.uniqueValidator.validate.bind(this.uniqueValidator)],
        updateOn: 'blur'
      }],
    email: ['', [Validators.required, Validators.email]],
    yearOfBirth: this._fb.nonNullable.control(this.getYears()[this.getYears().length - 1]),
    passport: ['', [Validators.pattern(/^[0-9]{4} [0-9]{6}/)]],
    address: this._fb.nonNullable.group({
      fullAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: [0, [Validators.required]],
    }),
    phones: this._fb.array([
      this._initPhoneFormGroup()
    ]),
    skills: this._fb.record<boolean>({}),
    password: this._fb.group({
      password: '',
      confirmPassword: ''
    }, { validators: [Validators.required, passwordShouldMatch]})
  });

  public ngOnInit(): void {
    this.initialFormValue = this.form.value;
    this.ageValidatorSub = this.form.controls.yearOfBirth.valueChanges.pipe(
      tap(() => this.form.controls.passport.markAsDirty()),
      startWith(this.form.controls.yearOfBirth.value)
    ).subscribe(
      year => {
        if (year) {
          const passport = this.form.controls.passport
          this.isAdult(year) ?
          passport.addValidators(Validators.required) :
          passport.removeValidators(Validators.required)
          passport.updateValueAndValidity();
        }
      }
    )

    this.formPendingState = this.form.controls.nickName.statusChanges.pipe(
      bufferCount(2, 1),
      filter(([prevState]) => prevState === 'PENDING')
    ).subscribe(() => this._cdr.markForCheck())
  }

  private isAdult(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - year >= 18;
  }

  public years = this.getYears();

  private getYears(): number[] {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, i) => now - i);
  }


  public addPhone() {
    this.form.controls.phones.push(
      this._initPhoneFormGroup()
    )
  }

  public removePhone(i: number) {
    this.form.controls.phones.removeAt(i);
  }

  private _initPhoneFormGroup(): FormGroup {
    return this._fb.group({
      label: this._fb.nonNullable.control(this.phoneLabels[0]),
      phone: ''
    })
  }

  public onSubmit(): void {
    console.log(this.form.value);
    this.initialFormValue =  this.form.value;
    this.formRef.resetForm();
  }

  private _buildSkillsControls(skills: string[]) {
    skills.forEach(skill => {
      this.form.controls.skills.addControl(skill, this._fb.nonNullable.control(false))
    })
  }

  public onReset(event: Event): void {
    event.preventDefault();
    this.formRef.reset(this.initialFormValue)
  }
}
