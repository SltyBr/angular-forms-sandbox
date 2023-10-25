import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Directive, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, finalize, map } from 'rxjs';

@Directive({
  selector: '[appUniqueName]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueNameDirective,
      multi: true
    }
  ]
})
export class UniqueNameDirective implements AsyncValidator{
  private _http = inject(HttpClient);
  private _cdr = inject(ChangeDetectorRef);

  validate(control: AbstractControl<string>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this._http.get<any[]>(`https://jsonplaceholder.typicode.com/users?username=${control.value}`).pipe(
      map(users => {
        return !users.length ?  null : {appUniqueName: {message: 'this user already exist'}}
      }),
      finalize(() => this._cdr.markForCheck())
    )
  }

}
