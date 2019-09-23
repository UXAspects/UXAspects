import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ScrollModule } from '../../directives/scroll/index';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadKeyService } from './typeahead-key.service';
import { TypeaheadComponent } from './typeahead.component';

@NgModule({
    imports: [
        CommonModule,
        InfiniteScrollModule,
        ScrollModule
    ],
    exports: [TypeaheadComponent],
    declarations: [TypeaheadComponent, TypeaheadHighlightDirective],
    providers: [TypeaheadKeyService],
})
export class TypeaheadModule { }
