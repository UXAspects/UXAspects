/**
 * Karma Testing Utilities
 * The Angular CDK includes these in newer versions, but until we upgrade we must use our own
 */

export function createMouseEvent(type: string, x = 0, y = 0, button = 0): MouseEvent {
    const event = document.createEvent('MouseEvent');
    event.initMouseEvent(type, true, false, window, 0, x, y, x, y, false, false, false, false, button, null);
    Object.defineProperty(event, 'buttons', { get: () => 1 });
    return event;
}

export function createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string): KeyboardEvent {
    let event = document.createEvent('KeyboardEvent') as any;
    let originalPreventDefault = event.preventDefault;

    if (event.initKeyEvent) {
        event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
    } else {
        event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
    }

    Object.defineProperties(event, {
        keyCode: { get: () => keyCode },
        key: { get: () => key },
        target: { get: () => target }
    });

    event.preventDefault = function () {
        Object.defineProperty(event, 'defaultPrevented', { get: () => true });
        return originalPreventDefault.apply(this, arguments);
    };

    return event;
}