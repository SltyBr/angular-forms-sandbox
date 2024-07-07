import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from 'src/app/shoelace-cvas/components/color-picker/color-picker.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeWithInputComponent } from 'src/app/shoelace-cvas/components/range-with-input/range-with-input.component';
import { SelectWithInputComponent } from 'src/app/shoelace-cvas/components/select-with-input/select-with-input.component';
import { NativeColorPickerComponent } from 'src/app/shoelace-cvas/components/native-color-picker/native-color-picker.component';
import { TestStateService } from 'src/app/shoelace-cvas/shoelace-cvas-page/test-state.service';
import { tap } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

export function valueOf<T = string>(event: Event): T {
  return (event as any).target.value;
}


export const fonts = [
  'Arial-Black',
  'Arial',
  'Comic-Sans-MS',
  'Courier-New',
  'Georgia',
  'Helvetica-Neue',
  'Impact',
  'Inter', //шрифт системы
  'Times-New-Roman',
  'Trebuchet-MS',
  'Verdana',
]

export enum FontFamily {
  ArialBlack = 1,
  Arial,
  ComicSansMS,
  CourierNew,
  Georgia,
  HelveticaNeue,
  Impact,
  Inter,
  TimesNewRoman,
  TrebuchetMS,
  Verdana,
}

export const fontFamilyValue: Record<FontFamily, string> = {
  [FontFamily.ArialBlack]:
      'Arial Black, "Helvetica CY", "Nimbus Sans L", sans-serif',
  [FontFamily.Arial]: 'Arial, "Helvetica CY", "Nimbus Sans L", sans-serif',
  [FontFamily.ComicSansMS]: 'Comic Sans MS, "Monaco CY", sans-serif',
  [FontFamily.CourierNew]: 'Courier New, "Nimbus Mono L", monospace',
  [FontFamily.Georgia]: 'Georgia, "Century Schoolbook L", serif',
  [FontFamily.HelveticaNeue]:
      '"Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif',

  [FontFamily.Impact]: 'Impact, "Charcoal CY", sans-serif',
  [FontFamily.Inter]: 'Inter', //шрифт системы
  [FontFamily.TimesNewRoman]:
      'Times New Roman, "Times CY", "Nimbus Roman No9 L", serif',
  [FontFamily.TrebuchetMS]: 'Trebuchet MS, "Helvetica CY", sans-serif',
  [FontFamily.Verdana]: 'Verdana, "Geneva CY", "DejaVu Sans", sans-serif',
};

export const fontControlValue = new Map<string, number>([
  ['Arial Black', FontFamily.ArialBlack],
  ['Arial', FontFamily.Arial],
  ['Comic Sans MS', FontFamily.ComicSansMS],
  ['Courier New', FontFamily.CourierNew],
  ['Georgia', FontFamily.Georgia],
  ['Helvetica Neue', FontFamily.HelveticaNeue],
  ['Impact', FontFamily.Impact],
  ['Inter', FontFamily.Inter], //шрифт системы
  ['Times New Roman', FontFamily.TimesNewRoman],
  ['Trebuchet MS', FontFamily.TrebuchetMS],
  ['Verdana', FontFamily.Verdana],
]);

@Component({
  selector: 'app-shoelace-cvas-page',
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerComponent,
    ReactiveFormsModule,
    RangeWithInputComponent,
    SelectWithInputComponent,
    NativeColorPickerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './shoelace-cvas-page.component.html',
  styleUrls: ['./shoelace-cvas-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoelaceCvasPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private renderer = inject(Renderer2);
  private el = inject(ElementRef).nativeElement;
  public formGroup = this.fb.group({});
  private testStateService = inject(TestStateService);
  public ids$ = this.testStateService.ids$;
  value = 'hello';
  public map = new Map([
    ['hello', {
      label: 'qwe',
      value: 123
    }],
    ['world', {
      label: 'test',
      value: 'foot'
    }],
    ['icons', {
      label: 'test',
      value: 345
    }]
  ])

  select = fontControlValue;

  ngOnInit(): void {
    this.renderer.setProperty(this.el, 'style', "--test-style")
  }

  onClick() {
    const set = new Set([1,2,3])
    this.testStateService.changeIds(set)
  }

  public selectForm = this.fb.group({
    select: 'Arial Black, "Helvetica CY", "Nimbus Sans L", sans-serif'
  });

  onSelectChange(event: Event): void {
    const value = Number(valueOf(event)) as FontFamily;
    console.log(value)
    const controlValue = fontFamilyValue[value];
    if (controlValue) {
      this.selectForm.controls.select.setValue(controlValue);
      this.selectForm.controls.select.markAsDirty();
    }
  }

  onSelectBlur(): void {
    this.selectForm.controls.select.markAsTouched();
  }

  setSelectControlValue(): void {
    const value = Object.entries(fontFamilyValue).find(([, value]) => this.selectForm.controls.select.value === value);

    if (value && value[0]) {
      const selectValue = value[0];
    }
  }
}
