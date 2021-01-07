import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ResizeModule } from '../../directives/resize/index';
import { ScrollModule } from '../../directives/scroll/index';
import { PopoverOrientationService } from '../../services/popover-orientation/popover-orientation.service';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadOptionsListComponent } from './typeahead-options-list.component';
import { TypeaheadComponent } from './typeahead.component';

@NgModule({
    imports: [
        CommonModule,
        InfiniteScrollModule,
        ResizeModule,
        ScrollModule
    ],
    exports: [TypeaheadComponent],
    declarations: [
        TypeaheadComponent,
        TypeaheadHighlightDirective,
        TypeaheadOptionsListComponent
    ],
    providers: [
        PopoverOrientationService
    ]
})
export class TypeaheadModule {}
