import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list.component';
import { NotificationService } from './notification.service';

@NgModule({
    imports: [
        CommonModule
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
