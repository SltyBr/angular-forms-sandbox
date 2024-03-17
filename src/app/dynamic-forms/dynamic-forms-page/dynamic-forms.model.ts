import { ValidatorFn, Validators } from '@angular/forms';

export type controlTypes = 'input' | 'select' | 'checkbox'

export interface DynamicOptions {
    label: string,
    value: string
}
type CustomValidators = { banWords: ValidatorFn }
export type ValidatorKeys = keyof Omit<typeof Validators & CustomValidators, 'prototype' | 'compose' | 'composeAsync'>;

export interface DynamicControl<T = string> {
    controlType: controlTypes;
    type?: string,
    label: string,
    value: T | null,
    options?: DynamicOptions[],
    validators: {
        [key in ValidatorKeys]?: unknown;
    }
}

export interface DynamicFormConfig {
    description: string;
    controls: {
        [key: string]: DynamicControl
    }
}