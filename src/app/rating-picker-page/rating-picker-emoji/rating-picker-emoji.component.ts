import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker-emoji',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker-emoji.component.html',
  styleUrls: ['./rating-picker-emoji.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerEmojiComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerEmojiComponent implements OnChanges, ControlValueAccessor{
  onChange: (newValue: RatingOptions) => void = () => {};
  onTouch!: () => void;

  private cdr = inject(ChangeDetectorRef);

  @Input()
  disabled = false;
  @Input()
  value: RatingOptions = null;

  @Output()
  changed = new EventEmitter<RatingOptions>();

  @HostBinding('attr.tabIndex')
  tabIndex = 0;

  @HostListener('blur')
  onBlur() {
    this.onTouch();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if(simpleChanges['value']) {
      const value = simpleChanges['value'].currentValue;
      this.onChange(value);
    }
  }

  setValue(option: RatingOptions): void {
    if (this.disabled) return;
    this.value = option;
    this.changed.emit(option);
    this.onChange(option);
    this.onTouch();
  }

  writeValue(obj: RatingOptions): void {
    this.value = obj;
    this.cdr.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }
}
