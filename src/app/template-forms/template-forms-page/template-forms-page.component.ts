import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/core/user-info';
import { BanWordsDirective } from 'src/app/template-forms/validators/ban-words.directive';
import { PasswordShouldMatchDirective } from 'src/app/template-forms/validators/password-should-match.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule, BanWordsDirective, PasswordShouldMatchDirective],
  templateUrl: './template-forms-page.component.html',
  styleUrls: ['./template-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateFormsPageComponent {
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

  public get isAdult() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  public get years(): number[] {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, i) => now - i);
  }

  public onSubmit(form: NgForm, event: Event): void {
    console.log(form.value, event);
  }
}
