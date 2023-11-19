import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> implements Highlightable {
  private cdr = inject(ChangeDetectorRef);
  private hostEl = inject(ElementRef);
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

  @HostBinding('class.active')
  protected isActive = false;

  setActiveStyles(): void {
    this.isActive = true;
    this.cdr.markForCheck();
  }

  setInactiveStyles(): void {
    this.isActive = false;
    this.cdr.markForCheck();
  }

  deselect() {
    this.isSelected = false;
    this.cdr.markForCheck();
  }

  highLightAsSelected(): void {
    this.isSelected = true;
    this.cdr.markForCheck();
  }

  scrollIntoView(options?: ScrollIntoViewOptions) {
    this.hostEl.nativeElement.scrollIntoView(options);
  }

}
