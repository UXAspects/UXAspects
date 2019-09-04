/**
 * A button will trigger a click event whenever the a mouse click occurs or the enter key is pressed.
 * These functions can be used to identify if a `click` event was caused by the keyboard or
 * by a mouse.
 *
 * The `event.detail` property will change based on the source of the event.
 * A mouse click will have varying values based on the browser, however
 * the enter key will always have a value of `0` so we can check against that
 */

export function isKeyboardTrigger(event: MouseEvent | KeyboardEvent): boolean {
    return event.detail === 0;
}

export function isMouseTrigger(event: MouseEvent | KeyboardEvent): boolean {
    return !isKeyboardTrigger(event);
}