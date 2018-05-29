import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsetComponent } from './tabset.component';
import { TabsetService } from './tabset.service';
import { TabComponent } from './tab/tab.component';
import { TabHeadingDirective } from './tab/tab-heading.directive';
import { TabFocusDirective } from './tab/tab-focus.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [TabsetComponent, TabComponent, TabHeadingDirective],
    declarations: [TabsetComponent, TabComponent, TabHeadingDirective, TabFocusDirective],
})
export class TabsetModule { }