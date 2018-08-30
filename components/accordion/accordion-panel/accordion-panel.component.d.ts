import { EventEmitter } from '@angular/core';
import { AccordionService } from '../accordion.service';
export declare class AccordionPanelComponent {
    accordion: AccordionService;
    panelId: string;
    headingId: string;
    disabled: boolean;
    heading: string;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    constructor(accordion: AccordionService);
    toggle(): void;
    expand(): void;
    collapse(): void;
}
