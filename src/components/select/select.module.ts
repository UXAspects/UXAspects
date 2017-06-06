import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SelectComponent } from './select.component';

@NgModule({
    imports: [FormsModule],
    exports: [SelectComponent],
    declarations: [SelectComponent]
})
export class SelectModule { }
