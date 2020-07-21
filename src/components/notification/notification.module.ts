import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ColorService, ColorServiceModule } from '../../services/color/index';
import { NotificationListComponent } from './notification-list.component';
import { NotificationService } from './notification.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function NOTIFICATION_SERVICE_PROVIDER_FACTORY(parentService: NotificationService, colorService: ColorService) {
    return parentService || new NotificationService(colorService);
}

export const NOTIFICATION_SERVICE_PROVIDER = {
    provide: NotificationService,
    deps: [[new Optional(), new SkipSelf(), NotificationService], ColorService],
    useFactory: NOTIFICATION_SERVICE_PROVIDER_FACTORY
};

@NgModule({
    imports: [
        CommonModule,
        ColorServiceModule
    ],
    exports: [
        NotificationListComponent
    ],
    declarations: [
        NotificationListComponent
    ],
    providers: [
        NOTIFICATION_SERVICE_PROVIDER
    ]
})
export class NotificationModule { }
