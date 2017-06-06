import { ScrollIntoViewIfModule } from '../../directives/scroll-into-view-if/index';
import { TypeaheadComponent } from './typeahead.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        ScrollIntoViewIfModule
    ],
    exports: [TypeaheadComponent],
    declarations: [TypeaheadComponent],
    providers: [],
})
export class TypeaheadModule { }
