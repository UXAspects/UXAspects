import { Component } from '@angular/core';

@Component({
    selector: 'uxd-popover-fallback',
    templateUrl: './popover-fallback.testpage.component.html',
    styleUrls: ['./popover-fallback.testpage.component.less'],
    standalone: false
})
export class PopoverFallbackTestPageComponent {
    isOpen: boolean = true;
    hasArrow: boolean = false;
}
