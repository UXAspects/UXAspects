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
