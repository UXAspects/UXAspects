import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusIfModule } from '../../directives/focus-if/index';
import { ResizeModule } from '../../directives/resize/index';
import { HierarchyBarComponent } from './hierarchy-bar.component';
import { PopoverModule } from '../popover/index';

@NgModule({
    imports: [
        CommonModule,
        ResizeModule,
        FocusIfModule,
        PopoverModule
    ],
    exports: [HierarchyBarComponent],
    declarations: [HierarchyBarComponent],
})
export class HierarchyBarModule { }
