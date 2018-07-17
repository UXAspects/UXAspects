import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ux-facet-header',
    templateUrl: './facet-header.component.html',
    host: {
        'role': 'button',
        'tabindex': '0',
        '(click)': 'toggleExpand()',
        '(keyup.enter)': 'toggleExpand()',
        '[attr.aria-expanded]': 'expanded',
        '[attr.aria-label]': 'header + \' Facet: Activate to \' + (expanded ? \'collapse\' : \'expand\')'
    }
})
export class FacetHeaderComponent {

    @Input() header: string;
    @Input() canExpand: boolean = true;
    @Input() expanded: boolean = true;
    @Output() expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    toggleExpand(): void {

        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
}