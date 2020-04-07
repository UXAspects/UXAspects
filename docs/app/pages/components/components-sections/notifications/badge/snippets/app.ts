import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    content: string = '1475';
    maxValue: number = 999;
    ariaDescription: string = '1475 messages found';
    overlap: boolean = true;
    verticalPosition: BadgeVerticalPosition = 'above';
    horizontalPosition: BadgeHorizontalPosition = 'after';
    hidden: false;
    size: BadgeSize = 'medium';
    badgeColor: string = 'warning';
}
