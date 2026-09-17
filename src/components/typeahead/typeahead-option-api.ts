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
 * The API available to option templates.
 */
export interface TypeaheadOptionApi<T = unknown> {
  /**
   * Returns the unique key value of the given option.
   */
  getKey(option: T): string;
  /**
   * Returns the display value of the given option.
   */
  getDisplay(option: T): string;
  /**
   * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value. Override the ux-filter-match class in CSS to modify the default appearance.
   */
  getDisplayHtml(option: T): string;
  /**
   * Returns the disabled state of a given option.
   */
  getDisabled(option: T): boolean;
}
