import { ComponentRef, Directive, ElementRef, OnDestroy, OnInit, ViewContainerRef, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { EMPTY, Subscription, fromEvent, iif, merge, skip, startWith } from 'rxjs';
import { InputErrorComponent } from 'src/app/core/input-error/input-error.component';

@Directive({
  selector: '[ngModel],[formControl],[formControlName]',
  standalone: true,
})
export class DynamicValidatorMessage implements OnInit, OnDestroy {
  private ngControl = inject(NgControl, { self: true });
  private vcr = inject(ViewContainerRef);
  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private errorMessageTrigger!: Subscription;
  private elementRef = inject(ElementRef);
  private parentContainer = inject(ControlContainer, { optional: true });

  get form() {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null;
  }

  ngOnInit(): void {
    if (!this.ngControl.control) throw Error('NgControl not provided');

    this.errorMessageTrigger = merge(
      this.ngControl.control?.statusChanges,
      fromEvent(this.elementRef.nativeElement, 'blur'),
      iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
    ).pipe(
      startWith(this.ngControl.control.status),
      skip(this.ngControl instanceof NgModel ? 1 : 0),
    ).subscribe(() => {
      const errors = this.ngControl?.errors;
      if (errors && this.form?.submitted) {
        if (!this.componentRef) {
          this.componentRef = this.vcr.createComponent(InputErrorComponent);
        }
        this.componentRef.setInput('errors', errors)
      } else {
        this.componentRef?.destroy();
        this.componentRef = null;
      }
    })
  }

  ngOnDestroy(): void {
    this.errorMessageTrigger?.unsubscribe();
  }
}
