/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
var InfiniteScrollLoadButtonDirective = (function () {
    function InfiniteScrollLoadButtonDirective(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new Subject();
        this.load = /** @type {?} */ (this._load.asObservable());
    }
    Object.defineProperty(InfiniteScrollLoadButtonDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._visible) {
                if (value) {
                    this._viewContainer.createEmbeddedView(this._template);
                    // Template content follows the elementRef, which is a comment.
                    var /** @type {?} */ clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                    this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
                }
                else {
                    this._viewContainer.clear();
                }
            }
            this._visible = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._load.next(event);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    InfiniteScrollLoadButtonDirective.prototype.getNextElementSibling = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var /** @type {?} */ next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    };
    InfiniteScrollLoadButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxInfiniteScrollLoadButton]'
                },] },
    ];
    /** @nocollapse */
    InfiniteScrollLoadButtonDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: Renderer2, },
    ]; };
    InfiniteScrollLoadButtonDirective.propDecorators = {
        "visible": [{ type: Input, args: ['uxInfiniteScrollLoadButton',] },],
        "load": [{ type: Output },],
    };
    return InfiniteScrollLoadButtonDirective;
}());
export { InfiniteScrollLoadButtonDirective };
function InfiniteScrollLoadButtonDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    InfiniteScrollLoadButtonDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    InfiniteScrollLoadButtonDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    InfiniteScrollLoadButtonDirective.propDecorators;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype.load;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._visible;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._load;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._element;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._template;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._viewContainer;
    /** @type {?} */
    InfiniteScrollLoadButtonDirective.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLWxvYWQtYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZmluaXRlLXNjcm9sbC9pbmZpbml0ZS1zY3JvbGwtbG9hZC1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7O0lBZ0NuQywyQ0FDWSxVQUNBLFdBQ0EsZ0JBQ0E7UUFIQSxhQUFRLEdBQVIsUUFBUTtRQUNSLGNBQVMsR0FBVCxTQUFTO1FBQ1QsbUJBQWMsR0FBZCxjQUFjO1FBQ2QsY0FBUyxHQUFULFNBQVM7d0JBUE8sS0FBSztxQkFDakIsSUFBSSxPQUFPLEVBQUU7UUFRekIsSUFBSSxDQUFDLElBQUkscUJBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQXVCLENBQUEsQ0FBQztLQUM5RDswQkEvQkcsc0RBQU87Ozs7O1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7OztRQUV6QixVQUFZLEtBQWM7WUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztvQkFHdkQscUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDeEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUN4RTtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUMvQjthQUNKO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDekI7Ozs7Ozs7O0lBZ0JPLG1EQUFPOzs7O2NBQUMsS0FBaUI7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUduQixpRUFBcUI7Ozs7Y0FBQyxPQUFZO1FBQ3RDLHFCQUFJLElBQUksR0FBRyxPQUFPLENBQUM7UUFDbkIsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDOzs7Z0JBbERuQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtpQkFDM0M7Ozs7Z0JBTm1CLFVBQVU7Z0JBQTRCLFdBQVc7Z0JBQUUsZ0JBQWdCO2dCQUF4QyxTQUFTOzs7NEJBU25ELEtBQUssU0FBQyw0QkFBNEI7eUJBb0JsQyxNQUFNOzs0Q0E3Qlg7O1NBT2EsaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEluZmluaXRlU2Nyb2xsTG9hZEJ1dHRvbl0nXG59KVxuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsTG9hZEJ1dHRvbkRpcmVjdGl2ZSB7XG5cbiAgICBASW5wdXQoJ3V4SW5maW5pdGVTY3JvbGxMb2FkQnV0dG9uJylcbiAgICBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuICAgIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5fdGVtcGxhdGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gVGVtcGxhdGUgY29udGVudCBmb2xsb3dzIHRoZSBlbGVtZW50UmVmLCB3aGljaCBpcyBhIGNvbW1lbnQuXG4gICAgICAgICAgICAgICAgY29uc3QgY2xpY2tUYXJnZXQgPSB0aGlzLmdldE5leHRFbGVtZW50U2libGluZyh0aGlzLl90ZW1wbGF0ZS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3RlbihjbGlja1RhcmdldCwgJ2NsaWNrJywgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGxvYWQ6IE9ic2VydmFibGU8RXZlbnQ+O1xuXG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2xvYWQgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG5cbiAgICAgICAgdGhpcy5sb2FkID0gdGhpcy5fbG9hZC5hc09ic2VydmFibGUoKSBhcyBPYnNlcnZhYmxlPEV2ZW50PjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5fbG9hZC5uZXh0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5leHRFbGVtZW50U2libGluZyhlbGVtZW50OiBhbnkpOiBFbGVtZW50IHtcbiAgICAgICAgdmFyIG5leHQgPSBlbGVtZW50O1xuICAgICAgICB3aGlsZSAobmV4dCA9IG5leHQubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGlmIChuZXh0Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuIl19