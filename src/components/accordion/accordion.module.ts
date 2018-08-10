import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionPanelHeadingDirective } from './accordion-panel/accordion-panel-heading.directive';
import { AccordionPanelComponent } from './accordion-panel/accordion-panel.component';
import { AccordionComponent } from './accordion.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AccordionComponent,
        AccordionPanelComponent,
        AccordionPanelHeadingDirective
    ],
    exports: [
        AccordionComponent,
        AccordionPanelComponent,
        AccordionPanelHeadingDirective
    ]
})
export class AccordionModule { }