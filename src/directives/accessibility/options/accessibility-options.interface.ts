export interface AccessibilityOptions {
    /** Indicate whether or not mouse events should cause the focus indicator to appear */
    mouseFocusIndicator?: boolean;

    /** Indicate whether or not touch events should cause the focus indicator to appear */
    touchFocusIndicator?: boolean;

    /** Indicate whether or not keyboard events should cause the focus indicator to appear */
    keyboardFocusIndicator?: boolean;

    /** Indicate whether or not programmatic events should cause the focus indicator to appear */
    programmaticFocusIndicator?: boolean;
}