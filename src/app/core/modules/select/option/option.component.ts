import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> {
  private cdr = inject(ChangeDetectorRef);
  @Input() value: T | null = null;
  @Output()
  selected = new EventEmitter<OptionComponent<T>>();

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Input()
  disabledReason = '';

  @HostListener('click')
  protected select() {
    if (this.disabled) return;
    this.highLightAsSelected();
    this.selected.emit(this);
  }

  @HostBinding('class.selected')
  protected isSelected = false;

  deselect() {
    this.isSelected = false;
    this.cdr.markForCheck();
  }

  highLightAsSelected(): void {
    this.isSelected = true;
    this.cdr.markForCheck();
  }

}
