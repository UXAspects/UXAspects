import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DragDirective } from './drag.directive';
import { DropDirective } from './drop.directive';
import { DragService } from './drag.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function DRAG_SERVICE_PROVIDER_FACTORY(parentService: DragService) {
    return parentService || new DragService();
}

export const DRAG_SERVICE_PROVIDER = {
    provide: DragService,
    deps: [[new Optional(), new SkipSelf(), DragService]],
    useFactory: DRAG_SERVICE_PROVIDER_FACTORY
};

@NgModule({
    exports: [DragDirective, DropDirective],
    declarations: [DragDirective, DropDirective],
    providers: [DRAG_SERVICE_PROVIDER]
})
export class DragModule {}
