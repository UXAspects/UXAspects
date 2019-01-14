import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { OverlayTrigger } from '../tooltip/index';
import { HierarchyBarService } from './hierarchy-bar.service';
import { HierarchyBarNode } from './interfaces/hierarchy-bar-node.interface';
import { HierarchyBarMode, IHierachyBarComponent } from './interfaces/hierarchy-bar.interface';

@Component({
    selector: 'ux-hierarchy-bar',
    templateUrl: './hierarchy-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [HierarchyBarService]
})
export class HierarchyBarComponent implements IHierachyBarComponent {

    /** Define which presentational mode we should display */
    @Input() mode: HierarchyBarMode = 'collapsed';

    /** Define the root node of the hierarchy bar */
    @Input() set root(node: HierarchyBarNode) {
        this._hierarchyBar.setRootNode(node);
    }

    /** Define the selected node in the hierarchy bar */
    @Input() set selected(node: HierarchyBarNode) {
        this._hierarchyBar.selectNode(node);
    }

    /** Provide a custom loading indicator */
    @Input() loadingIndicator: TemplateRef<any>;

    /** Define the events that show the popover when interacting with the arrows */
    @Input() popoverShowTriggers: OverlayTrigger[] = ['click'];

    /** Define the events that hide the popover when interacting with the arrows */
    @Input() popoverHideTriggers: OverlayTrigger[] = ['click', 'clickoutside', 'escape'];

    /** Emit when the selected node changes */
    @Output() selectedChange = new EventEmitter<HierarchyBarNode>();

    constructor(private readonly _hierarchyBar: HierarchyBarService) { }
}