import { Directive, inject } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
@Directive({
  selector: '[syncControl]',
  standalone: true,
})
export class SyncControlDirective {
  private ngControl = inject(NgControl);

  get control(): FormControl | null {
    return this.ngControl.control as FormControl;
  }

  ngOnInit() {
    if (!this.control) {
      return;
    }

    this.control.valueChanges.subscribe((value) => {
      this.control?.setValue(value, { emitEvent: false });
    });
  }
}
