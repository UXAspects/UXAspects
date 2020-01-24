import { createKeyboardEvent, createMouseEvent } from './event-object';

/**
 * Karma Testing Utilities
 * The Angular CDK includes these in newer versions, but until we upgrade we must use our own
 */

export function dispatchEvent(node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
}

export function dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element, key?: string): KeyboardEvent {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, target, key)) as KeyboardEvent;
}

export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    return dispatchEvent(node, event) as MouseEvent;
}