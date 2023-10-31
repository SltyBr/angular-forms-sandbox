import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSkillsService {

  getSkills(): Observable<string[]> {
    return of(['angular', 'svelte', 'react', 'vue']).pipe(
      delay(1000)
    )
  }
}
