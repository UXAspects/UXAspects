import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FocusIndicatorDirective } from '../../../directives/accessibility/focus-indicator/focus-indicator.directive';
import { TabbableListItemDirective } from '../../../directives/accessibility/tabbable-list/tabbable-list-item.directive';
import { TabbableListDirective } from '../../../directives/accessibility/tabbable-list/tabbable-list.directive';
import { FocusIfDirective } from '../../../directives/focus-if/focus-if.directive';
import { HierarchyBarPopoverItemComponent } from '../hierarchy-bar-popover-item/hierarchy-bar-popover-item.component';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
  selector: 'ux-hierarchy-bar-popover',
  templateUrl: './hierarchy-bar-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    TabbableListDirective,
    HierarchyBarPopoverItemComponent,
    FocusIndicatorDirective,
    TabbableListItemDirective,
    FocusIfDirective,
  ],
})
export class HierarchyBarPopoverComponent {
  readonly hierarchyBar = inject(HierarchyBarService);

  /** Define the nodes to display */
  @Input() nodes: HierarchyBarNode[] = [];

  /** Define the loading state */
  @Input() loading: boolean;

  /** Defines if dropdown items should have separators between them to distinguish if nodes are siblings or ancestors */
  @Input() separator: boolean = false;

  /** Emit a select event when an item ahs been clicked or enter key pressed */
  @Output() selected = new EventEmitter<HierarchyBarNode>();
}
