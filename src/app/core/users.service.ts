import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _http = inject(HttpClient);

  public getUserByName(str: string | null): Observable<unknown[]> {
    return this._http.get<unknown[]>(`https://jsonplaceholder.typicode.com/users?username=${str}`)
  }
}
