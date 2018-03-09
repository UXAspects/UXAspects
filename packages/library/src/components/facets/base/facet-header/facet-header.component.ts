import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ux-facet-header',
    templateUrl: './facet-header.component.html',
    styleUrls: ['./facet-header.component.less'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'tabindex': '0',
        '(click)': 'toggleExpand()',
        '(keyup.enter)': 'toggleExpand()'
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