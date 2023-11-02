import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { TemplateFormsPageComponent } from 'src/app/template-forms/template-forms-page/template-forms-page.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { RatingPickerComponent } from 'src/app/rating-picker-page/rating-picker/rating-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    TemplateFormsPageComponent,
    HeaderComponent,
    RouterModule,
    RatingPickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'custom-form-fields';
}
