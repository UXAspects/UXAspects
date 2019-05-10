import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { ResizeModule } from '../../directives/resize/index';
import { PopoverModule } from '../popover/index';
import { HierarchyBarCollapsedComponent } from './hierarchy-bar-collapsed/hierarchy-bar-collapsed.component';
import { HierarchyBarNodeIconDirective } from './hierarchy-bar-node/hierarchy-bar-node-icon.directive';
import { HierarchyBarNodeComponent } from './hierarchy-bar-node/hierarchy-bar-node.component';
import { HierarchyBarPopoverItemComponent } from './hierarchy-bar-popover-item/hierarchy-bar-popover-item.component';
import { HierarchyBarPopoverComponent } from './hierarchy-bar-popover/hierarchy-bar-popover.component';
import { HierarchyBarStandardComponent } from './hierarchy-bar-standard/hierarchy-bar-standard.component';
import { HierarchyBarComponent } from './hierarchy-bar.component';

@NgModule({
    imports: [
        CommonModule,
        ResizeModule,
        FocusIfModule,
        PopoverModule,
        AccessibilityModule
    ],
    exports: [
        HierarchyBarComponent,
        HierarchyBarStandardComponent,
        HierarchyBarCollapsedComponent,
        HierarchyBarNodeIconDirective
    ],
    declarations: [
        HierarchyBarComponent,
        HierarchyBarStandardComponent,
        HierarchyBarCollapsedComponent,
        HierarchyBarNodeComponent,
        HierarchyBarPopoverComponent,
        HierarchyBarPopoverItemComponent,
        HierarchyBarNodeIconDirective
    ],
})
export class HierarchyBarModule { }
