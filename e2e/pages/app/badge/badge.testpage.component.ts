import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '../../../../src/directives/badge/index';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.testpage.component.html',
    styleUrls: ['./badge.testpage.component.less'],
})
export class BadgeTestPageComponent {
    sizes: BadgeSize[] = [ 'small', 'medium', 'large' ];
    verticalPositions: BadgeVerticalPosition[]  = [ 'above', 'below' ];
    horizontalPositions: BadgeHorizontalPosition[] = ['after', 'before'];
}
