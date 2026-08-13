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
 * Determine the type of icon based upon the identifier.
 *
 * We support the following iconset:
 *
 * - `ux-icon` - UX Icon Set
 * - `component` - Component icon not tied to a specific set
 *
 * @param identifier - The name of the icon
 */
export function getIconType(identifier: string | null): IconType {
  if (identifier && identifier.trim().indexOf('ux-') === 0) {
    return IconType.UxIcon;
  }

  return IconType.Component;
}

export enum IconType {
  UxIcon = 'ux-icon',
  Component = 'component',
}
