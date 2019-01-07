import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ResizeService } from '../../directives/resize/index';
import { VirtualScrollCellDirective } from './directives/virtual-scroll-cell.directive';
import { VirtualScrollLoadButtonDirective } from './directives/virtual-scroll-load-button.directive';
import { VirtualScrollLoadingDirective } from './directives/virtual-scroll-loading.directive';

@Component({
    selector: 'ux-virtual-scroll',
    templateUrl: './virtual-scroll.component.html'
})
export class VirtualScrollComponent<T> implements OnInit, AfterContentInit, OnDestroy {

    @Input() collection: Observable<T[]> = Observable.create();
    @Input() cellHeight: number;
    @Input() loadOnScroll: boolean = true;

    @Output() loading: EventEmitter<number> = new EventEmitter<number>();

    @ContentChild(VirtualScrollCellDirective, { read: TemplateRef }) cellTemplate: TemplateRef<any>;
    @ContentChild(VirtualScrollLoadingDirective, { read: TemplateRef }) loadingIndicatorTemplate: TemplateRef<any>;
    @ContentChild(VirtualScrollLoadButtonDirective, { read: TemplateRef }) loadButtonTemplate: TemplateRef<any>;

    cells: BehaviorSubject<VirtualCell<T>[]> = new BehaviorSubject([]);
    scrollTop: number = 0;
    isLoading: boolean = false;
    pageNumber: number = 0;
    data: ReadonlyArray<T> = [];
    loadingComplete: boolean = false;

    private _buffer: number = 5;
    private _subscription: Subscription;
    private _height: number;
    private _onDestroy = new Subject<void>();

    constructor(private _elementRef: ElementRef, resizeService: ResizeService) {

        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement).pipe(takeUntil(this._onDestroy))
            .subscribe(event => this._height = event.height);
    }

    ngOnInit(): void {

        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }

        // subscribe to the collection
        this.setupObservable();

        // load the first page of data
        this.loadNextPage();
    }

    ngAfterContentInit(): void {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.collection && changes.collection.currentValue !== changes.collection.previousValue && !changes.collection.isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    setupObservable(): void {

        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }

        this._subscription = this.collection.subscribe(collection => {
            this.data = [...this.data, ...collection];
            this.renderCells();
            this.isLoading = false;
        }, null, () => {
            this.loadingComplete = true;
        });
    }

    @HostListener('scroll') renderCells(): void {
        this.cells.next(this.getVisibleCells());

        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            const remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);

            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    }

    getVisibleCells(): VirtualCell<T>[] {

        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }

        // perform some calculations
        const scrollTop = this._elementRef.nativeElement.scrollTop;
        const startCell = Math.floor(scrollTop / this.cellHeight);
        const endCell = Math.ceil(this._height / this.cellHeight);

        // we want to add some buffer cells on both the top and bottom of the visible list
        const startBuffer = Math.max(0, startCell - this._buffer);
        const endBuffer = startCell + (startCell - startBuffer) + Math.min(this.data.length, endCell + this._buffer);

        // update the scroll position
        this.scrollTop = (scrollTop - (scrollTop % this.cellHeight)) - ((startCell - startBuffer) * this.cellHeight);

        // return a sublist of items visible on the screen
        const cells = this.data.slice(startBuffer, endBuffer);

        // now map these cells to a virtual cell interface
        return cells.map((cell, index) => ({ data: cell, index: startBuffer + index }));
    }

    getTotalHeight(): number {
        return this.cellHeight * this.data.length;
    }

    loadNextPage(): void {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    }

    reset(): void {

        // reset all values
        this.scrollTop = 0;
        this.data = [];
        this._height = undefined;
        this.pageNumber = 0;
        this.loadingComplete = false;

        // set scroll position
        this._elementRef.nativeElement.scrollTop = 0;

        // clear the current cells
        this.renderCells();

        // reload first page
        this.loadNextPage();
    }
}

export interface VirtualCell<T> {
    data: T;
    index: number;
}