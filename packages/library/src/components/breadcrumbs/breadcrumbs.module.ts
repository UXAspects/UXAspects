import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule
    ],
    exports: [BreadcrumbsComponent],
    declarations: [BreadcrumbsComponent]
})
export class BreadcrumbsModule { }
