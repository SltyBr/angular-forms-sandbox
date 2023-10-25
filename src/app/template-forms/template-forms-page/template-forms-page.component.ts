import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/core/user-info';
import { BanWordsDirective } from 'src/app/template-forms/validators/ban-words.directive';
import { PasswordShouldMatchDirective } from 'src/app/template-forms/validators/password-should-match.directive';
import { UniqueNameDirective } from 'src/app/template-forms/validators/unique-name.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BanWordsDirective, PasswordShouldMatchDirective, UniqueNameDirective],
  templateUrl: './template-forms-page.component.html',
  styleUrls: ['./template-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent implements AfterViewInit{
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

  @ViewChild(NgForm)
  formDir!: NgForm;

  private initialFormValues: unknown;

  ngAfterViewInit(): void {
    window.queueMicrotask(() => {
      this.initialFormValues = this.formDir.value;
    })
  }

  public get isAdult() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  public get years(): number[] {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, i) => now - i);
  }

  public onSubmit(event: Event): void {
    console.log(this.formDir.value, event);
    this.initialFormValues = this.formDir.value;
  }

  public onReset(event: Event): void {
    event.preventDefault();
    this.formDir.resetForm(this.initialFormValues)
  }
}
