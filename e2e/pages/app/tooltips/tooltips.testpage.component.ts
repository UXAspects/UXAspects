import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'uxd-tooltips',
    templateUrl: './tooltips.testpage.component.html'
})
export class TooltipsTestPageComponent {
    placement: string;
    customClass: string;
    content: string | TemplateRef<any> = 'Some content here';

    reset(): void {
        this.placement = undefined;
        this.customClass = undefined;
        this.content = 'Some content here';
    }
}
