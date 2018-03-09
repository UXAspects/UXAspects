import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ScrollIntoViewIfModule } from '../../directives/scroll-into-view-if/index';
import { TypeaheadKeyService } from './typeahead-key.service';
import { TypeaheadComponent } from './typeahead.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        InfiniteScrollModule,
        ScrollIntoViewIfModule
    ],
    exports: [TypeaheadComponent],
    declarations: [TypeaheadComponent],
    providers: [TypeaheadKeyService],
})
export class TypeaheadModule { }
