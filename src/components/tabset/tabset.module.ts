import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsetComponent } from './tabset.component';
import { TabsetService } from './tabset.service';
import { TabComponent } from './tab/tab.component';
import { TabHeadingDirective } from './tab/tab-heading.directive';
import { FocusIfModule } from '../../directives/focus-if/focus-if.module';

@NgModule({
    imports: [
        CommonModule,
        FocusIfModule
    ],
    exports: [TabsetComponent, TabComponent, TabHeadingDirective],
    declarations: [TabsetComponent, TabComponent, TabHeadingDirective],
})
export class TabsetModule { }