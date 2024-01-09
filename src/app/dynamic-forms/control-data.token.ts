import { InjectionToken } from '@angular/core';
import { DynamicControl } from 'src/app/dynamic-forms/dynamic-forms-page/dynamic-forms.model';

export interface ControlData {
    controlKey: string;
    config: DynamicControl
}

export const CONTROL_DATA = new InjectionToken<ControlData>('Control data');