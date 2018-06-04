import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'uxd-tooltips',
    templateUrl: './tooltips.testpage.component.html'
})
export class TooltipsTestPageComponent {
    placement: string;
    customClass: string;
    content: string | TemplateRef<any> = 'Some content here';
}
