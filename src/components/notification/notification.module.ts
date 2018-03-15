import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list.component';
import { NotificationService } from './notification.service';
import { ColorServiceModule } from '../../services/color/index';

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
        NotificationService
    ]
})
export class NotificationModule { }
