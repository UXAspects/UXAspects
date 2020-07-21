import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { InfiniteScrollModule } from '../../directives/infinite-scroll/index';
import { ResizeModule } from '../../directives/resize/index';
import { ScrollModule } from '../../directives/scroll/index';
import { PopoverOrientationService } from '../../services/popover-orientation/popover-orientation.service';
import { TypeaheadHighlightDirective } from './typeahead-highlight.directive';
import { TypeaheadOptionsListComponent } from './typeahead-options-list.component';
import { TypeaheadComponent } from './typeahead.component';
import { TypeaheadKeyService } from './typeahead-key.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function TYPEAHEAD_KEY_SERVICE_PROVIDER_FACTORY(parentService: TypeaheadKeyService) {
    return parentService || new TypeaheadKeyService();
}

export const TYPEAHEAD_KEY_SERVICE_PROVIDER = {
    provide: TypeaheadKeyService,
    deps: [[new Optional(), new SkipSelf(), TypeaheadKeyService]],
    useFactory: TYPEAHEAD_KEY_SERVICE_PROVIDER_FACTORY
};


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
        PopoverOrientationService,
        TYPEAHEAD_KEY_SERVICE_PROVIDER
    ]
})
export class TypeaheadModule {}
