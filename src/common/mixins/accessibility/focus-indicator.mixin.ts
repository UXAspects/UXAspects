import { Constructor } from '../common/constructor';

export interface HasFocusIndicator {
    mouseFocusIndicator: boolean;
    touchFocusIndicator: boolean;
    keyboardFocusIndicator: boolean;
    programmaticFocusIndicator: boolean;
}

export const _HasFocusIndicatorInputs: string[] = [
    'mouseFocusIndicator',
    'touchFocusIndicator',
    'keyboardFocusIndicator',
    'programmaticFocusIndicator'
];

export type HasFocusIndicatorCtor = Constructor<HasFocusIndicator>;

/**
 * This mixin provides us with the all options to control the focus indicator without having to duplicate them for every component.
 * By using a mixin we also avoid any issues with multiple inheritance as TypeScript & JavaScript only allow extending one class.
 */
export function mixinFocusIndicator<T extends Constructor<{}>>(base: T): HasFocusIndicatorCtor & T {
    return class extends base {

        /** Indicate whether or not mouse events should cause the focus indicator to appear - will override any global setting */
        mouseFocusIndicator: boolean;

        /** Indicate whether or not touch events should cause the focus indicator to appear - will override any global setting */
        touchFocusIndicator: boolean;

        /** Indicate whether or not keyboard events should cause the focus indicator to appear - will override any global setting */
        keyboardFocusIndicator: boolean;

        /** Indicate whether or not programmatic events should cause the focus indicator to appear - will override any global setting */
        programmaticFocusIndicator: boolean;

        constructor(...args: any[]) {
            super(...args);
        }
    };
}