import { Component, TemplateRef } from '@angular/core';

@Component({
    selector: 'uxd-popover',
    templateUrl: './popover.testpage.component.html'
})
export class PopoverTestPageComponent {
    placement: string;
    customClass: string;
    title: string;
    content: string | TemplateRef<any> = 'Some content here';
}
