import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    content: string = '1475';
    maxValue: number = 999;
    overlap: boolean = true;
    verticalPosition: BadgeVerticalPosition = 'above';
    horizontalPosition: BadgeHorizontalPosition = 'after';
    badgeHidden: boolean = false;
    size: BadgeSize = 'medium';
    badgeColor: string = 'warning';
}
