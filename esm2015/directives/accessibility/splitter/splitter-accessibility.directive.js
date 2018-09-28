/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, QueryList, Renderer2 } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class SplitterAccessibilityDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _platform
     * @param {?} _splitter
     */
    constructor(_elementRef, _renderer, _platform, _splitter) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._platform = _platform;
        this._splitter = _splitter;
        /**
         * Emit an event whenever the gutter is moved using the keyboard
         */
        this.gutterKeydown = new EventEmitter();
        /**
         * Store all the gutter elements
         */
        this._gutters = [];
        /**
         * Teardown our observables on destroy
         */
        this._onDestroy = new Subject();
        // update aria values when the a gutter is dragged
        _splitter.dragProgress
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.updateGutterAttributes());
    }
    /**
     * Once initialised make the gutters accessible
     * @return {?}
     */
    ngAfterViewInit() {
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
    /**
     * Destroy all observables and observers
     * @return {?}
     */
    ngOnDestroy() {
        if (this._observer) {
            this._observer.disconnect();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * We should focus the gutter when it is clicked
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            (/** @type {?} */ (event.target)).focus();
        }
    }
    /**
     * Find all the gutters and set their attributes
     * @return {?}
     */
    onGutterChange() {
        this._gutters = this.getGutters();
        this.setGutterAttributes();
    }
    /**
     * Get all the gutter elements
     * @return {?}
     */
    getGutters() {
        // This function uses DOM accessing properties - which won't work if server side rendered
        if (isPlatformBrowser(this._platform)) {
            const /** @type {?} */ gutters = [];
            for (let /** @type {?} */ idx = 0; idx < this._elementRef.nativeElement.children.length; idx++) {
                const /** @type {?} */ node = this._elementRef.nativeElement.children.item(idx);
                if (this.isSplitterGutter(/** @type {?} */ (node))) {
                    gutters.push(/** @type {?} */ (node));
                }
            }
            return gutters;
        }
        return [];
    }
    /**
     * Set the appropriate attributes on the gutter elements
     * @return {?}
     */
    setGutterAttributes() {
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
    /**
     * Apply the aria attribute values
     * @return {?}
     */
    updateGutterAttributes() {
        // update the value now properties of each gutter
        this._gutters.forEach((gutter, idx) => {
            this.setGutterValueNow(gutter, idx);
            this.setGutterValueMin(gutter, idx);
            this.setGutterValueMax(gutter, idx);
        });
    }
    /**
     * Apply the value now aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    setGutterValueNow(gutter, index) {
        // get the matching split area
        const /** @type {?} */ area = this._splitter.displayedAreas[index];
        // indicate the size
        this._renderer.setAttribute(gutter, 'aria-valuenow', `${Math.round(area.size * 100)}`);
    }
    /**
     * Apply the value min aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    setGutterValueMin(gutter, index) {
        // get the matching split area
        const /** @type {?} */ area = this.areas.toArray()[index];
        // indicate the minimum size
        this._renderer.setAttribute(gutter, 'aria-valuemin', `${Math.round(area.minSize * 100)}`);
    }
    /**
     * Apply the value max aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    setGutterValueMax(gutter, index) {
        // get every other splitter area
        const /** @type {?} */ availableSize = this.areas
            .filter((_area, idx) => index !== idx)
            .reduce((total, area) => total + area.minSize, 0);
        // indicate the minimum size
        this._renderer.setAttribute(gutter, 'aria-valuemax', `${100 - Math.round(availableSize * 100)}`);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            this.gutterKeydown.emit(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onIncreaseKey(event) {
        // only perform a move if a gutter is focused
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            this.setGutterPosition(/** @type {?} */ (event.target), -0.01);
            // stop the browser from scrolling
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDecreaseKey(event) {
        // only perform a move if a gutter is focused
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            this.setGutterPosition(/** @type {?} */ (event.target), 0.01);
            // stop the browser from scrolling
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onHomeKey(event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            // get the affected panels
            const /** @type {?} */ areas = this.getAreasFromGutter(/** @type {?} */ (event.target));
            // set the previous area to it's minimum size
            const /** @type {?} */ delta = areas.previous.size - areas.previous.comp.minSize;
            // update the sizes accordingly
            this.setGutterPosition(/** @type {?} */ (event.target), delta);
            // stop the browser from scrolling
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onEndKey(event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            // get the affected panels
            const /** @type {?} */ areas = this.getAreasFromGutter(/** @type {?} */ (event.target));
            // set the next area to it's minimum size
            const /** @type {?} */ delta = areas.next.size - areas.next.comp.minSize;
            // update the sizes accordingly
            this.setGutterPosition(/** @type {?} */ (event.target), -delta);
            // stop the browser from scrolling
            event.preventDefault();
        }
    }
    /**
     * Determine if an element is a gutter
     * @param {?} element
     * @return {?}
     */
    isSplitterGutter(element) {
        return element.tagName === 'SPLIT-GUTTER';
    }
    /**
     * Update the gutter position
     * @param {?} gutter
     * @param {?} delta
     * @return {?}
     */
    setGutterPosition(gutter, delta) {
        // get the affected panels
        const /** @type {?} */ areas = this.getAreasFromGutter(gutter);
        // ensure we can perform the resize
        if (areas.previous.size - delta < areas.previous.comp.minSize || areas.next.size + delta < areas.next.comp.minSize) {
            return;
        }
        // perform the resize
        areas.previous.size -= delta;
        areas.next.size += delta;
        // update the splitter - this is a private method but we need to call it
        (/** @type {?} */ (this._splitter)).refreshStyleSizes();
        // update the gutter aria values
        this.updateGutterAttributes();
    }
    /**
     * Get the split areas associated with a given gutter
     * @param {?} gutter
     * @return {?}
     */
    getAreasFromGutter(gutter) {
        const /** @type {?} */ index = this._gutters.indexOf(gutter);
        return {
            previous: this._splitter.displayedAreas[index],
            next: this._splitter.displayedAreas[index + 1]
        };
    }
}
SplitterAccessibilityDirective.decorators = [
    { type: Directive, args: [{
                selector: 'split'
            },] }
];
/** @nocollapse */
SplitterAccessibilityDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: SplitComponent }
];
SplitterAccessibilityDirective.propDecorators = {
    gutterKeydown: [{ type: Output }],
    areas: [{ type: ContentChildren, args: [SplitAreaDirective,] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onIncreaseKey: [{ type: HostListener, args: ['keydown.ArrowDown', ['$event'],] }, { type: HostListener, args: ['keydown.ArrowRight', ['$event'],] }],
    onDecreaseKey: [{ type: HostListener, args: ['keydown.ArrowUp', ['$event'],] }, { type: HostListener, args: ['keydown.ArrowLeft', ['$event'],] }],
    onHomeKey: [{ type: HostListener, args: ['keydown.Home', ['$event'],] }],
    onEndKey: [{ type: HostListener, args: ['keydown.End', ['$event'],] }]
};
function SplitterAccessibilityDirective_tsickle_Closure_declarations() {
    /**
     * Emit an event whenever the gutter is moved using the keyboard
     * @type {?}
     */
    SplitterAccessibilityDirective.prototype.gutterKeydown;
    /**
     * Find all the split areas
     * @type {?}
     */
    SplitterAccessibilityDirective.prototype.areas;
    /**
     * Store all the gutter elements
     * @type {?}
     */
    SplitterAccessibilityDirective.prototype._gutters;
    /**
     * Watch for gutters being added or removed
     * @type {?}
     */
    SplitterAccessibilityDirective.prototype._observer;
    /**
     * Teardown our observables on destroy
     * @type {?}
     */
    SplitterAccessibilityDirective.prototype._onDestroy;
    /** @type {?} */
    SplitterAccessibilityDirective.prototype._elementRef;
    /** @type {?} */
    SplitterAccessibilityDirective.prototype._renderer;
    /** @type {?} */
    SplitterAccessibilityDirective.prototype._platform;
    /** @type {?} */
    SplitterAccessibilityDirective.prototype._splitter;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXItYWNjZXNzaWJpbGl0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3NwbGl0dGVyL3NwbGl0dGVyLWFjY2Vzc2liaWxpdHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQWlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoTCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBS3ZDLE1BQU07Ozs7Ozs7SUFpQkYsWUFDWSxhQUNBLFdBQ3FCLFNBQWlCLEVBQ3RDO1FBSEEsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDWSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3RDLGNBQVMsR0FBVCxTQUFTOzs7OzZCQWxCSyxJQUFJLFlBQVksRUFBaUI7Ozs7d0JBTXpCLEVBQUU7Ozs7MEJBTWYsSUFBSSxPQUFPLEVBQVE7O1FBU3BDLFNBQVMsQ0FBQyxZQUFZO2FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZEOzs7OztJQUdELGVBQWU7O1FBRVgsSUFBSSxDQUFD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Q0FBQzt1QkFpQnZDLFlBQVksU0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgT25EZXN0cm95LCBPdXRwdXQsIFBMQVRGT1JNX0lELCBRdWVyeUxpc3QsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3BsaXRBcmVhRGlyZWN0aXZlLCBTcGxpdENvbXBvbmVudCB9IGZyb20gJ2FuZ3VsYXItc3BsaXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnc3BsaXQnXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0dGVyQWNjZXNzaWJpbGl0eURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogRW1pdCBhbiBldmVudCB3aGVuZXZlciB0aGUgZ3V0dGVyIGlzIG1vdmVkIHVzaW5nIHRoZSBrZXlib2FyZCAqL1xuICAgIEBPdXRwdXQoKSBndXR0ZXJLZXlkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PigpO1xuXG4gICAgLyoqIEZpbmQgYWxsIHRoZSBzcGxpdCBhcmVhcyAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oU3BsaXRBcmVhRGlyZWN0aXZlKSBhcmVhczogUXVlcnlMaXN0PFNwbGl0QXJlYURpcmVjdGl2ZT47XG5cbiAgICAvKiogU3RvcmUgYWxsIHRoZSBndXR0ZXIgZWxlbWVudHMgKi9cbiAgICBwcml2YXRlIF9ndXR0ZXJzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICAvKiogV2F0Y2ggZm9yIGd1dHRlcnMgYmVpbmcgYWRkZWQgb3IgcmVtb3ZlZCAqL1xuICAgIHByaXZhdGUgX29ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyO1xuXG4gICAgLyoqIFRlYXJkb3duIG91ciBvYnNlcnZhYmxlcyBvbiBkZXN0cm95ICovXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm06IHN0cmluZyxcbiAgICAgICAgcHJpdmF0ZSBfc3BsaXR0ZXI6IFNwbGl0Q29tcG9uZW50XG4gICAgKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBhcmlhIHZhbHVlcyB3aGVuIHRoZSBhIGd1dHRlciBpcyBkcmFnZ2VkXG4gICAgICAgIF9zcGxpdHRlci5kcmFnUHJvZ3Jlc3NcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZUd1dHRlckF0dHJpYnV0ZXMoKSk7XG4gICAgfVxuXG4gICAgLyoqIE9uY2UgaW5pdGlhbGlzZWQgbWFrZSB0aGUgZ3V0dGVycyBhY2Nlc3NpYmxlICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIHRoZSBndXR0ZXJzXG4gICAgICAgIHRoaXMub25HdXR0ZXJDaGFuZ2UoKTtcblxuICAgICAgICAvLyBpZiB0aGUgbnVtYmVyIG9mIHNwbGl0IGFyZWFzIGNoYW5nZSB0aGVuIHVwZGF0ZSB0aGUgZ3V0dGVycyBhbmQgYXBwbHkgYXJpYSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuYXJlYXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vbkd1dHRlckNoYW5nZSgpKTtcblxuICAgICAgICAvLyB3ZSBjYW4ndCBrbm93IHdoZW4gYWRkaXRpb25hbCBzcGxpdC1ndXR0ZXJzIGFwcGVhciB1c2luZyBDb250ZW50Q2hpbGRyZW4gYXMgdGhlIGRpcmVjdGl2ZSBjbGFzcyBpcyBub3QgZXhwb3J0ZWQgYW5kIHNlbGVjdG9yIGRvZXNuJ3Qgd29yayAtIHVzZSBtdXRhdGlvbiBvYnNlcnZlciBpbnN0ZWFkXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybSkpIHtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBtdXRhdGlvbiBvYnNlcnZlclxuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0aGlzLm9uR3V0dGVyQ2hhbmdlKCkpO1xuXG4gICAgICAgICAgICAvLyBiZWdpbiBvYnNlcnZpbmcgdGhlIGNoaWxkIG5vZGVzXG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlci5vYnNlcnZlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRGVzdHJveSBhbGwgb2JzZXJ2YWJsZXMgYW5kIG9ic2VydmVycyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLl9vYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFdlIHNob3VsZCBmb2N1cyB0aGUgZ3V0dGVyIHdoZW4gaXQgaXMgY2xpY2tlZCAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzU3BsaXR0ZXJHdXR0ZXIoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBGaW5kIGFsbCB0aGUgZ3V0dGVycyBhbmQgc2V0IHRoZWlyIGF0dHJpYnV0ZXMgKi9cbiAgICBwcml2YXRlIG9uR3V0dGVyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ndXR0ZXJzID0gdGhpcy5nZXRHdXR0ZXJzKCk7XG4gICAgICAgIHRoaXMuc2V0R3V0dGVyQXR0cmlidXRlcygpO1xuICAgIH1cblxuICAgIC8qKiBHZXQgYWxsIHRoZSBndXR0ZXIgZWxlbWVudHMgKi9cbiAgICBwcml2YXRlIGdldEd1dHRlcnMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgICAgIC8vIFRoaXMgZnVuY3Rpb24gdXNlcyBET00gYWNjZXNzaW5nIHByb3BlcnRpZXMgLSB3aGljaCB3b24ndCB3b3JrIGlmIHNlcnZlciBzaWRlIHJlbmRlcmVkXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGd1dHRlcnM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuLml0ZW0oaWR4KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3BsaXR0ZXJHdXR0ZXIobm9kZSBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3V0dGVycy5wdXNoKG5vZGUgYXMgSFRNTEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGd1dHRlcnM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgYXBwcm9wcmlhdGUgYXR0cmlidXRlcyBvbiB0aGUgZ3V0dGVyIGVsZW1lbnRzICovXG4gICAgcHJpdmF0ZSBzZXRHdXR0ZXJBdHRyaWJ1dGVzKCk6IHZvaWQge1xuICAgICAgICAvLyBhcHBseSBhdHRyaWJ1dGUgdG8gZXZlcnkgZ3V0dGVyXG4gICAgICAgIHRoaXMuX2d1dHRlcnMuZm9yRWFjaChndXR0ZXIgPT4ge1xuICAgICAgICAgICAgLy8gYXBwbHkgdGhlIHNlcGFyYXRvciByb2xlXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZ3V0dGVyLCAncm9sZScsICdzZXBhcmF0b3InKTtcblxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgZ3V0dGVycyB0YWJiYWJsZVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGd1dHRlciwgJ3RhYmluZGV4JywgJzAnKTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZSBub3cgYXJpYSBwcm9wZXJ0eVxuICAgICAgICAgICAgdGhpcy51cGRhdGVHdXR0ZXJBdHRyaWJ1dGVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBBcHBseSB0aGUgYXJpYSBhdHRyaWJ1dGUgdmFsdWVzICovXG4gICAgcHJpdmF0ZSB1cGRhdGVHdXR0ZXJBdHRyaWJ1dGVzKCk6IHZvaWQge1xuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG5vdyBwcm9wZXJ0aWVzIG9mIGVhY2ggZ3V0dGVyXG4gICAgICAgIHRoaXMuX2d1dHRlcnMuZm9yRWFjaCgoZ3V0dGVyLCBpZHgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0R3V0dGVyVmFsdWVOb3coZ3V0dGVyLCBpZHgpO1xuICAgICAgICAgICAgdGhpcy5zZXRHdXR0ZXJWYWx1ZU1pbihndXR0ZXIsIGlkeCk7XG4gICAgICAgICAgICB0aGlzLnNldEd1dHRlclZhbHVlTWF4KGd1dHRlciwgaWR4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEFwcGx5IHRoZSB2YWx1ZSBub3cgYXJpYSBhdHRyaWJ1dGUgKi9cbiAgICBwcml2YXRlIHNldEd1dHRlclZhbHVlTm93KGd1dHRlcjogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRjaGluZyBzcGxpdCBhcmVhXG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLl9zcGxpdHRlci5kaXNwbGF5ZWRBcmVhc1tpbmRleF07XG5cbiAgICAgICAgLy8gaW5kaWNhdGUgdGhlIHNpemVcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGd1dHRlciwgJ2FyaWEtdmFsdWVub3cnLCBgJHtNYXRoLnJvdW5kKGFyZWEuc2l6ZSAqIDEwMCl9YCk7XG4gICAgfVxuXG4gICAgLyoqIEFwcGx5IHRoZSB2YWx1ZSBtaW4gYXJpYSBhdHRyaWJ1dGUgKi9cbiAgICBwcml2YXRlIHNldEd1dHRlclZhbHVlTWluKGd1dHRlcjogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBtYXRjaGluZyBzcGxpdCBhcmVhXG4gICAgICAgIGNvbnN0IGFyZWEgPSB0aGlzLmFyZWFzLnRvQXJyYXkoKVtpbmRleF07XG5cbiAgICAgICAgLy8gaW5kaWNhdGUgdGhlIG1pbmltdW0gc2l6ZVxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZ3V0dGVyLCAnYXJpYS12YWx1ZW1pbicsIGAke01hdGgucm91bmQoYXJlYS5taW5TaXplICogMTAwKX1gKTtcbiAgICB9XG5cbiAgICAvKiogQXBwbHkgdGhlIHZhbHVlIG1heCBhcmlhIGF0dHJpYnV0ZSAqL1xuICAgIHByaXZhdGUgc2V0R3V0dGVyVmFsdWVNYXgoZ3V0dGVyOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBnZXQgZXZlcnkgb3RoZXIgc3BsaXR0ZXIgYXJlYVxuICAgICAgICBjb25zdCBhdmFpbGFibGVTaXplID0gdGhpcy5hcmVhc1xuICAgICAgICAgICAgLmZpbHRlcigoX2FyZWEsIGlkeCkgPT4gaW5kZXggIT09IGlkeClcbiAgICAgICAgICAgIC5yZWR1Y2U8bnVtYmVyPigodG90YWwsIGFyZWEpID0+IHRvdGFsICsgYXJlYS5taW5TaXplLCAwKTtcblxuICAgICAgICAvLyBpbmRpY2F0ZSB0aGUgbWluaW11bSBzaXplXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShndXR0ZXIsICdhcmlhLXZhbHVlbWF4JywgYCR7MTAwIC0gTWF0aC5yb3VuZChhdmFpbGFibGVTaXplICogMTAwKX1gKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTcGxpdHRlckd1dHRlcihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmd1dHRlcktleWRvd24uZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkFycm93RG93bicsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5BcnJvd1JpZ2h0JywgWyckZXZlbnQnXSlcbiAgICBvbkluY3JlYXNlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIG9ubHkgcGVyZm9ybSBhIG1vdmUgaWYgYSBndXR0ZXIgaXMgZm9jdXNlZFxuICAgICAgICBpZiAodGhpcy5pc1NwbGl0dGVyR3V0dGVyKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0R3V0dGVyUG9zaXRpb24oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCAtMC4wMSk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkFycm93VXAnLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dMZWZ0JywgWyckZXZlbnQnXSlcbiAgICBvbkRlY3JlYXNlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIG9ubHkgcGVyZm9ybSBhIG1vdmUgaWYgYSBndXR0ZXIgaXMgZm9jdXNlZFxuICAgICAgICBpZiAodGhpcy5pc1NwbGl0dGVyR3V0dGVyKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0R3V0dGVyUG9zaXRpb24oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCAwLjAxKTtcblxuICAgICAgICAgICAgLy8gc3RvcCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZ1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uSG9tZScsIFsnJGV2ZW50J10pXG4gICAgb25Ib21lS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzU3BsaXR0ZXJHdXR0ZXIoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhZmZlY3RlZCBwYW5lbHNcbiAgICAgICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5nZXRBcmVhc0Zyb21HdXR0ZXIoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBwcmV2aW91cyBhcmVhIHRvIGl0J3MgbWluaW11bSBzaXplXG4gICAgICAgICAgICBjb25zdCBkZWx0YSA9IGFyZWFzLnByZXZpb3VzLnNpemUgLSBhcmVhcy5wcmV2aW91cy5jb21wLm1pblNpemU7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc2l6ZXMgYWNjb3JkaW5nbHlcbiAgICAgICAgICAgIHRoaXMuc2V0R3V0dGVyUG9zaXRpb24oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCBkZWx0YSk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkVuZCcsIFsnJGV2ZW50J10pXG4gICAgb25FbmRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTcGxpdHRlckd1dHRlcihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFmZmVjdGVkIHBhbmVsc1xuICAgICAgICAgICAgY29uc3QgYXJlYXMgPSB0aGlzLmdldEFyZWFzRnJvbUd1dHRlcihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGhlIG5leHQgYXJlYSB0byBpdCdzIG1pbmltdW0gc2l6ZVxuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBhcmVhcy5uZXh0LnNpemUgLSBhcmVhcy5uZXh0LmNvbXAubWluU2l6ZTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzaXplcyBhY2NvcmRpbmdseVxuICAgICAgICAgICAgdGhpcy5zZXRHdXR0ZXJQb3NpdGlvbihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQsIC1kZWx0YSk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgaXMgYSBndXR0ZXIgKi9cbiAgICBwcml2YXRlIGlzU3BsaXR0ZXJHdXR0ZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PT0gJ1NQTElULUdVVFRFUic7XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZSB0aGUgZ3V0dGVyIHBvc2l0aW9uICovXG4gICAgcHJpdmF0ZSBzZXRHdXR0ZXJQb3NpdGlvbihndXR0ZXI6IEhUTUxFbGVtZW50LCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGdldCB0aGUgYWZmZWN0ZWQgcGFuZWxzXG4gICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5nZXRBcmVhc0Zyb21HdXR0ZXIoZ3V0dGVyKTtcblxuICAgICAgICAvLyBlbnN1cmUgd2UgY2FuIHBlcmZvcm0gdGhlIHJlc2l6ZVxuICAgICAgICBpZiAoYXJlYXMucHJldmlvdXMuc2l6ZSAtIGRlbHRhIDwgYXJlYXMucHJldmlvdXMuY29tcC5taW5TaXplIHx8IGFyZWFzLm5leHQuc2l6ZSArIGRlbHRhIDwgYXJlYXMubmV4dC5jb21wLm1pblNpemUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gdGhlIHJlc2l6ZVxuICAgICAgICBhcmVhcy5wcmV2aW91cy5zaXplIC09IGRlbHRhO1xuICAgICAgICBhcmVhcy5uZXh0LnNpemUgKz0gZGVsdGE7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzcGxpdHRlciAtIHRoaXMgaXMgYSBwcml2YXRlIG1ldGhvZCBidXQgd2UgbmVlZCB0byBjYWxsIGl0XG4gICAgICAgICh0aGlzLl9zcGxpdHRlciBhcyBhbnkpLnJlZnJlc2hTdHlsZVNpemVzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBndXR0ZXIgYXJpYSB2YWx1ZXNcbiAgICAgICAgdGhpcy51cGRhdGVHdXR0ZXJBdHRyaWJ1dGVzKCk7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgc3BsaXQgYXJlYXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gZ3V0dGVyICovXG4gICAgcHJpdmF0ZSBnZXRBcmVhc0Zyb21HdXR0ZXIoZ3V0dGVyOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2d1dHRlcnMuaW5kZXhPZihndXR0ZXIpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcmV2aW91czogdGhpcy5fc3BsaXR0ZXIuZGlzcGxheWVkQXJlYXNbaW5kZXhdLFxuICAgICAgICAgICAgbmV4dDogdGhpcy5fc3BsaXR0ZXIuZGlzcGxheWVkQXJlYXNbaW5kZXggKyAxXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==