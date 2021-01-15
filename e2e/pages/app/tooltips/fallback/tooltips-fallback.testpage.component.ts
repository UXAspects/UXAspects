import { Component } from '@angular/core';

@Component({
    selector: 'uxd-tooltips-fallback',
    templateUrl: './tooltips-fallback.testpage.component.html',
    styleUrls: ['./tooltips-fallback.testpage.component.less']
})
export class TooltipsFallbackTestPageComponent {

    placement: string = 'top';
    fallbackPlacement: string = 'top';

}
