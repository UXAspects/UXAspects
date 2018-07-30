import { NgModule } from '@angular/core';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListComponent } from './select-list.component';

@NgModule({
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
