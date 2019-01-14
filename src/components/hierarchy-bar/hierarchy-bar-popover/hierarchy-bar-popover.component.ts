import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
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

    /** Provide a custom loading template for the loading indicator */
    @Input() loadingIndicator: TemplateRef<any>;

    /** Emit a select event when an item ahs been clicked or enter key pressed */
    @Output() select = new EventEmitter<HierarchyBarNode>();

}
