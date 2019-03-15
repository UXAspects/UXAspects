import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/operators/index';
import { ResizeService } from '../../../directives/resize/index';
import { HierarchyBarService } from '../hierarchy-bar.service';
import { HierarchyBarNodeChildren } from '../interfaces/hierarchy-bar-node-children.interface';
import { HierarchyBarNode } from '../interfaces/hierarchy-bar-node.interface';

@Component({
    selector: 'ux-hierarchy-bar-collapsed',
    templateUrl: './hierarchy-bar-collapsed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HierarchyBarCollapsedComponent implements AfterViewInit, OnDestroy {

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

    /** Access the node container */
    @ViewChild('nodes') nodeContainer: ElementRef;

    constructor(
        public readonly hierarchyBar: HierarchyBarService,
        /** Access the renderer to mutate the DOM */
        private _renderer: Renderer2,
        /** Access the resize service to watch for changes to the host element */
        private _resizeService: ResizeService,
        /** Access the host elementRef */
        private _elementRef: ElementRef
    ) { }

    ngAfterViewInit(): void {
        // check for overflow when the selected nodes change
        this.hierarchyBar.nodes$.pipe(takeUntil(this._onDestroy), tick()).subscribe(() => this.updateOverflow());

        // watch for the host element size changing
        this._resizeService.addResizeListener(this._elementRef.nativeElement).pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.updateOverflow());
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();

        // remove the resize event listener
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
    }

    updateOverflow(): void {

        // remove the class if it is present
        this._renderer.removeClass(this.nodeContainer.nativeElement, 'hierarchy-bar-nodes-overflow');

        // check if there is overflow
        if (this.nodeContainer.nativeElement.scrollWidth > this.nodeContainer.nativeElement.offsetWidth) {
            this._renderer.addClass(this.nodeContainer.nativeElement, 'hierarchy-bar-nodes-overflow');
        }
    }
}
