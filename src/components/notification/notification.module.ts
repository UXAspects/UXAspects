import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorServiceModule } from '../../services/color/index';
import { NotificationListComponent } from './notification-list.component';

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
    ]
})
export class NotificationModule { }
