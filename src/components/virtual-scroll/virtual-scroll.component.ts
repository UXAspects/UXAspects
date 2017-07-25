import { Component, OnInit, EventEmitter, Output, Input, HostListener, ElementRef, Renderer2, AfterContentInit, ContentChild, TemplateRef } from '@angular/core';
import { ResizeService } from '../../directives/resize/index';
import { VirtualScrollLoadingDirective } from './directives/virtual-scroll-loading.directive';
import { VirtualScrollLoadButtonDirective } from './directives/virtual-scroll-load-button.directive';
import { VirtualScrollCellDirective } from './directives/virtual-scroll-cell.directive';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'ux-virtual-scroll',
    templateUrl: './virtual-scroll.component.html'
})
export class VirtualScrollComponent implements OnInit, AfterContentInit {

    @Input() collection: any[] = [];
    @Input() cellHeight: number;

    @ContentChild(VirtualScrollCellDirective, { read: TemplateRef }) cellTemplate: TemplateRef<any>;
    @ContentChild(VirtualScrollLoadingDirective, { read: TemplateRef }) loadingIndicatorTemplate: TemplateRef<any>;
    @ContentChild(VirtualScrollLoadButtonDirective, { read: TemplateRef }) loadButtonTemplate: TemplateRef<any>;

    cells: BehaviorSubject<any[]> = new BehaviorSubject([]);
    scrollTop: number = 0;
    loading: boolean = false;

    private _height: number;

    constructor(private _elementRef: ElementRef, resizeService: ResizeService, renderer: Renderer2) {

        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement, renderer).subscribe(event => this._height = event.height);
    }

    ngOnInit() {

        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }

        // render the initial set of cells
        this.renderCells();
    }

    ngAfterContentInit(): void {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    }

    @HostListener('scroll') renderCells(): void {
        this.cells.next(this.getVisibleCells());
    }

    getVisibleCells(): any[] {

        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }

        // perform some calculations
        const scrollTop = this._elementRef.nativeElement.scrollTop;
        const startCell = Math.floor(scrollTop / this.cellHeight);
        const endCell = Math.ceil(this._height / this.cellHeight) + 1;

        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);

        // return a sublist of items visible on the screen
        return this.collection.slice(startCell, startCell + endCell);
    }

    getTotalHeight(): number {
        return this.cellHeight * this.collection.length;
    }

    loadNextPage(): void {
        
    }

}