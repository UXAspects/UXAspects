import { Component } from '@angular/core';
import { anchorData, BadgeTestComponentData, buttonData } from './badge.testpage.data';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.testpage.component.html',
    styleUrls: ['./badge.testpage.component.less'],
})
export class BadgeTestPageComponent {
    anchor: BadgeTestComponentData = anchorData;
    button: BadgeTestComponentData = buttonData;
}
