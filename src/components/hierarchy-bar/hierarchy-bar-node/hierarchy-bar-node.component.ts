import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-node',
    templateUrl: './hierarchy-bar-node.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarNodeComponent {

    /** Specify the node data */
    @Input() node: HierarchyBarNode;

    /** Define the template for the popover */
    @Input() popoverTemplate: TemplateRef<any>;

    /** Determine the mode of the hierarchy bar */
    @Input() mode: string;

    /** Emit when the node is selected */
    @Output() selected = new EventEmitter<HierarchyBarNode>();

    constructor(public readonly hierarchyBar: HierarchyBarService) { }

}
