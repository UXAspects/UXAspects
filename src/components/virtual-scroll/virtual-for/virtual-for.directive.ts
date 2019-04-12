import { Directive, DoCheck, EmbeddedViewRef, Input, IterableChangeRecord, IterableChanges, IterableDiffer, IterableDiffers, OnDestroy, OnInit, Optional, Renderer2, TemplateRef, TrackByFunction, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { VirtualForRange, VirtualForService } from './virtual-for.service';

/**
 * This implementation is inspired by the CDK virtual for:
 * https://github.com/angular/material2/blob/master/src/cdk/scrolling/virtual-for-of.ts
 * However the CDK requires a container component which limits use in places such
 * as fixed header tables, so this is a more generic implementation that does not
 * require a parent element but instead uses an attribute on the parent container instead
 */

@Directive({
    selector: '[uxVirtualFor][uxVirtualForOf]',
})
export class VirtualForDirective<T> implements OnInit, DoCheck, OnDestroy {

    /** Store the list of items to display */
    @Input() set uxVirtualForOf(dataset: T[]) {
        // emit the latest dataset
        this._virtualScroll.dataset.next(dataset);

        // store a local version of the dataset
        this._dataset = dataset;

        // if this is an update and not the initial dataset then we should
        // forcibly redraw the list of items. In cases where the length of
        // the dataset change would trigger a re-renderer as the scroll position
        // would change, however if we are performing sorting then it would not
        // so we must ensure we update everytime the dataset changes.
        if (this._renderedRange) {
            this.onRangeChange();
        }
    }

    /** Provide a trackBy function to optimize rendering */
    @Input() uxVirtualForTrackBy: TrackByFunction<T> | undefined = this.defaultTrackBy;

    /** The instance of the differ we create */
    private _differ: IterableDiffer<T>;

    /** Keep a local reference to the dataset */
    private _dataset: T[];

    /** Store the currently rendered range */
    private _renderedRange: VirtualForRange;

    /** Store a list of all the currently rendered items */
    private _renderedItems: T[];

    /** Indicate whether we need to perform a view update */
    private _isDirty: boolean = false;

    /** Store a cache of recently disposed views for reuse */
    private _templateCache: EmbeddedViewRef<VirtualForOfContext<T>>[] = [];

    /** Limit the size of the cache as it can use a lot of memory */
    private _cacheSize: number = 20;

    /** Unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    constructor(
        /** A reference to the container element where we will insert elements. */
        private _viewContainerRef: ViewContainerRef,
        /** The template for all items */
        private _templateRef: TemplateRef<VirtualForOfContext<T>>,
        /** Gets the set of Angular differs for detecting changes. */
        private _differs: IterableDiffers,
        /** Get the renderer to perform DOM manipulation */
        private _renderer: Renderer2,
        /** A service to share values between the container and child elements */
        @Optional() private _virtualScroll: VirtualForService<T>,
    ) {
        // While marked as optional, it isn't. We do this so we can provide a more helpful error message
        if (!this._virtualScroll) {
            throw new Error('The "uxVirtualFor" directive requires the "uxVirtualForContainer" directive to be added to the parent element.');
        }
    }

    ngOnInit(): void {
        // update the UI whenever the range changes
        this._virtualScroll.range.pipe(takeUntil(this._onDestroy), distinctUntilChanged(this.isRangeSame)).subscribe(range => {
            this._renderedRange = range;
            this.onRangeChange();
        });
    }

    ngDoCheck(): void {
        if (this._isDirty && this._differ) {

            // check if there area any changes
            const changes = this.getChanges();

            if (changes) {
                this.applyChanges(changes);
            } else {
                this.updateContexts();
            }

            // now that we have rendered any change we should store this so we don't perform unneeded updates
            this._isDirty = false;
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** If an itemSize is not specified we need to calculate it */
    getHeight(context: T, length: number): number {

        // create a temporary view
        const view = this.createView(0);

        // set the implicit value to the item value
        view.context.$implicit = context;
        view.context.count = length;
        view.context.even = true;
        view.context.odd = false;
        view.context.first = true;
        view.context.last = length === 1;

        // run change detection
        view.detectChanges();

        // get the size of the view
        const height = view.rootNodes[0].offsetHeight;

        // destroy the view
        this._viewContainerRef.remove(0);
        view.destroy();

        return height;
    }

    /** Determine if the range has changed (performance optimization) */
    private isRangeSame(previous: VirtualForRange, current: VirtualForRange): boolean {
        return previous.start === current.start && previous.end === current.end;
    }

    private onRangeChange(): void {

        // store the visible range
        this._renderedItems = this._dataset.slice(this._renderedRange.start, this._renderedRange.end);

        // create the Angular differ if we haven't previously done so
        if (!this._differ) {
            this._differ = this._differs.find(this._renderedItems).create(this.uxVirtualForTrackBy);
        }

        // mark the view for re-render
        this._isDirty = true;
    }

    /** Determine which items have changed */
    private getChanges(): IterableChanges<T> {
        return this._differ.diff(this._renderedItems);
    }

    /** Insert, move and remove any items within the view */
    private applyChanges(changes: IterableChanges<T>): void {

        // Go through each changes and either add or rearrange accordingly
        changes.forEachOperation((record: IterableChangeRecord<T>, previousIndex: number, currentIndex: number) => {

            // check if a new item was added
            if (previousIndex === null) {
                // create the new embedded view
                const view = this.createView(currentIndex);

                // set the implicit value to the item value
                view.context.$implicit = record.item;

            } else if (currentIndex === null) { // check if the item should be removed
                const view = this._viewContainerRef.detach(currentIndex) as EmbeddedViewRef<VirtualForOfContext<T>>;
                const index = this._viewContainerRef.indexOf(view);

                // if there is space in the cache then store the detached view
                if (this._templateCache.length < this._cacheSize) {
                    this._templateCache.push(view);
                } else {
                    index === -1 ? view.destroy() : this._viewContainerRef.remove(index);
                }
            } else { // the position of the item has changed

                // get the view from its current position
                const view = this._viewContainerRef.get(previousIndex) as EmbeddedViewRef<VirtualForOfContext<T>>;

                // move it to the new position
                this._viewContainerRef.move(view, currentIndex);

                // update the implicit value (the rest will stay the same)
                view.context.$implicit = record.item;
            }
        });

        // Ensure the implicit value is correct for any items whose identity changed
        changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
            const view = this._viewContainerRef.get(record.currentIndex) as EmbeddedViewRef<VirtualForOfContext<T>>;

            if (view) {
                view.context.$implicit = record.item;
            }
        });

        this.updateContexts();
    }

    updateContexts(): void {

        // update all the other context properties
        for (let idx = 0; idx < this._viewContainerRef.length; idx++) {

            // get the view at a given position
            const view = this._viewContainerRef.get(idx) as EmbeddedViewRef<VirtualForOfContext<T>>;

            // update the properties
            view.context.index = this._renderedRange.start + idx;
            view.context.count = this._dataset.length;
            view.context.first = view.context.index === 0;
            view.context.last = view.context.index === view.context.count - 1;
            view.context.even = view.context.index % 2 === 0;
            view.context.odd = !view.context.even;

            // update the position in the DOM
            view.rootNodes.forEach((node: HTMLElement) => {
                this._renderer.setStyle(node, 'position', 'absolute');
                this._renderer.setStyle(node, 'width', '100%');
                this._renderer.setStyle(node, 'top', '0');
                this._renderer.setStyle(node, 'transform', `translateY(${view.context.index * this._virtualScroll.itemSize}px`);
            });

            view.detectChanges();
        }
    }

    private createView(index: number): EmbeddedViewRef<VirtualForOfContext<T>> {

        // get a checked EmbeddedViewRef is there is one
        const cachedTemplate = this._templateCache.pop();

        if (cachedTemplate) {

            // replace existing context with the defaults
            cachedTemplate.context.$implicit = null;
            cachedTemplate.context.index = -1;
            cachedTemplate.context.count = -1;
            cachedTemplate.context.first = false;
            cachedTemplate.context.last = false;
            cachedTemplate.context.even = false;
            cachedTemplate.context.odd = false;

            // insert the view
            this._viewContainerRef.insert(cachedTemplate, index);

            // return the cached EmbeddedViewRef
            return cachedTemplate;
        }

        // otherwise create a new view and insert it
        return this._viewContainerRef.createEmbeddedView<VirtualForOfContext<T>>(this._templateRef, {
            $implicit: null,
            index: -1,
            count: -1,
            first: false,
            last: false,
            even: false,
            odd: false,
        }, index);
    }

    private defaultTrackBy(index: number): number {
        return index;
    }

}

/** We want to supply the same properties as `ngFor` */
export interface VirtualForOfContext<T> {
    $implicit: T;
    index: number;
    count: number;
    first: boolean;
    last: boolean;
    even: boolean;
    odd: boolean;
}
