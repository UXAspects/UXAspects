import { END, HOME, PAGE_DOWN, PAGE_UP } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ContentChild, ElementRef, HostListener, Input, OnDestroy, Optional, Self } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TabbableListService } from '../../../directives/accessibility/index';
import { VirtualForDirective } from './virtual-for.directive';
import { VirtualForRange, VirtualForService } from './virtual-for.service';

@Component({
    selector: '[uxVirtualForContainer]',
    templateUrl: './virtual-for.component.html',
    providers: [VirtualForService],
    host: {
        '[style.position]': '"relative"'
    }
})
export class VirtualForContainerComponent<T> implements AfterViewInit, OnDestroy {

    /** Define the height of each virtual item */
    @Input() set itemSize(itemSize: number) {
        this._virtualScroll.itemSize = itemSize;

        if (this._initialized) {
            requestAnimationFrame(() => {
                this.updateContainer();
                this.virtualFor.updateContexts();
            });
        }
    }

    get itemSize(): number {
        return this._virtualScroll.itemSize;
    }

    /** Store the container height */
    _totalHeight: number;

    /** Keep a local reference of the dataset */
    private _dataset: T[] = [];

    /** Store the current visible range */
    private _range: VirtualForRange;

    /** Indicate if the component has finished initialising */
    private _initialized: boolean = false;

    /** Unsubscribe from all observables */
    private _onDestroy = new Subject<void>();

    /** Determine if this is a table */
    get _isTable(): boolean {
        return this._elementRef.nativeElement.tagName === 'TABLE' || this._elementRef.nativeElement.tagName === 'TBODY';
    }

    /** Determine if this is a list */
    get _isList(): boolean {
        return this._elementRef.nativeElement.tagName === 'OL' || this._elementRef.nativeElement.tagName === 'UL';
    }

    /** Access the uxVirtualFor child directive */
    @ContentChild(VirtualForDirective) virtualFor: VirtualForDirective<T>;

    constructor(
        /** Get the ElementRef of the container element */
        private _elementRef: ElementRef,
        /** A service to share values between the container and child elements */
        private _virtualScroll: VirtualForService<T>,
        /** Handle key presses if there is a tabbable list */
        @Self() @Optional() private _tabbableList: TabbableListService
    ) { }

    ngAfterViewInit(): void {
        // subscribe to changes to the dataset
        this._virtualScroll.dataset.pipe(takeUntil(this._onDestroy)).subscribe(dataset => {
            // store the latest dataset
            this._dataset = dataset;

            // update the container properties
            requestAnimationFrame(() => {
                this.updateContainer();

                // mark the component as ready
                this._initialized = true;
            });
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('scroll')
    updateContainer(): void {

        if (this.itemSize === 0 && this._dataset.length > 0) {
            this.itemSize = this.virtualFor.getHeight(this._dataset[0], this._dataset.length);
        }

        // calculate the total height of all the items
        this._totalHeight = this._dataset.length * this.itemSize;

        // get the actual height of the container element
        const height = this.getContainerHeight();

        // determine the number of items it takes to fill the container height (multiply by 2 to give us some buffer items)
        const itemCount = Math.ceil((height / this.itemSize) * 2);

        /** Determine the number of items we have as a top buffer */
        const topBufferCount = Math.ceil((height / this.itemSize) * 0.5);

        // get the scroll offset
        const scrollOffset = this.getScrollOffset();

        // determine the start index based on the scroll offset
        const startIdx = Math.max(Math.floor(scrollOffset / this.itemSize) - Math.floor(topBufferCount), 0);

        // determine the end index based on the start and the number of items to display
        const endIdx = Math.min(startIdx + itemCount, this._dataset.length);

        // update the range
        this._range = { start: startIdx, end: endIdx };

        // emit the new visible range
        this._virtualScroll.range.next(this._range);
    }

    /** If cells are automatically getting their height detected you may want to update the size */
    recalculateCellSize(): void {
        this.itemSize = 0;
    }

    @HostListener('keydown', ['$event', '$event.keyCode'])
    onKeydown(event: KeyboardEvent, keyCode: number): void {
        if (!this._tabbableList) {
            return;
        }

        switch (keyCode) {

            case PAGE_UP:
                this._tabbableList.focusKeyManager.setFirstItemActive();
                event.preventDefault();
                break;

            case PAGE_DOWN:
                this._tabbableList.focusKeyManager.setLastItemActive();
                event.preventDefault();
                break;

            case HOME:
                // ensure the QueryList doesn't do any updates until we have finished
                this._tabbableList.shouldFocusOnChange = false;

                // scroll to the top of the container
                this._elementRef.nativeElement.scrollTop = 0;

                // after the update the activate the first item
                requestAnimationFrame(() => {
                    this._tabbableList.focusKeyManager.setFirstItemActive();
                    this._tabbableList.shouldFocusOnChange = true;
                });

                event.preventDefault();
                break;

            case END:
                // ensure the QueryList doesn't do any updates until we have finished
                this._tabbableList.shouldFocusOnChange = false;

                // scroll to the bottom of the container
                this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;

                // after the update the activate the last item
                requestAnimationFrame(() => {
                    this._tabbableList.focusKeyManager.setLastItemActive();
                    this._tabbableList.shouldFocusOnChange = true;
                });

                event.preventDefault();
                break;

        }
    }

    private getScrollOffset(): number {
        return (this._elementRef.nativeElement as HTMLElement).scrollTop;
    }

    private getContainerHeight(): number {
        return (this._elementRef.nativeElement as HTMLElement).clientHeight;
    }

}
