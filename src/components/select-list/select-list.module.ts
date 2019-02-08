import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListComponent } from './select-list.component';

@NgModule({
    imports: [
        AccessibilityModule
    ],
    declarations: [
        SelectListComponent,
        SelectListItemComponent
    ],
    exports: [
        SelectListComponent,
        SelectListItemComponent
    ],
})
export class SelectListModule { }
