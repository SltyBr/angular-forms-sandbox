import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective } from '@angular/forms';
import {
  SlInput,
  SlRange,
  SlSwitch,
  SlTextarea,
  SlSelect,
  SlColorPicker,
} from '@shoelace-style/shoelace';

type SlControls = SlInput | SlRange | SlSwitch | SlTextarea | SlSelect | SlColorPicker;

@Directive()
export abstract class BaseShoelaceCva implements ControlValueAccessor, OnInit {
  abstract elRef: ElementRef<SlControls>;
  public parent = inject(FormGroupDirective);

  public valueType(event: Event): string | string[] | number {
    return (event.target as SlControls).value;
  }

  ngOnInit(): void {
    console.log(this.parent.form.value);
  }

  public onChange!: (newValue: string | number | boolean | string[]) => void;
  public onTouch!: () => void;

  writeValue(obj: any): void {
    this.elRef.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.elRef.nativeElement.disabled = isDisabled;
  }

  onBlur(event: Event): void {
    this.onTouch();
  }
}
