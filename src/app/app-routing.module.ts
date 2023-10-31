import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
