import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-popover',
    templateUrl: './hierarchy-bar-popover.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarPopoverComponent {

    /** Define the nodes to display */
    @Input() nodes: HierarchyBarNode[] = [];

    /** Define the loading state */
    @Input() loading: boolean;

    /** Defines if dropdown items should have separators between them to distinguish if nodes are siblings or ancestors */
    @Input() separator: boolean = false;

    /** Emit a select event when an item ahs been clicked or enter key pressed */
    @Output() selected = new EventEmitter<HierarchyBarNode>();

    constructor(public readonly hierarchyBar: HierarchyBarService) { }

}
