import { InjectionToken } from '@angular/core';
import { KEPPEL_COLOR_SET } from './keppel-color-set';
import { MICRO_FOCUS_COLOR_SET } from './micro-focus-color-set';

export const colorSets = {
    keppel: {
        colorValueSet: KEPPEL_COLOR_SET,
    },
    microFocus: {
        colorValueSet: MICRO_FOCUS_COLOR_SET
    }
};

export type ColorSet = {
    colorValueSet: { [key: string]: string }
};

/** Provide a default color set for an application */
export const COLOR_SET_TOKEN = new InjectionToken('COLOR_SET_TOKEN');