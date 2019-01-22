import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNodeChildren } from '../interfaces/hierarchy-bar-node-children.interface';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-collapsed',
    templateUrl: './hierarchy-bar-collapsed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarCollapsedComponent implements OnDestroy {

    /** Get the first node to display */
    get _first(): HierarchyBarNode {
        return this._nodes[0];
    }

    /** Get the last node to display */
    get _last(): HierarchyBarNode {
        return this._nodes[this._nodes.length - 1];
    }

    /** Get all the sibling nodes */
    get _siblings(): Observable<HierarchyBarNodeChildren> {
        return this.hierarchyBar.getSiblings(this._last);
    }

    /** Get all the nodes between the first and last nodes */
    get _parents(): HierarchyBarNode[] {
        return this._nodes.filter(node => node !== this._first && node !== this._last);
    }

    /** Get the nodes as an array */
    private get _nodes(): HierarchyBarNode[] {
        return this.hierarchyBar.nodes$.value;
    }

    /** Unsubscribe from all observables on destroy */
    private _onDestroy = new Subject<void>();

    constructor(public readonly hierarchyBar: HierarchyBarService) { }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
