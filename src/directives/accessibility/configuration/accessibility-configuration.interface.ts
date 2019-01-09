export interface AccessibilityConfiguration {
    /** Indicate whether or not mouse events should cause the focus indicator to appear */
    mouseFocusOutline?: boolean;

    /** Indicate whether or not touch events should cause the focus indicator to appear */
    touchFocusOutline?: boolean;

    /** Indicate whether or not keyboard events should cause the focus indicator to appear */
    keyboardFocusOutline?: boolean;

    /** Indicate whether or not programmatic events should cause the focus indicator to appear */
    programmaticFocusOutline?: boolean;
}