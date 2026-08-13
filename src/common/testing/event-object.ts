///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

/**
 * Karma Testing Utilities
 * The Angular CDK includes these in newer versions, but until we upgrade we must use our own
 */

export function createMouseEvent(type: string, x = 0, y = 0, button = 0): MouseEvent {
  const event = document.createEvent('MouseEvent');
  event.initMouseEvent(
    type,
    true,
    false,
    window,
    0,
    x,
    y,
    x,
    y,
    false,
    false,
    false,
    false,
    button,
    null
  );
  Object.defineProperty(event, 'buttons', { get: () => 1 });
  return event;
}

export function createKeyboardEvent(
  type: string,
  keyCode: number,
  target?: Element,
  key?: string
): KeyboardEvent {
  const event = document.createEvent('KeyboardEvent') as any;
  const originalPreventDefault = event.preventDefault;

  if (event.initKeyEvent) {
    event.initKeyEvent(type, true, true, window, 0, 0, 0, 0, 0, keyCode);
  } else {
    event.initKeyboardEvent(type, true, true, window, 0, key, 0, '', false);
  }

  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target },
  });

  event.preventDefault = function (...args) {
    Object.defineProperty(event, 'defaultPrevented', { get: () => true });
    return originalPreventDefault.apply(this, args);
  };

  return event;
}
