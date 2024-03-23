import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagePipe } from 'src/app/core/error-message.pipe';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule, ErrorMessagePipe],
  template: `
    <div *ngFor="let error of errors | keyvalue; trackBy: trackByFn" class="input-error">
      {{ error.key | errorMessage : error.value }}
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | null = null;

  trackByFn(index: number, item: KeyValue<string, any>) {
    return item.key
  }
}
