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

import { createKeyboardEvent, createMouseEvent } from './event-object';

/**
 * Karma Testing Utilities
 * The Angular CDK includes these in newer versions, but until we upgrade we must use our own
 */

export function dispatchEvent(node: Node | Window, event: Event): Event {
  node.dispatchEvent(event);
  return event;
}

export function dispatchKeyboardEvent(
  node: Node,
  type: string,
  keyCode: number,
  target?: Element,
  key?: string
): KeyboardEvent {
  return dispatchEvent(node, createKeyboardEvent(type, keyCode, target, key)) as KeyboardEvent;
}

export function dispatchMouseEvent(
  node: Node,
  type: string,
  x = 0,
  y = 0,
  event = createMouseEvent(type, x, y)
): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}
