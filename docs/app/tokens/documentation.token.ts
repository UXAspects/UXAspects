import { InjectionToken } from '@angular/core';

export const DOCUMENTATION_TOKEN = new InjectionToken('DOCUMENTATION_TOKEN');

export enum DocumentationType {
    Keppel,
    MicroFocus
}