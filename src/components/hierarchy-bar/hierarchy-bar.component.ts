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

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayTrigger } from '../tooltip/index';
import { HierarchyBarCollapsedComponent } from './hierarchy-bar-collapsed/hierarchy-bar-collapsed.component';
import { HierarchyBarNodeIconDirective } from './hierarchy-bar-node/hierarchy-bar-node-icon.directive';
import { HierarchyBarStandardComponent } from './hierarchy-bar-standard/hierarchy-bar-standard.component';
import { HierarchyBarService } from './hierarchy-bar.service';
import { HierarchyBarIconContext } from './interfaces/hierarchy-bar-node-icon-context.interface';
import { HierarchyBarNode } from './interfaces/hierarchy-bar-node.interface';
import { HierarchyBarMode, IHierachyBarComponent } from './interfaces/hierarchy-bar.interface';

@Component({
  selector: 'ux-hierarchy-bar',
  templateUrl: './hierarchy-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [HierarchyBarService],
  imports: [HierarchyBarStandardComponent, NgTemplateOutlet, HierarchyBarCollapsedComponent],
})
export class HierarchyBarComponent implements IHierachyBarComponent, OnDestroy {
  private readonly _hierarchyBar = inject(HierarchyBarService);

  /** Define which presentational mode we should display */
  @Input() mode: HierarchyBarMode = 'standard';

  /** hierarchy bar as being readonly - default false */
  @Input() readonly: boolean = false;

  /** Define the root node of the hierarchy bar */
  @Input() set root(node: HierarchyBarNode) {
    this._hierarchyBar.setRootNode(node);
  }

  /** Define the selected node in the hierarchy bar */
  @Input() set selected(node: HierarchyBarNode) {
    this._hierarchyBar.selectNode(node);
  }

  /** Provide a custom loading indicator */
  @Input() set loadingIndicator(loadingIndicator: TemplateRef<void>) {
    this._hierarchyBar.loadingIndicator = loadingIndicator;
  }

  /** Provide a custom overflow template */
  @Input() set overflowTemplate(overflowTemplate: TemplateRef<void>) {
    this._hierarchyBar.overflowTemplate = overflowTemplate;
  }

  /** Define the events that show the popover when interacting with the arrows */
  @Input() set popoverShowTriggers(popoverShowTriggers: OverlayTrigger[]) {
    this._hierarchyBar.popoverShowTriggers = popoverShowTriggers;
  }

  /** Define the events that hide the popover when interacting with the arrows */
  @Input() set popoverHideTriggers(popoverHideTriggers: OverlayTrigger[]) {
    this._hierarchyBar.popoverHideTriggers = popoverHideTriggers;
  }

  /** Define the aria label for the show siblings popover button */
  @Input() set showSiblingsAriaLabel(label: string) {
    this._hierarchyBar.showSiblingsAriaLabel = label;
  }

  /** Emit when the selected node changes */
  @Output() selectedChange = new EventEmitter<HierarchyBarNode>();

  /** Allow a custom icon to be specified */
  @ContentChild(HierarchyBarNodeIconDirective, { read: TemplateRef, static: false })
  set icon(icon: TemplateRef<HierarchyBarIconContext>) {
    this._hierarchyBar.icon = icon;
  }

  /** Unsubscribe from all subscriptions when component is destroyed */
  private readonly _onDestroy = new Subject<void>();

  constructor() {
    // emit the latest selection value
    this._hierarchyBar.selection$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(selection => this.selectedChange.next(selection));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
