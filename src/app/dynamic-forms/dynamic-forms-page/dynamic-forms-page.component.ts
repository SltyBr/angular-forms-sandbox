import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  DynamicFormConfig
} from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms.model';
import {
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { DynamicControlResolver } from 'src/app/dynamic-forms/dynamic-control-resolver.service';
import { ControlInjectorPipe } from 'src/app/dynamic-forms/control-injector.pipe';
import { comparatorFn } from 'src/app/dynamic-forms/base-dynamic-control';

@Component({
  selector: 'app-dynamic-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlInjectorPipe],
  templateUrl: './dynamic-forms-page.component.html',
  styleUrls: ['./dynamic-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormsPageComponent implements OnInit {
  protected comparatorFn = comparatorFn;

  protected formLoadingTrigger = new Subject<'user' | 'company'>();
  protected formConfig$!: Observable<{form: FormGroup, config: DynamicFormConfig}>;
  private http = inject(HttpClient);
  protected controlResolver = inject(DynamicControlResolver);

  ngOnInit() {
    this.formConfig$ = this.formLoadingTrigger.pipe(
      switchMap((config) =>
        this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)
      ),
      map(config => ({
        config,
        form: new FormGroup({})
      }))
    );
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    form.reset();
  }
}
