import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HelpCenterItemDirective } from './help-center-item.directive';
import { HelpCenterService } from './help-center.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function HELP_CENTER_SERVICE_PROVIDER_FACTORY(parentService: HelpCenterService) {
    return parentService || new HelpCenterService();
}

export const HELP_CENTER_SERVICE_PROVIDER = {
    provide: HelpCenterService,
    deps: [[new Optional(), new SkipSelf(), HelpCenterService]],
    useFactory: HELP_CENTER_SERVICE_PROVIDER_FACTORY
};

@NgModule({
    exports: [
        HelpCenterItemDirective
    ],
    declarations: [
        HelpCenterItemDirective
    ],
    providers: [
        HELP_CENTER_SERVICE_PROVIDER
    ]
})
export class HelpCenterModule { }
