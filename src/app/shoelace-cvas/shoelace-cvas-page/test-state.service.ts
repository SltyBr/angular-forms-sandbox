import { Injectable } from '@angular/core';
import { isEqual } from 'lodash-es';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestStateService {
  #ids = new BehaviorSubject<Set<number>>(new Set());
  public ids$ = this.#ids.asObservable().pipe(
    distinctUntilChanged(isEqual)
  )

  changeIds(ids: Set<number>): void {
    this.#ids.next(ids)
  }
}
