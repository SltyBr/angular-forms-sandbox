import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { UsersService } from 'src/app/core/users.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueNameValidator implements AsyncValidator {
  private userService = inject(UsersService);

  validate(control: AbstractControl<string | null>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.getUserByName(control.value).pipe(
      map(users => users.length === 0 ? null : {uniqueName: {taken: true}}),
      catchError(() => of({uniqueName: {unknownError: true}}))
    )
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}
