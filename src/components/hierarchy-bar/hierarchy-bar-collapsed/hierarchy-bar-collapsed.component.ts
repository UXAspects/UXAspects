import { ChangeDetectionStrategy, Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-collapsed',
    templateUrl: './hierarchy-bar-collapsed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarCollapsedComponent implements OnDestroy {

    /** Provide a custom loading indicator */
    @Input() loadingIndicator: TemplateRef<any>;

    /** Provide a custom overflow template */
    @Input() overflowTemplate: TemplateRef<any>;

    /** Get the first node to display */
    get _first(): HierarchyBarNode {
        return this._nodes[0];
    }

    /** Get the last node to display */
    get _last(): HierarchyBarNode {
        return this._nodes[this._nodes.length - 1];
    }

    /** Get all the nodes between the first and last nodes */
    get _links(): HierarchyBarNode[] {
        return this._nodes.filter(node => node !== this._first && node !== this._last);
    }

    /** Get the nodes as an array */
    private get _nodes(): HierarchyBarNode[] {
        return this.hierarchyBar.nodes$.value;
    }

    private _onDestroy = new Subject<void>();

    constructor(public readonly hierarchyBar: HierarchyBarService) { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
