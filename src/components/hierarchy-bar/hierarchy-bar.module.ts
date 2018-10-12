import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { ResizeModule } from '../../directives/resize/index';
import { PopoverModule } from '../popover/index';
import { HierarchyBarComponent } from './hierarchy-bar.component';

@NgModule({
    imports: [
        CommonModule,
        ResizeModule,
        FocusIfModule,
        PopoverModule,
        AccessibilityModule
    ],
    exports: [HierarchyBarComponent],
    declarations: [HierarchyBarComponent],
})
export class HierarchyBarModule { }
