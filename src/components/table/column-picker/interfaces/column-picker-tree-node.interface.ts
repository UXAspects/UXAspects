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

import { ColumnPickerGroupItem } from '../interfaces/column-picker-group-item.interface';

/** Represents a tree node item. Normalises data for both groups and columns into one format */
export interface ColumnPickerTreeNode {
  /** The name of the column or group. */
  name: string;
  /** The original ColumnPickerGroupItem or string */
  column: ColumnPickerGroupItem | string;
  /**  The level this node exists in the tree hierarchy (top level nodes are 0, grouped nodes are 1). */
  level?: number;
  /**  The names of the columns that are children of this node (if this node is a group). */
  children?: string[];
  /**  A flag to identify group nodes. */
  expandable?: boolean;
  /**  A flag to track the current state of a group node (if this node is a group). */
  isExpanded?: boolean;
}
