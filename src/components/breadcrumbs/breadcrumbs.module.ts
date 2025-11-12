import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { BreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  imports: [AccessibilityModule, CommonModule, RouterModule, BreadcrumbsComponent],
  exports: [BreadcrumbsComponent],
})
export class BreadcrumbsModule {}
