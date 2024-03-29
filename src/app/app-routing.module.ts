import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomSelectComponent } from 'src/app/custom-select-page/custom-select/custom-select.component';
import { DynamicFormsPageComponent } from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms-page.component';
import { RatingPickerComponent } from 'src/app/rating-picker-page/rating-picker/rating-picker.component';
import { ReactiveFormsPageComponent } from 'src/app/reactive-forms/reactive-forms-page/reactive-forms-page.component';
import { TemplateFormsPageComponent } from 'src/app/template-forms/template-forms-page/template-forms-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'template-forms',
    pathMatch: 'full'
  },
  {
    path: 'template-forms',
    component: TemplateFormsPageComponent,
  },
  {
    path: 'reactive-forms',
    component: ReactiveFormsPageComponent,
  },
  {
    path: 'rating-picker',
    component: RatingPickerComponent,
  },
  {
    path: 'custom-select',
    component: CustomSelectComponent,
  },
  {
    path: 'dynamic-forms',
    component: DynamicFormsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
