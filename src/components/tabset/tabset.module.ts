import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { RouterLinkDirective } from '../../directives/router-link/router-link.directive';
import { TabHeadingDirective } from './tab/tab-heading.directive';
import { TabComponent } from './tab/tab.component';
import { TabsetComponent } from './tabset.component';

@NgModule({
    imports: [AccessibilityModule, CommonModule, RouterLinkDirective],
    exports: [TabsetComponent, TabComponent, TabHeadingDirective],
    declarations: [TabsetComponent, TabComponent, TabHeadingDirective],
})
export class TabsetModule {}
