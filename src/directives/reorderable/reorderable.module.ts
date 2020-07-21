import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReorderableHandleDirective } from './reorderable-handle.directive';
import { ReorderableModelDirective } from './reorderable-model.directive';
import { ReorderableDirective } from './reorderable.directive';
import { ReorderableService } from './reorderable.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function REORDERABLE_SERVICE_PROVIDER_FACTORY(parentService: ReorderableService) {
    return parentService || new ReorderableService();
}

export const REORDERABLE_SERVICE_PROVIDER = {
    provide: ReorderableService,
    deps: [[new Optional(), new SkipSelf(), ReorderableService]],
    useFactory: REORDERABLE_SERVICE_PROVIDER_FACTORY
};


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ReorderableDirective,
        ReorderableHandleDirective,
        ReorderableModelDirective
    ],
    exports: [
        ReorderableDirective,
        ReorderableHandleDirective,
        ReorderableModelDirective
    ],
    providers: [
        REORDERABLE_SERVICE_PROVIDER
    ]
})
export class ReorderableModule { }
