import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { OverlayTrigger } from '../../tooltip/index';
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

    /** Define the events that show the popover when interacting with the arrows */
    @Input() showTriggers: OverlayTrigger[] = ['click'];

    /** Define the events that hide the popover when interacting with the arrows */
    @Input() hideTriggers: OverlayTrigger[] = ['click', 'clickoutside', 'escape'];

    /** Emit when the node is selected */
    @Output() select = new EventEmitter<HierarchyBarNode>();

}
