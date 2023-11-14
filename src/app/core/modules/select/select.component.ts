import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { AnimationEvent } from "@angular/animations";
import { OptionComponent } from 'src/app/core/modules/select/option/option.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Subject, merge, startWith, switchMap, takeUntil, tap } from 'rxjs';

export type SelectValue<T> = T | null;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
      transition(':leave', [animate('420ms cubic-bezier(0.88, -0.7, 0.86, 0.85)')]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent<T> implements AfterContentInit, OnDestroy {
  close() {
    this.isOpen = false;
  }
  @Input()
  label = '';

  @Input()
  displayWith: ((value: T) => (string | number)) | null = null;

  isOpen = false;

  private notifier$ = new Subject<void>();

  protected get displayValue() {
    if (this.displayWith && this.value) {
      return this.displayWith(this.value);
    }
    return this.value;
  }

  @HostListener('click')
  onClick(): void {
    this.isOpen = true
  }

  @Output()
  readonly opened = new EventEmitter();
  @Output()
  readonly closed = new EventEmitter();
  @Output()
  readonly selectionChanged = new EventEmitter<SelectValue<T>>();


  @Input()
  set value(value: SelectValue<T>) {
    this.selectionModel.clear();
    if (value) {
      this.selectionModel.select(value);
    }
  };
  get value() {
    return this.selectionModel.selected[0] || null;
  }

  @ContentChildren(OptionComponent, { descendants: true })
  options!: QueryList<OptionComponent<T>>;

  private selectionModel = new SelectionModel<T>();

  public ngAfterContentInit(): void {
    this.selectionModel.changed.pipe(
      takeUntil(this.notifier$)
    ).subscribe(values => {
      values.removed.forEach(remove => this.findOptionsByValue(remove)?.deselect());
      values.added.forEach(add => this.findOptionsByValue(add)?.highLightAsSelected());
    })

    this.options.changes.pipe(
      startWith<QueryList<OptionComponent<T>>>(this.options),
      tap(() => queueMicrotask(() => this.highlightSelectedOptions(this.value))),
      switchMap(options => merge(...options.map(o => o.selected))),
      takeUntil(this.notifier$)
    ).subscribe(selectedOption => {
      this.handleSelection(selectedOption);
    })
  }

  onPanelAnimationDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  private handleSelection(option: OptionComponent<T>) {
    if(option.value) {
      this.selectionModel.toggle(option.value);
      this.selectionChanged.emit(this.value);
    }
    this.close();
  }

  private highlightSelectedOptions(value: SelectValue<T>) {
    this.findOptionsByValue(value)?.highLightAsSelected();
  }

  private findOptionsByValue(value: SelectValue<T>) {
    return this.options && this.options.find(o => o.value === value);
  }

  ngOnDestroy(): void {
      this.notifier$.next();
      this.notifier$.complete();
  }
}
