import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    hideButton: boolean = false;
    badgeContent: string | number = 18;
    badgeMaxValue: number = null;
    badgeSize: BadgeSize = 'medium';
    badgeOverlap: boolean = true;
    badgeHidden: boolean = false;
    badgeHorizontalPosition: BadgeHorizontalPosition = 'after';
    badgeVerticalPosition: BadgeVerticalPosition = 'above';
    selectedColor: string  = 'critical';
    selectedBorderColor: string = null;
}
