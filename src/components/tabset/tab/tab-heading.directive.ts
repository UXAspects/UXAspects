import { Directive, TemplateRef } from '@angular/core';
import { TabComponent } from './tab.component';

@Directive({
    selector: '[uxTabHeading]'
})
export class TabHeadingDirective {

    constructor(templateRef: TemplateRef<any>, tab: TabComponent) {
        tab.headingRef = templateRef;
    }

}