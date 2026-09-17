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

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationItem } from './navigation-item.interface';

@Injectable()
export class NavigationService implements OnDestroy {
  /** The navigation items to populate the menu with */
  items: NavigationItem[];

  /** Whether to collapse other menu items when expanding a menu item. */
  autoCollapse: boolean = true;

  /** Emit when the expanded state has changed */
  expanded$ = new Subject<void>();

  ngOnDestroy(): void {
    this.expanded$.complete();
  }

  /** Set the expanded state of an item */
  setExpanded(source: NavigationItem, expanded: boolean): void {
    if (expanded && this.autoCollapse) {
      this.collapseSiblings(source);
      this.expanded$.next();
    }
  }

  /** Collapse all siblings nodes */
  private collapseSiblings(source: NavigationItem): void {
    let siblings = this.items;

    for (const item of this.items) {
      const parent = this.getParent(source, item);
      if (parent) {
        siblings = parent.children;
        break;
      }
    }

    // collapse every sibling
    siblings.filter(item => item !== source).forEach(item => this.collapseAll(item));
  }

  /** Collapse an item and all its children */
  private collapseAll(item: NavigationItem): void {
    item.expanded = false;
    if (item.children) {
      item.children.forEach(child => this.collapseAll(child));
    }
  }

  /** Get a nodes parent if it has one */
  private getParent(target: NavigationItem, item: NavigationItem): NavigationItem | null {
    return (item.children || []).find(child => child === target) ? item : null;
  }
}
