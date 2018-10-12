/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, Output, PLATFORM_ID, QueryList, Renderer2 } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var SplitterAccessibilityDirective = /** @class */ (function () {
    function SplitterAccessibilityDirective(_elementRef, _renderer, _platform, _splitter) {
        var _this = this;
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
            .subscribe(function () { return _this.updateGutterAttributes(); });
    }
    /** Once initialised make the gutters accessible */
    /**
     * Once initialised make the gutters accessible
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.ngAfterViewInit = /**
     * Once initialised make the gutters accessible
     * @return {?}
     */
    function () {
        var _this = this;
        // find the gutters
        this.onGutterChange();
        // if the number of split areas change then update the gutters and apply aria properties
        this.areas.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.onGutterChange(); });
        // we can't know when additional split-gutters appear using ContentChildren as the directive class is not exported and selector doesn't work - use mutation observer instead
        if (isPlatformBrowser(this._platform)) {
            // create the mutation observer
            this._observer = new MutationObserver(function () { return _this.onGutterChange(); });
            // begin observing the child nodes
            this._observer.observe(this._elementRef.nativeElement, { childList: true });
        }
    };
    /** Destroy all observables and observers */
    /**
     * Destroy all observables and observers
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.ngOnDestroy = /**
     * Destroy all observables and observers
     * @return {?}
     */
    function () {
        if (this._observer) {
            this._observer.disconnect();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** We should focus the gutter when it is clicked */
    /**
     * We should focus the gutter when it is clicked
     * @param {?} event
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onClick = /**
     * We should focus the gutter when it is clicked
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            (/** @type {?} */ (event.target)).focus();
        }
    };
    /**
     * Find all the gutters and set their attributes
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onGutterChange = /**
     * Find all the gutters and set their attributes
     * @return {?}
     */
    function () {
        this._gutters = this.getGutters();
        this.setGutterAttributes();
    };
    /**
     * Get all the gutter elements
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.getGutters = /**
     * Get all the gutter elements
     * @return {?}
     */
    function () {
        // This function uses DOM accessing properties - which won't work if server side rendered
        if (isPlatformBrowser(this._platform)) {
            var /** @type {?} */ gutters = [];
            for (var /** @type {?} */ idx = 0; idx < this._elementRef.nativeElement.children.length; idx++) {
                var /** @type {?} */ node = this._elementRef.nativeElement.children.item(idx);
                if (this.isSplitterGutter(/** @type {?} */ (node))) {
                    gutters.push(/** @type {?} */ (node));
                }
            }
            return gutters;
        }
        return [];
    };
    /**
     * Set the appropriate attributes on the gutter elements
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.setGutterAttributes = /**
     * Set the appropriate attributes on the gutter elements
     * @return {?}
     */
    function () {
        var _this = this;
        // apply attribute to every gutter
        this._gutters.forEach(function (gutter) {
            // apply the separator role
            // apply the separator role
            _this._renderer.setAttribute(gutter, 'role', 'separator');
            // make the gutters tabbable
            // make the gutters tabbable
            _this._renderer.setAttribute(gutter, 'tabindex', '0');
            // set the value now aria property
            // set the value now aria property
            _this.updateGutterAttributes();
        });
    };
    /**
     * Apply the aria attribute values
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.updateGutterAttributes = /**
     * Apply the aria attribute values
     * @return {?}
     */
    function () {
        var _this = this;
        // update the value now properties of each gutter
        this._gutters.forEach(function (gutter, idx) {
            _this.setGutterValueNow(gutter, idx);
            _this.setGutterValueMin(gutter, idx);
            _this.setGutterValueMax(gutter, idx);
        });
    };
    /**
     * Apply the value now aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.setGutterValueNow = /**
     * Apply the value now aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    function (gutter, index) {
        // get the matching split area
        var /** @type {?} */ area = this._splitter.displayedAreas[index];
        // indicate the size
        this._renderer.setAttribute(gutter, 'aria-valuenow', "" + Math.round(area.size * 100));
    };
    /**
     * Apply the value min aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.setGutterValueMin = /**
     * Apply the value min aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    function (gutter, index) {
        // get the matching split area
        var /** @type {?} */ area = this.areas.toArray()[index];
        // indicate the minimum size
        this._renderer.setAttribute(gutter, 'aria-valuemin', "" + Math.round(area.minSize * 100));
    };
    /**
     * Apply the value max aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.setGutterValueMax = /**
     * Apply the value max aria attribute
     * @param {?} gutter
     * @param {?} index
     * @return {?}
     */
    function (gutter, index) {
        // get every other splitter area
        var /** @type {?} */ availableSize = this.areas
            .filter(function (_area, idx) { return index !== idx; })
            .reduce(function (total, area) { return total + area.minSize; }, 0);
        // indicate the minimum size
        this._renderer.setAttribute(gutter, 'aria-valuemax', "" + (100 - Math.round(availableSize * 100)));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            this.gutterKeydown.emit(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onIncreaseKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // only perform a move if a gutter is focused
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            this.setGutterPosition(/** @type {?} */ (event.target), -0.01);
            // stop the browser from scrolling
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onDecreaseKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // only perform a move if a gutter is focused
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            this.setGutterPosition(/** @type {?} */ (event.target), 0.01);
            // stop the browser from scrolling
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onHomeKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            // get the affected panels
            var /** @type {?} */ areas = this.getAreasFromGutter(/** @type {?} */ (event.target));
            // set the previous area to it's minimum size
            var /** @type {?} */ delta = areas.previous.size - areas.previous.comp.minSize;
            // update the sizes accordingly
            this.setGutterPosition(/** @type {?} */ (event.target), delta);
            // stop the browser from scrolling
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.onEndKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.isSplitterGutter(/** @type {?} */ (event.target))) {
            // get the affected panels
            var /** @type {?} */ areas = this.getAreasFromGutter(/** @type {?} */ (event.target));
            // set the next area to it's minimum size
            var /** @type {?} */ delta = areas.next.size - areas.next.comp.minSize;
            // update the sizes accordingly
            this.setGutterPosition(/** @type {?} */ (event.target), -delta);
            // stop the browser from scrolling
            event.preventDefault();
        }
    };
    /**
     * Determine if an element is a gutter
     * @param {?} element
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.isSplitterGutter = /**
     * Determine if an element is a gutter
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.tagName === 'SPLIT-GUTTER';
    };
    /**
     * Update the gutter position
     * @param {?} gutter
     * @param {?} delta
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.setGutterPosition = /**
     * Update the gutter position
     * @param {?} gutter
     * @param {?} delta
     * @return {?}
     */
    function (gutter, delta) {
        // get the affected panels
        var /** @type {?} */ areas = this.getAreasFromGutter(gutter);
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
    };
    /**
     * Get the split areas associated with a given gutter
     * @param {?} gutter
     * @return {?}
     */
    SplitterAccessibilityDirective.prototype.getAreasFromGutter = /**
     * Get the split areas associated with a given gutter
     * @param {?} gutter
     * @return {?}
     */
    function (gutter) {
        var /** @type {?} */ index = this._gutters.indexOf(gutter);
        return {
            previous: this._splitter.displayedAreas[index],
            next: this._splitter.displayedAreas[index + 1]
        };
    };
    SplitterAccessibilityDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'split'
                },] }
    ];
    /** @nocollapse */
    SplitterAccessibilityDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: SplitComponent }
    ]; };
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
    return SplitterAccessibilityDirective;
}());
export { SplitterAccessibilityDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXR0ZXItYWNjZXNzaWJpbGl0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9hY2Nlc3NpYmlsaXR5L3NwbGl0dGVyL3NwbGl0dGVyLWFjY2Vzc2liaWxpdHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQWlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoTCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDOztJQXNCbkMsd0NBQ1ksYUFDQSxXQUNxQixTQUFpQixFQUN0QztRQUpaLGlCQVVDO1FBVFcsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsY0FBUyxHQUFULFNBQVM7UUFDWSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3RDLGNBQVMsR0FBVCxTQUFTOzs7OzZCQWxCSyxJQUFJLFlBQVksRUFBaUI7Ozs7d0JBTXpCLEVBQUU7Ozs7MEJBTWYsSUFBSSxPQUFPLEVBQVE7O1FBU3BDLFNBQVMsQ0FBQyxZQUFZO2FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLHNCQUFzQixFQUFFLEVBQTdCLENBQTZCLENBQUMsQ0FBQztLQUN2RDtJQUVELG1EQUFtRDs7Ozs7SUFDbkQsd0RB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QUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBT2xDLFlBQVksU0FBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUM1QyxZQUFZLFNBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBVzdDLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUMxQyxZQUFZLFNBQUMsbUJBQW1CLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBVzVDLFlBQVksU0FBQyxjQUFjLEVBQUUsQ0FBQyxRQUFRLENBQUM7MkJBaUJ2QyxZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDOzt5Q0E1TTNDOztTQVNhLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUExBVEZPUk1fSUQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTcGxpdEFyZWFEaXJlY3RpdmUsIFNwbGl0Q29tcG9uZW50IH0gZnJvbSAnYW5ndWxhci1zcGxpdCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdzcGxpdCdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXR0ZXJBY2Nlc3NpYmlsaXR5RGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBFbWl0IGFuIGV2ZW50IHdoZW5ldmVyIHRoZSBndXR0ZXIgaXMgbW92ZWQgdXNpbmcgdGhlIGtleWJvYXJkICovXG4gICAgQE91dHB1dCgpIGd1dHRlcktleWRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+KCk7XG5cbiAgICAvKiogRmluZCBhbGwgdGhlIHNwbGl0IGFyZWFzICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihTcGxpdEFyZWFEaXJlY3RpdmUpIGFyZWFzOiBRdWVyeUxpc3Q8U3BsaXRBcmVhRGlyZWN0aXZlPjtcblxuICAgIC8qKiBTdG9yZSBhbGwgdGhlIGd1dHRlciBlbGVtZW50cyAqL1xuICAgIHByaXZhdGUgX2d1dHRlcnM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAgIC8qKiBXYXRjaCBmb3IgZ3V0dGVycyBiZWluZyBhZGRlZCBvciByZW1vdmVkICovXG4gICAgcHJpdmF0ZSBfb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XG5cbiAgICAvKiogVGVhcmRvd24gb3VyIG9ic2VydmFibGVzIG9uIGRlc3Ryb3kgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtOiBzdHJpbmcsXG4gICAgICAgIHByaXZhdGUgX3NwbGl0dGVyOiBTcGxpdENvbXBvbmVudFxuICAgICkge1xuICAgICAgICAvLyB1cGRhdGUgYXJpYSB2YWx1ZXMgd2hlbiB0aGUgYSBndXR0ZXIgaXMgZHJhZ2dlZFxuICAgICAgICBfc3BsaXR0ZXIuZHJhZ1Byb2dyZXNzXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVHdXR0ZXJBdHRyaWJ1dGVzKCkpO1xuICAgIH1cblxuICAgIC8qKiBPbmNlIGluaXRpYWxpc2VkIG1ha2UgdGhlIGd1dHRlcnMgYWNjZXNzaWJsZSAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gZmluZCB0aGUgZ3V0dGVyc1xuICAgICAgICB0aGlzLm9uR3V0dGVyQ2hhbmdlKCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIG51bWJlciBvZiBzcGxpdCBhcmVhcyBjaGFuZ2UgdGhlbiB1cGRhdGUgdGhlIGd1dHRlcnMgYW5kIGFwcGx5IGFyaWEgcHJvcGVydGllc1xuICAgICAgICB0aGlzLmFyZWFzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMub25HdXR0ZXJDaGFuZ2UoKSk7XG5cbiAgICAgICAgLy8gd2UgY2FuJ3Qga25vdyB3aGVuIGFkZGl0aW9uYWwgc3BsaXQtZ3V0dGVycyBhcHBlYXIgdXNpbmcgQ29udGVudENoaWxkcmVuIGFzIHRoZSBkaXJlY3RpdmUgY2xhc3MgaXMgbm90IGV4cG9ydGVkIGFuZCBzZWxlY3RvciBkb2Vzbid0IHdvcmsgLSB1c2UgbXV0YXRpb24gb2JzZXJ2ZXIgaW5zdGVhZFxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm0pKSB7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgbXV0YXRpb24gb2JzZXJ2ZXJcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdGhpcy5vbkd1dHRlckNoYW5nZSgpKTtcblxuICAgICAgICAgICAgLy8gYmVnaW4gb2JzZXJ2aW5nIHRoZSBjaGlsZCBub2Rlc1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIERlc3Ryb3kgYWxsIG9ic2VydmFibGVzIGFuZCBvYnNlcnZlcnMgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5fb2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBXZSBzaG91bGQgZm9jdXMgdGhlIGd1dHRlciB3aGVuIGl0IGlzIGNsaWNrZWQgKi9cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1NwbGl0dGVyR3V0dGVyKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRmluZCBhbGwgdGhlIGd1dHRlcnMgYW5kIHNldCB0aGVpciBhdHRyaWJ1dGVzICovXG4gICAgcHJpdmF0ZSBvbkd1dHRlckNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZ3V0dGVycyA9IHRoaXMuZ2V0R3V0dGVycygpO1xuICAgICAgICB0aGlzLnNldEd1dHRlckF0dHJpYnV0ZXMoKTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCB0aGUgZ3V0dGVyIGVsZW1lbnRzICovXG4gICAgcHJpdmF0ZSBnZXRHdXR0ZXJzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgICAgICAvLyBUaGlzIGZ1bmN0aW9uIHVzZXMgRE9NIGFjY2Vzc2luZyBwcm9wZXJ0aWVzIC0gd2hpY2ggd29uJ3Qgd29yayBpZiBzZXJ2ZXIgc2lkZSByZW5kZXJlZFxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm0pKSB7XG4gICAgICAgICAgICBjb25zdCBndXR0ZXJzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbi5pdGVtKGlkeCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NwbGl0dGVyR3V0dGVyKG5vZGUgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcnMucHVzaChub2RlIGFzIEhUTUxFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBndXR0ZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIGFwcHJvcHJpYXRlIGF0dHJpYnV0ZXMgb24gdGhlIGd1dHRlciBlbGVtZW50cyAqL1xuICAgIHByaXZhdGUgc2V0R3V0dGVyQXR0cmlidXRlcygpOiB2b2lkIHtcbiAgICAgICAgLy8gYXBwbHkgYXR0cmlidXRlIHRvIGV2ZXJ5IGd1dHRlclxuICAgICAgICB0aGlzLl9ndXR0ZXJzLmZvckVhY2goZ3V0dGVyID0+IHtcbiAgICAgICAgICAgIC8vIGFwcGx5IHRoZSBzZXBhcmF0b3Igcm9sZVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGd1dHRlciwgJ3JvbGUnLCAnc2VwYXJhdG9yJyk7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIGd1dHRlcnMgdGFiYmFibGVcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShndXR0ZXIsICd0YWJpbmRleCcsICcwJyk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgdmFsdWUgbm93IGFyaWEgcHJvcGVydHlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3V0dGVyQXR0cmlidXRlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQXBwbHkgdGhlIGFyaWEgYXR0cmlidXRlIHZhbHVlcyAqL1xuICAgIHByaXZhdGUgdXBkYXRlR3V0dGVyQXR0cmlidXRlcygpOiB2b2lkIHtcbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSBub3cgcHJvcGVydGllcyBvZiBlYWNoIGd1dHRlclxuICAgICAgICB0aGlzLl9ndXR0ZXJzLmZvckVhY2goKGd1dHRlciwgaWR4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEd1dHRlclZhbHVlTm93KGd1dHRlciwgaWR4KTtcbiAgICAgICAgICAgIHRoaXMuc2V0R3V0dGVyVmFsdWVNaW4oZ3V0dGVyLCBpZHgpO1xuICAgICAgICAgICAgdGhpcy5zZXRHdXR0ZXJWYWx1ZU1heChndXR0ZXIsIGlkeCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBBcHBseSB0aGUgdmFsdWUgbm93IGFyaWEgYXR0cmlidXRlICovXG4gICAgcHJpdmF0ZSBzZXRHdXR0ZXJWYWx1ZU5vdyhndXR0ZXI6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGdldCB0aGUgbWF0Y2hpbmcgc3BsaXQgYXJlYVxuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5fc3BsaXR0ZXIuZGlzcGxheWVkQXJlYXNbaW5kZXhdO1xuXG4gICAgICAgIC8vIGluZGljYXRlIHRoZSBzaXplXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShndXR0ZXIsICdhcmlhLXZhbHVlbm93JywgYCR7TWF0aC5yb3VuZChhcmVhLnNpemUgKiAxMDApfWApO1xuICAgIH1cblxuICAgIC8qKiBBcHBseSB0aGUgdmFsdWUgbWluIGFyaWEgYXR0cmlidXRlICovXG4gICAgcHJpdmF0ZSBzZXRHdXR0ZXJWYWx1ZU1pbihndXR0ZXI6IEhUTUxFbGVtZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGdldCB0aGUgbWF0Y2hpbmcgc3BsaXQgYXJlYVxuICAgICAgICBjb25zdCBhcmVhID0gdGhpcy5hcmVhcy50b0FycmF5KClbaW5kZXhdO1xuXG4gICAgICAgIC8vIGluZGljYXRlIHRoZSBtaW5pbXVtIHNpemVcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGd1dHRlciwgJ2FyaWEtdmFsdWVtaW4nLCBgJHtNYXRoLnJvdW5kKGFyZWEubWluU2l6ZSAqIDEwMCl9YCk7XG4gICAgfVxuXG4gICAgLyoqIEFwcGx5IHRoZSB2YWx1ZSBtYXggYXJpYSBhdHRyaWJ1dGUgKi9cbiAgICBwcml2YXRlIHNldEd1dHRlclZhbHVlTWF4KGd1dHRlcjogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gZ2V0IGV2ZXJ5IG90aGVyIHNwbGl0dGVyIGFyZWFcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlU2l6ZSA9IHRoaXMuYXJlYXNcbiAgICAgICAgICAgIC5maWx0ZXIoKF9hcmVhLCBpZHgpID0+IGluZGV4ICE9PSBpZHgpXG4gICAgICAgICAgICAucmVkdWNlPG51bWJlcj4oKHRvdGFsLCBhcmVhKSA9PiB0b3RhbCArIGFyZWEubWluU2l6ZSwgMCk7XG5cbiAgICAgICAgLy8gaW5kaWNhdGUgdGhlIG1pbmltdW0gc2l6ZVxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZ3V0dGVyLCAnYXJpYS12YWx1ZW1heCcsIGAkezEwMCAtIE1hdGgucm91bmQoYXZhaWxhYmxlU2l6ZSAqIDEwMCl9YCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzU3BsaXR0ZXJHdXR0ZXIoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ndXR0ZXJLZXlkb3duLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXG4gICAgb25JbmNyZWFzZUtleShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBvbmx5IHBlcmZvcm0gYSBtb3ZlIGlmIGEgZ3V0dGVyIGlzIGZvY3VzZWRcbiAgICAgICAgaWYgKHRoaXMuaXNTcGxpdHRlckd1dHRlcihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEd1dHRlclBvc2l0aW9uKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCwgLTAuMDEpO1xuXG4gICAgICAgICAgICAvLyBzdG9wIHRoZSBicm93c2VyIGZyb20gc2Nyb2xsaW5nXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkFycm93TGVmdCcsIFsnJGV2ZW50J10pXG4gICAgb25EZWNyZWFzZUtleShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBvbmx5IHBlcmZvcm0gYSBtb3ZlIGlmIGEgZ3V0dGVyIGlzIGZvY3VzZWRcbiAgICAgICAgaWYgKHRoaXMuaXNTcGxpdHRlckd1dHRlcihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnNldEd1dHRlclBvc2l0aW9uKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCwgMC4wMSk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmdcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkhvbWUnLCBbJyRldmVudCddKVxuICAgIG9uSG9tZUtleShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc1NwbGl0dGVyR3V0dGVyKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIC8vIGdldCB0aGUgYWZmZWN0ZWQgcGFuZWxzXG4gICAgICAgICAgICBjb25zdCBhcmVhcyA9IHRoaXMuZ2V0QXJlYXNGcm9tR3V0dGVyKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgcHJldmlvdXMgYXJlYSB0byBpdCdzIG1pbmltdW0gc2l6ZVxuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBhcmVhcy5wcmV2aW91cy5zaXplIC0gYXJlYXMucHJldmlvdXMuY29tcC5taW5TaXplO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNpemVzIGFjY29yZGluZ2x5XG4gICAgICAgICAgICB0aGlzLnNldEd1dHRlclBvc2l0aW9uKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCwgZGVsdGEpO1xuXG4gICAgICAgICAgICAvLyBzdG9wIHRoZSBicm93c2VyIGZyb20gc2Nyb2xsaW5nXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5FbmQnLCBbJyRldmVudCddKVxuICAgIG9uRW5kS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzU3BsaXR0ZXJHdXR0ZXIoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhZmZlY3RlZCBwYW5lbHNcbiAgICAgICAgICAgIGNvbnN0IGFyZWFzID0gdGhpcy5nZXRBcmVhc0Zyb21HdXR0ZXIoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXh0IGFyZWEgdG8gaXQncyBtaW5pbXVtIHNpemVcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gYXJlYXMubmV4dC5zaXplIC0gYXJlYXMubmV4dC5jb21wLm1pblNpemU7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc2l6ZXMgYWNjb3JkaW5nbHlcbiAgICAgICAgICAgIHRoaXMuc2V0R3V0dGVyUG9zaXRpb24oZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50LCAtZGVsdGEpO1xuXG4gICAgICAgICAgICAvLyBzdG9wIHRoZSBicm93c2VyIGZyb20gc2Nyb2xsaW5nXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIERldGVybWluZSBpZiBhbiBlbGVtZW50IGlzIGEgZ3V0dGVyICovXG4gICAgcHJpdmF0ZSBpc1NwbGl0dGVyR3V0dGVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUgPT09ICdTUExJVC1HVVRURVInO1xuICAgIH1cblxuICAgIC8qKiBVcGRhdGUgdGhlIGd1dHRlciBwb3NpdGlvbiAqL1xuICAgIHByaXZhdGUgc2V0R3V0dGVyUG9zaXRpb24oZ3V0dGVyOiBIVE1MRWxlbWVudCwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBnZXQgdGhlIGFmZmVjdGVkIHBhbmVsc1xuICAgICAgICBjb25zdCBhcmVhcyA9IHRoaXMuZ2V0QXJlYXNGcm9tR3V0dGVyKGd1dHRlcik7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIGNhbiBwZXJmb3JtIHRoZSByZXNpemVcbiAgICAgICAgaWYgKGFyZWFzLnByZXZpb3VzLnNpemUgLSBkZWx0YSA8IGFyZWFzLnByZXZpb3VzLmNvbXAubWluU2l6ZSB8fCBhcmVhcy5uZXh0LnNpemUgKyBkZWx0YSA8IGFyZWFzLm5leHQuY29tcC5taW5TaXplKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtIHRoZSByZXNpemVcbiAgICAgICAgYXJlYXMucHJldmlvdXMuc2l6ZSAtPSBkZWx0YTtcbiAgICAgICAgYXJlYXMubmV4dC5zaXplICs9IGRlbHRhO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc3BsaXR0ZXIgLSB0aGlzIGlzIGEgcHJpdmF0ZSBtZXRob2QgYnV0IHdlIG5lZWQgdG8gY2FsbCBpdFxuICAgICAgICAodGhpcy5fc3BsaXR0ZXIgYXMgYW55KS5yZWZyZXNoU3R5bGVTaXplcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZ3V0dGVyIGFyaWEgdmFsdWVzXG4gICAgICAgIHRoaXMudXBkYXRlR3V0dGVyQXR0cmlidXRlcygpO1xuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIHNwbGl0IGFyZWFzIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGd1dHRlciAqL1xuICAgIHByaXZhdGUgZ2V0QXJlYXNGcm9tR3V0dGVyKGd1dHRlcjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9ndXR0ZXJzLmluZGV4T2YoZ3V0dGVyKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldmlvdXM6IHRoaXMuX3NwbGl0dGVyLmRpc3BsYXllZEFyZWFzW2luZGV4XSxcbiAgICAgICAgICAgIG5leHQ6IHRoaXMuX3NwbGl0dGVyLmRpc3BsYXllZEFyZWFzW2luZGV4ICsgMV1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=