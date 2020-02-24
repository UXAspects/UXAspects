import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ScrollModule } from '../../directives/scroll/index';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadKeyService } from './typeahead-key.service';
import { TypeaheadOptionsListComponent } from './typeahead-options-list.component';
import { TypeaheadComponent } from './typeahead.component';
import { ResizeModule } from '../../directives/resize/index';
import { PopoverOrientationService } from '../../services/popover-orientation/popover-orientation.service';

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
    providers: [TypeaheadKeyService, PopoverOrientationService]
})
export class TypeaheadModule {}
