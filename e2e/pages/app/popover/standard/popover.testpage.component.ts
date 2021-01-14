import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'uxd-popover',
    templateUrl: './popover.testpage.component.html',
    styleUrls: ['./popover.testpage.component.less']
})
export class PopoverTestPageComponent {
    placement: string = 'top';
    customClass: string;
    title: string;
    content: string | TemplateRef<any> = 'Some content here';
}
