import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { RouterLinkDirective } from '../../directives/router-link/index';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
    imports: [AccessibilityModule, CommonModule, RouterLinkDirective],
    exports: [BreadcrumbsComponent],
    declarations: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
