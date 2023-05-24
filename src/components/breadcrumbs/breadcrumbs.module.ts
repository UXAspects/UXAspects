import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
    imports: [AccessibilityModule, CommonModule],
    exports: [BreadcrumbsComponent],
    declarations: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
