import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, OnDestroy, Output, PLATFORM_ID, QueryList, Renderer2 } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: 'split'
})
export class SplitterAccessibilityDirective implements AfterViewInit, OnDestroy {

    /** Emit an event whenever the gutter is moved using the keyboard */
    @Output() gutterKeydown = new EventEmitter<KeyboardEvent>();

    /** Find all the split areas */
    @ContentChildren(SplitAreaDirective) areas: QueryList<SplitAreaDirective>;

    /** Store all the gutter elements */
    private _gutters: HTMLElement[] = [];

    /** Watch for gutters being added or removed */
    private _observer: MutationObserver;

    /** Teardown our observables on destroy */
    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2,
        @Inject(PLATFORM_ID) private _platform: string,
        private _splitter: SplitComponent
    ) {
        // update aria values when the a gutter is dragged
        _splitter.dragProgress
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.updateGutterAttributes());
    }

    /** Once initialised make the gutters accessible */
    ngAfterViewInit(): void {
        // find the gutters
        this.onGutterChange();

        // if the number of split areas change then update the gutters and apply aria properties
        this.areas.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.onGutterChange());

        // we can't know when additional split-gutters appear using ContentChildren as the directive class is not exported and selector doesn't work - use mutation observer instead
        if (isPlatformBrowser(this._platform)) {

            // create the mutation observer
            this._observer = new MutationObserver(() => this.onGutterChange());

            // begin observing the child nodes
            this._observer.observe(this._elementRef.nativeElement, { childList: true });
        }
    }

    /** Destroy all observables and observers */
    ngOnDestroy(): void {

        if (this._observer) {
            this._observer.disconnect();
        }

        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Find all the gutters and set their attributes */
    private onGutterChange(): void {
        this._gutters = this.getGutters();
        this.setGutterAttributes();
    }

    /** Get all the gutter elements */
    private getGutters(): HTMLElement[] {
        // This function uses DOM accessing properties - which won't work if server side rendered
        if (isPlatformBrowser(this._platform)) {
            const gutters: HTMLElement[] = [];

            for (let idx = 0; idx < this._elementRef.nativeElement.children.length; idx++) {
                const node = this._elementRef.nativeElement.children.item(idx);

                if (this.isSplitterGutter(node as HTMLElement)) {
                    gutters.push(node as HTMLElement);
                }
            }

            return gutters;
        }

        return [];
    }

    /** Set the appropriate attributes on the gutter elements */
    private setGutterAttributes(): void {
        // apply attribute to every gutter
        this._gutters.forEach(gutter => {
            // apply the separator role
            this._renderer.setAttribute(gutter, 'role', 'separator');

            // make the gutters tabbable
            this._renderer.setAttribute(gutter, 'tabindex', '0');

            // set the value now aria property
            this.updateGutterAttributes();
        });
    }

    /** Apply the aria attribute values */
    private updateGutterAttributes(): void {
        // update the value now properties of each gutter
        this._gutters.forEach((gutter, idx) => {
            this.setGutterValueNow(gutter, idx);
            this.setGutterValueMin(gutter, idx);
            this.setGutterValueMax(gutter, idx);
        });
    }

    /** Apply the value now aria attribute */
    private setGutterValueNow(gutter: HTMLElement, index: number): void {
        // get the matching split area
        const area = this._splitter.displayedAreas[index];

        // indicate the size
        this._renderer.setAttribute(gutter, 'aria-valuenow', `${Math.round(area.size * 100)}`);
    }

    /** Apply the value min aria attribute */
    private setGutterValueMin(gutter: HTMLElement, index: number): void {
        // get the matching split area
        const area = this.areas.toArray()[index];

        // indicate the minimum size
        this._renderer.setAttribute(gutter, 'aria-valuemin', `${Math.round(area.minSize * 100)}`);
    }

    /** Apply the value max aria attribute */
    private setGutterValueMax(gutter: HTMLElement, index: number): void {
        // get every other splitter area
        const availableSize = this.areas
            .filter((_area, idx) => index !== idx)
            .reduce<number>((total, area) => total + area.minSize, 0);

        // indicate the minimum size
        this._renderer.setAttribute(gutter, 'aria-valuemax', `${100 - Math.round(availableSize * 100)}`);
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
        this.gutterKeydown.emit(event);
    }

    @HostListener('keydown.ArrowDown', ['$event.target'])
    @HostListener('keydown.ArrowRight', ['$event.target'])
    onIncreaseKey(target: HTMLElement): void {
        // only perform a move if a gutter is focused
        if (this.isSplitterGutter(target)) {
            this.setGutterPosition(target, -0.01);
        }
    }

    @HostListener('keydown.ArrowUp', ['$event.target'])
    @HostListener('keydown.ArrowLeft', ['$event.target'])
    onDecreaseKey(target: HTMLElement): void {
        // only perform a move if a gutter is focused
        if (this.isSplitterGutter(target)) {
            this.setGutterPosition(target, 0.01);
        }
    }

    @HostListener('keydown.Home', ['$event', '$event.target'])
    onHomeKey(event: MouseEvent, target: HTMLElement): void {
        if (this.isSplitterGutter(target)) {
            // get the affected panels
            const areas = this.getAreasFromGutter(target);

            // set the previous area to it's minimum size
            const delta = areas.previous.size - areas.previous.comp.minSize;

            // update the sizes accordingly
            this.setGutterPosition(target, delta);

            // stop the browser from scrolling
            event.preventDefault();
        }
    }

    @HostListener('keydown.End', ['$event', '$event.target'])
    onEndKey(event: MouseEvent, target: HTMLElement): void {
        if (this.isSplitterGutter(target)) {
            // get the affected panels
            const areas = this.getAreasFromGutter(target);

            // set the next area to it's minimum size
            const delta = areas.next.size - areas.next.comp.minSize;

            // update the sizes accordingly
            this.setGutterPosition(target, -delta);

            // stop the browser from scrolling
            event.preventDefault();
        }
    }

    /** Determine if an element is a gutter */
    private isSplitterGutter(element: HTMLElement): boolean {
        return element.tagName === 'SPLIT-GUTTER';
    }

    /** Update the gutter position */
    private setGutterPosition(gutter: HTMLElement, delta: number): void {
        // get the affected panels
        const areas = this.getAreasFromGutter(gutter);

        // ensure we can perform the resize
        if (areas.previous.size - delta < areas.previous.comp.minSize || areas.next.size + delta < areas.next.comp.minSize) {
            return;
        }

        // perform the resize
        areas.previous.size -= delta;
        areas.next.size += delta;

        // update the splitter - this is a private method but we need to call it
        (this._splitter as any).refreshStyleSizes();

        // update the gutter aria values
        this.updateGutterAttributes();
    }

    /** Get the split areas associated with a given gutter */
    private getAreasFromGutter(gutter: HTMLElement) {
        const index = this._gutters.indexOf(gutter);

        return {
            previous: this._splitter.displayedAreas[index],
            next: this._splitter.displayedAreas[index + 1]
        };
    }
}
