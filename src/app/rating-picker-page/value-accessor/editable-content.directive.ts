import { Directive, ElementRef, HostListener, Renderer2, SecurityContext, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_TEMPLATE = `
  <h4 data-placeholder="Title..."></h4>
  <p data-placeholder="Describe Your Experience"></p>
`

@Directive({
  selector: '[formControlName][contenteditable],[formControl][contenteditable],[ngModel][contenteditable]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableContentDirective,
      multi: true
    }
  ]
})
export class EditableContentDirective implements ControlValueAccessor {

  onChange!: (newValue: string) => void;
  onTouch!: () => void;

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    this.onChange((e.target as HTMLElement).innerHTML);
  }

  @HostListener('blur')
  onBlur() {
    this.onTouch();
  }

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  writeValue(obj: any): void {
    console.log('Method writeValue has been implemented', obj);
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.sanitizer.sanitize(SecurityContext.HTML, obj) || DEFAULT_TEMPLATE
    )
  }
  registerOnChange(fn: any): void {
    console.log('Method registerOnChange has been implemented', fn);
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('Method registerOnTouched has been implemented', fn);
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('Method setDisabledState has been implemented', isDisabled);
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'contentEditable',
      !isDisabled
    )
  }

}
