import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list.component';
// import { NotificationServiceModule } from '../../services/notification/index';

@NgModule({
    imports: [
        CommonModule,
        // NotificationServiceModule
    ],
    exports: [
        NotificationListComponent
    ],
    declarations: [
        NotificationListComponent
    ]
})
export class NotificationListModule { }
