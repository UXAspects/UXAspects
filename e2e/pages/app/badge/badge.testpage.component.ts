import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.testpage.component.html',
    styleUrls: ['./badge.testpage.component.less'],
})
export class BadgeTestPageComponent {
    sizes: BadgeSize[] = ['small', 'medium', 'large'];
    verticalPositions: BadgeVerticalPosition[] = ['above', 'below'];
    horizontalPositions: BadgeHorizontalPosition[] = ['after', 'before'];
    colorCombinations: Map<string, string> = new Map<string, string>([
        ['warning', 'critical'],
        ['grey5', 'grey1'],
        ['chart1', 'chart2'],
        ['#CCC', 'rgb(190, 4, 20)'],
        ['#059', 'rgb(0, 25, 50)'],
    ]);
}
