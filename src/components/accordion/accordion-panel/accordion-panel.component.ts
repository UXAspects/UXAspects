import { Component, EventEmitter, HostBinding, inject, Input, Output } from '@angular/core';
import { AccordionService } from '../accordion.service';

let uniqueId: number = 1;

@Component({
    selector: 'ux-accordion-panel',
    templateUrl: './accordion-panel.component.html',
    host: {
        'class': 'panel panel-default'
    }
})
export class AccordionPanelComponent {

    readonly accordion = inject(AccordionService);

    @Input() panelId: string = `ux-accordion-panel-${uniqueId++}`;
    @Input() headingId: string = `${this.panelId}-heading`;

    @Input() disabled: boolean = false;
    @Input() heading: string;
    @Input() @HostBinding('class.panel-open') expanded: boolean = false;

    @Output() expandedChange = new EventEmitter<boolean>();

    constructor() {
        this.accordion.collapse.subscribe(() => this.collapse());
    }

    toggle(): void {

        if (this.expanded) {
            this.collapse();
            return;
        }

        // check if we should collapse others
        if (this.accordion.collapseOthers) {
            this.accordion.collapseAll();
        }

        // store the new expanded state
        this.expand();
    }

    expand(): void {
        if (this.disabled === false && this.expanded === false) {
            this.expanded = true;
            this.expandedChange.next(true);
        }
    }

    collapse(): void {
        if (this.disabled === false && this.expanded === true) {
            this.expanded = false;
            this.expandedChange.next(false);
        }
    }

}
