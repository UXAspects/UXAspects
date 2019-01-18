import { Component } from '@angular/core';

@Component({
    selector: 'uxt-focus-indicator',
    templateUrl: 'focus-indicator.testpage.component.html',
    styleUrls: ['focus-indicator.testpage.component.less']
})
export class FocusIndicatorTestPageComponent {
    mouseFocusIndicator: boolean = false;
    keyboardFocusIndicator: boolean = false;
    programmaticFocusIndicator: boolean = false;
}