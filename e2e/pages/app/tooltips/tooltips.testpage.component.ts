import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'uxd-tooltips',
    templateUrl: './tooltips.testpage.component.html',
    styleUrls: ['./tooltips.testpage.component.less']
})
export class TooltipsTestPageComponent {

    placement: string = 'top';
    fallbackPlacement: string = null;
    customClass: string;
    content: string | TemplateRef<any> = 'Some content here';

    reset(): void {
        this.placement = 'top';
        this.fallbackPlacement = undefined;
        this.customClass = undefined;
        this.content = 'Some content here';
    }
}
