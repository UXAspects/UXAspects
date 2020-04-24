import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    hideButton: boolean = true;
    badgeContent: string = '999';
    badgeMaxValue: number = 99;
    badgeSize: BadgeSize = 'small';
    badgeOverlap: boolean = false;
    badgeHidden: boolean = false;
    badgeHorizontalPosition: BadgeHorizontalPosition = 'after';
    badgeVerticalPosition: BadgeVerticalPosition = 'above';
    selectedColor: string  = 'warning';
    selectedBorderColor: string = 'critical';
}
