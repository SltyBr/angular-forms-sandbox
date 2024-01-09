import { Injector, Pipe, PipeTransform, inject } from '@angular/core';
import { CONTROL_DATA } from 'src/app/dynamic-forms/control-data.token';
import { DynamicControl } from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms.model';

@Pipe({
  name: 'controlInjector',
  standalone: true
})
export class ControlInjectorPipe implements PipeTransform {

  injector = inject(Injector);

  transform(controlKey: string, config: DynamicControl): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: CONTROL_DATA,
          useValue: { controlKey, config }
        }
      ]
    });
  }

}
