import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-popover-item',
    templateUrl: './hierarchy-bar-popover-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarPopoverItemComponent {

    /** Specify the node to display */
    @Input() node: HierarchyBarNode;

    /** Emit when a click or enter key press occurs */
    @Output() select = new EventEmitter<HierarchyBarNode>();

    @HostListener('click')
    @HostListener('keydown.enter')
    onSelect(): void {
        this.select.emit(this.node);
    }

}