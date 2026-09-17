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

/** An interface representing a grouped item */
export interface ColumnPickerGroupItem {
  /**  The name of the group that this column belongs to. */
  group?: string;
  /**  The name of the column. */
  name: string;
}

export function isColumnPickerGroupItem(
  column: string | ColumnPickerGroupItem
): column is ColumnPickerGroupItem {
  return (column as ColumnPickerGroupItem).name !== undefined;
}
