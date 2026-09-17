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

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  inject,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { ResizeService } from '../resize/index';
import { LayoutSwitcherItemDirective } from './layout-switcher-item.directive';

@Directive({ selector: '[uxLayoutSwitcher]' })
export class LayoutSwitcherDirective implements AfterContentInit, OnChanges {
  readonly resizeService = inject(ResizeService);

  private readonly _elementRef = inject(ElementRef);

  private readonly _viewContainerRef = inject(ViewContainerRef);

  @Input() group: string;
  @ContentChildren(LayoutSwitcherItemDirective)
  private readonly _layouts: QueryList<LayoutSwitcherItemDirective>;

  private _width: number;
  private _activeLayout: LayoutSwitcherItemDirective;

  constructor() {
    // watch for changes to the container size
    this.resizeService.addResizeListener(this._elementRef.nativeElement).subscribe(event => {
      this._width = event.width;

      // render the appropriate layout
      this.updateActiveLayout();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if the active group has changed then render the appropriate layout
    if (changes.group.currentValue !== changes.group.previousValue) {
      this.updateActiveLayout();
    }
  }

  getActiveLayout(): LayoutSwitcherItemDirective | null {
    // if there are currently no layouts then do nothing
    if (!this._layouts) {
      return null;
    }

    // otherwise find layouts that match the active group and that meet the constraints
    return this._layouts
      .filter(layout => this.group === layout.getConfig().group)
      .find(layout => {
        const minWidth = layout.getConfig().minWidth || 0;
        const maxWidth = layout.getConfig().maxWidth || Infinity;

        return this._width >= minWidth && this._width < maxWidth;
      });
  }

  updateActiveLayout(): void {
    // get the layout that should be shown
    const layout = this.getActiveLayout();

    // check if we are currently showing the layout
    if (this._activeLayout === layout) {
      return;
    }

    // remove the current layout
    if (this._activeLayout) {
      this._activeLayout.deactivate();
    }

    // store the new active layout
    this._activeLayout = layout;

    // if there is an active layout then activate
    if (this._activeLayout) {
      this._activeLayout.activate();
    }
  }

  ngAfterContentInit(): void {
    // store the initial current element width
    this._width = this._elementRef.nativeElement.offsetWidth;

    // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
    requestAnimationFrame(this.updateActiveLayout.bind(this));
  }
}
