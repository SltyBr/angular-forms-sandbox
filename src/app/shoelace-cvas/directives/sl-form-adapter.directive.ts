import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlCheckbox, SlInput, SlRadio, SlRange, SlSelect, SlSwitch, SlTextarea } from '@shoelace-style/shoelace';

export type controlWithCheckedProp = SlCheckbox | SlSwitch;
export type SlControls = SlInput | SlCheckbox | SlRadio | SlRange | SlSwitch | SlTextarea | SlSelect;

@Directive({
  selector: `
    sl-input[formControl],
    sl-input[formControlName],
    sl-checkbox[formControlName],
    sl-radio-group[formControlName],
    sl-range[formControlName],
    sl-select[formControlName],
    sl-switch[formControlName],
    sl-textarea[formControlName]`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SlFormAdapterDirective,
      multi: true
    }
  ],
  standalone: true,
})
export class SlFormAdapterDirective<T extends SlControls> implements ControlValueAccessor {
  private elementRef = inject(ElementRef);
  public onChange!: (newValue: string | number | boolean | string[]) => void;
  public onTouch!: () => void;

  private hasCheckedProp(target: T) {
    return target instanceof SlCheckbox || target instanceof SlSwitch;
  }

  @HostListener('sl-input', ['$event'])
  handleInput(e: Event) {
    const value = this.hasCheckedProp(e.target as T) ? (e.target as controlWithCheckedProp).checked : (e.target as T).value;
    this.onChange(value)
  }

  // @HostListener('sl-change', ['$event'])
  // handleChange(e: Event) {
  //   const value = this.hasCheckedProp(e.target as T) ? (e.target as controlWithCheckedProp).checked : (e.target as T).value;
  //   this.onChange(value)
  // }

  @HostListener('sl-blur')
  onBlur() {
    this.onTouch();
  }

  writeValue(value: any): void {
    const isCheckbox = this.elementRef.nativeElement instanceof SlCheckbox || this.elementRef.nativeElement instanceof SlSwitch;
    if (isCheckbox) {
      (this.elementRef.nativeElement as SlCheckbox).checked = value;
      return;
    }
    (this.elementRef.nativeElement as T).value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    (this.elementRef.nativeElement as T).disabled = isDisabled;
  }
}
