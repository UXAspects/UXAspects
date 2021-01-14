import { Component } from '@angular/core';

@Component({
    selector: 'uxd-popover-fallback',
    templateUrl: './popover-fallback.testpage.component.html',
    styleUrls: ['./popover-fallback.testpage.component.less']
})
export class PopoverFallbackTestPageComponent {
    placement: string = 'top';
    isOpen: boolean = true;
}
