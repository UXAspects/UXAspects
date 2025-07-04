import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ContentChild, EventEmitter, inject, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ReorderEvent } from '../../directives/reorderable/index';
import { FacetClearButtonDirective } from './facet-clear-button/facet-clear-button.directive';
import { FacetDeselect, FacetEvent } from './facet-events';
import { FacetService } from './facet.service';
import { Facet } from './models/facet';
import { CdkDragEnter, CdkDropList, DragRef, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'ux-facet-container',
    templateUrl: './facet-container.component.html',
    providers: [FacetService],
    preserveWhitespaces: false,
    standalone: false
})
export class FacetContainerComponent implements OnDestroy, AfterViewInit {
    readonly facetService = inject(FacetService);
    private readonly _announcer = inject(LiveAnnouncer);

    /** Defines the text displayed at the top of the Facet Container. */
    @Input() header: string = 'Selected';

    /** Defines the text to display in the tooltip when hovering over the clear all button. */
    @Input() clearTooltip: string = 'Clear All';

    /** Defines the text to display when there are no selected facets. */
    @Input() emptyText: string = 'No Items';

    /** Determines if the facets can be reordered. */
    @Input() facetsReorderable: boolean = false;

    /** Allows a predefined set of Facets to be displayed. */
    @Input() set facets(facets: Facet[]) {
        this.facetService.facets$.next(facets);
    }

    get facets(): Facet[] {
        return this.facetService.facets$.value;
    }

    /** Defines the aria-label for the clear all button. */
    @Input() clearAriaLabel: string = 'Clear All';

    /** Defines the aria-label for the deselect facet button.. */
    @Input() deselectFacetAriaLabel: string = 'Deselect Facet';

    /** If using two-way binding this array will update when the selected facets change. */
    @Output() facetsChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();

    /**
     * This will be triggered when a facet is selected, deselected or all facets are deselected.
     * The event will be an instance of either `FacetSelect`, `FacetDeselect` or `FacetDeselectAll` and
     * will contain the facet being selected or deselected in a `facet` property
     * (deselect all will not contain affected facets). */
    @Output() events: EventEmitter<FacetEvent> = new EventEmitter<FacetEvent>();

    /** Allow a custom clear button */
    @ContentChild(FacetClearButtonDirective, { read: TemplateRef, static: false }) clearButton: TemplateRef<FacetClearButtonDirective>;

    @ViewChild(CdkDropList) placeholder: CdkDropList;

    private target: CdkDropList = null;
    private targetIndex: number;
    private source: CdkDropList = null;
    private sourceIndex: number;
    private dragRef: DragRef = null;

    private readonly _onDestroy = new Subject<void>();

    constructor() {
        this.facetService.facets$.subscribe(facets => this.facetsChange.next(facets));
        this.facetService.events$.subscribe(event => this.triggerEvent(event));

        // announce deselection
        this.facetService.events$.pipe(filter<FacetDeselect>(event => event instanceof FacetDeselect))
            .subscribe(event => this._announcer.announce(`Option ${event.facet.title} deselected.`, 'assertive'));
    }

    ngAfterViewInit() {
        const placeholderElement = this.placeholder.element.nativeElement;
        placeholderElement.style.display = 'none';
        placeholderElement.parentNode.removeChild(placeholderElement);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onDropListDropped() {
        if (!this.target) {
            return;
        }
        const placeholderElement: HTMLElement = this.placeholder.element.nativeElement;
        const placeholderParentElement: HTMLElement = placeholderElement.parentElement;
        placeholderElement.style.display = 'none';

        placeholderParentElement.removeChild(placeholderElement);
        placeholderParentElement.appendChild(placeholderElement);
        placeholderParentElement.insertBefore(
            this.source.element.nativeElement,
            placeholderParentElement.children[this.sourceIndex]
        );

        if (this.placeholder._dropListRef.isDragging()) {
            this.placeholder._dropListRef.exit(this.dragRef);
        }

        this.target = null;
        this.source = null;
        this.dragRef = null;

        if (this.sourceIndex !== this.targetIndex) {
            moveItemInArray(this.facets, this.sourceIndex, this.targetIndex);
        }
    }

    onDropListEntered({ item, container }: CdkDragEnter) {
        if (container == this.placeholder) {
            return;
        }
        const placeholderElement: HTMLElement = this.placeholder.element.nativeElement;
        const sourceElement: HTMLElement = item.dropContainer.element.nativeElement;
        const dropElement: HTMLElement = container.element.nativeElement;
        
        const dragIndex: number = Array.prototype.indexOf.call(
            dropElement.parentElement.children,
            this.source ? placeholderElement : sourceElement
        );
        const dropIndex: number = Array.prototype.indexOf.call(
            dropElement.parentElement.children,
            dropElement
        );

        if (!this.source) {
            this.sourceIndex = dragIndex;
            this.source = item.dropContainer;
            sourceElement.parentElement.removeChild(sourceElement);
        }

        this.targetIndex = dropIndex;
        this.target = container;
        this.dragRef = item._dragRef;
        placeholderElement.style.display = '';

        dropElement.parentElement.insertBefore(
            placeholderElement,
            dropIndex > dragIndex ? dropElement.nextSibling : dropElement
        );

        this.placeholder._dropListRef.enter(
            item._dragRef,
            item.element.nativeElement.offsetLeft,
            item.element.nativeElement.offsetTop,
        );
    }

    selectFacet(facet: Facet): void {
        this.facetService.select(facet);
    }

    deselectFacet(facet: Facet, tag?: HTMLElement): void {

        // find the index of the item in the selected array
        const idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);

        // if match there was no match then finish
        if (idx === -1) {
            return;
        }

        // remove the last item
        this.facetService.deselect(facet);

        // announce the facet removal
        this._announcer.announce(`Option ${facet.title} deselected.`, 'assertive');

        // focus another tag if there is one
        if (tag) {
            const sibling = tag.previousElementSibling || tag.nextElementSibling;

            // if there is a sibling then focus it
            if (sibling) {
                (sibling as HTMLElement).focus();
            }
        }
    }

    deselectAllFacets(): void {

        // empty the selected array
        this.facetService.deselectAll();

        // announce the facet removal
        this._announcer.announce('All options deselected.', 'assertive');
    }

    trackBy(_index: number, facet: Facet): string | number {
        return facet.id || facet.title;
    }

    shiftRight(facet: Facet, element: HTMLElement): void {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }

        // perform the movement
        this.shiftFacet(facet, 1);

        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());

        // announce the move
        this._announcer.announce(`Option ${facet.title} moved down.`);
    }

    shiftLeft(facet: Facet, element: HTMLElement): void {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }

        // perform the movement
        this.shiftFacet(facet, -1);

        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());

        // announce the move
        this._announcer.announce(`Option ${facet.title} moved up.`);
    }

    private shiftFacet(facet: Facet, distance: number) {
        const index = this.facets.indexOf(facet);
        const target = index + distance;

        // Ensure the move is valid
        if (target < 0 || target === this.facets.length) {
            return;
        }

        // Perform the move
        this.facets.splice(index, 1);
        this.facets.splice(target, 0, facet);
    }

    private triggerEvent(event: FacetEvent) {
        this.events.next(event);
    }
}

export interface FacetReorderEvent extends ReorderEvent {
    index: number;
}
