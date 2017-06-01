import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TypeaheadComponent } from './typeahead.component';

@NgModule({
    imports: [CommonModule],
    exports: [TypeaheadComponent],
    declarations: [TypeaheadComponent],
    providers: [],
})
export class TypeaheadModule { }
