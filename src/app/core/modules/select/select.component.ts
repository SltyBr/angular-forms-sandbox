import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, Output, QueryList, Renderer2, SimpleChanges, ViewChild, inject } from '@angular/core';
import { AnimationEvent } from "@angular/animations";
import { OptionComponent } from 'src/app/core/modules/select/option/option.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y'
import { Subject, merge, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomSelectComponent } from 'src/app/custom-select-page/custom-select/custom-select.component';

export type SelectValue<T> = T | T[] | null;

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent<T> implements OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor {
  close() {
    this.isOpen = false;
    this.onTouch();
    this.hostEl.nativeElement.focus();
    this.cdr.markForCheck();
  }
  @Input()
  label = '';

  @Input()
  displayWith: ((value: T) => (string | number)) | null = null;

  @Input()
  compareWith: ((v1: T | null, v2: T | null) => boolean) = (v1, v2) => v1 === v2;

  @Input()
  searchable = false;

  @ViewChild('input')
  searchInputEl!: ElementRef<HTMLInputElement>;

  @HostBinding('class.select-panel-open')
  isOpen = false;

  @HostBinding('attr.tabIndex')
  @Input()
  tabIndex = 0;

  @HostListener('blur')
  markAsTouched() {
    if(!this.disabled && !this.isOpen) {
      this.onTouch();
      this.cdr.markForCheck();
    }
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' && !this.isOpen) {
      this.open();
      return;
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && this.isOpen) {
      this.listKeyManager.onKeydown(e);
      this.listKeyManager
    }
    if (e.key === 'Enter' && this.isOpen && this.listKeyManager.activeItem) {
      this.handleSelection(this.listKeyManager.activeItem)
    }
  }

  @HostBinding('class.select-disabled')
  @Input()
  disabled = false;

  private optionMap = new Map<T | null, OptionComponent<T>>();
  private unsubscriber$ = new Subject<void>();
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private hostEl = inject(ElementRef);
  private listKeyManager!: ActiveDescendantKeyManager<OptionComponent<T>>;

  @HostListener('click')
  open(): void {
    if (this.disabled) return;
    this.isOpen = true;
    if(this.searchable) {
      setTimeout(() => {
        this.renderer.selectRootElement(this.searchInputEl.nativeElement).focus();
      }, 0)
    }
    this.cdr.markForCheck();
  }

  @Output()
  readonly opened = new EventEmitter();

  @Output()
  readonly closed = new EventEmitter();

  @Output()
  readonly selectionChanged = new EventEmitter<SelectValue<T>>();

  @Output()
  searchChanged = new EventEmitter<string>();


  @Input()
  set value(value: SelectValue<T>) {
    this.setupValue(value);
    this.onChange(this.value);
    this.highlightSelectedOptions();
  };

  get value() {
    if (this.selectionModel.isEmpty()) {
      return null;
    }
    if (this.selectionModel.isMultipleSelection()) {
      return this.selectionModel.selected;
    }
    return this.selectionModel.selected[0];
  }

  protected get displayValue() {
    if (this.displayWith && this.value) {
      if (Array.isArray(this.value)) {
        return this.value.map(this.displayWith).join(', ');
      }
      return this.displayWith(this.value);
    }
    return this.value;
  }

  @ContentChildren(OptionComponent, { descendants: true })
  options!: QueryList<OptionComponent<T>>;

  private selectionModel = new SelectionModel<T>(coerceBooleanProperty(this.multiple));

  protected onChange: (newValue: SelectValue<T>) => void = () => {};
  protected onTouch: () => void = () => {};

  constructor(@Attribute('multiple') private multiple: string) {}

  writeValue(value: SelectValue<T>): void {
    this.setupValue(value);
    this.highlightSelectedOptions();
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

  public ngOnChanges(changes: SimpleChanges) {
    if(changes['compareWith']) {
      this.selectionModel.compareWith = this.compareWith;
      this.highlightSelectedOptions();
    }
  }

  public ngAfterContentInit(): void {
    this.listKeyManager = new ActiveDescendantKeyManager(this.options).withWrap();

    this.listKeyManager.change.pipe(
      takeUntil(this.unsubscriber$)
    ).subscribe(itemIndex => {
      this.options.get(itemIndex)?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    })

    this.selectionModel.changed.pipe(
      takeUntil(this.unsubscriber$)
    ).subscribe(values => {
      values.removed.forEach(remove => this.optionMap.get(remove)?.deselect());
      values.added.forEach(add => this.optionMap.get(add)?.highLightAsSelected());
    })

    this.options.changes.pipe(
      startWith<QueryList<OptionComponent<T>>>(this.options),
      tap(() => this.refreshOptionsMap()),
      tap(() => queueMicrotask(() => this.highlightSelectedOptions())),
      switchMap(options => merge(...options.map(o => o.selected))),
      takeUntil(this.unsubscriber$)
    ).subscribe(selectedOption => {
      this.handleSelection(selectedOption);
    })
  }

  protected onPanelAnimationDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  protected onInputHandle(e: Event) {
    this.searchChanged.emit((e.target as HTMLInputElement).value)
  }

  private handleSelection(option: OptionComponent<T>) {
    if (this.disabled) return;
    if(option.value) {
      this.selectionModel.toggle(option.value);
      this.selectionChanged.emit(this.value);
      this.onChange(this.value);
    }
    if (this.selectionModel.isMultipleSelection()) return;
    this.close();
  }

  private highlightSelectedOptions() {
    const valuesWithUpdatedReferences = this.selectionModel.selected.map(value => {
      const corespondingOption = this.findOptionsByValue(value);
      return corespondingOption ? corespondingOption.value! : value
    });
    this.selectionModel.clear();
    this.selectionModel.select(...valuesWithUpdatedReferences);
  }

  private setupValue(value: SelectValue<T>) {
    this.selectionModel.clear();
    if (value) {
      if (Array.isArray(value)) {
        this.selectionModel.select(...value);
      } else {
        this.selectionModel.select(value);
      }
    }
  }

  private findOptionsByValue(value: T | null) {
    if (this.optionMap.has(value)) {
      return this.optionMap.get(value);
    }
    return this.options && this.options.find(o => this.compareWith(value, o.value));
  }

  refreshOptionsMap() {
    if(this.disabled) return;
    this.optionMap.clear();
    this.options.forEach(option => {
      this.optionMap.set(option.value, option);
    })
  }

  clearSelection(e?: Event) {
    e?.stopPropagation();
    this.selectionModel.clear();
    this.selectionChanged.emit(this.value);
    this.onChange(this.value);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
}
}
