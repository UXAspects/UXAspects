/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, Output } from '@angular/core';
import { ColorService } from '../../services/color/color.service';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';
import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';
var ToolbarSearchComponent = (function () {
    function ToolbarSearchComponent(_elementRef, _colorService, _document) {
        this._elementRef = _elementRef;
        this._colorService = _colorService;
        this._document = _document;
        this.direction = 'right';
        this.inverse = false;
        this.expandedChange = new EventEmitter();
        this.search = new EventEmitter();
        this._expanded = false;
        this.position = 'relative';
        this.backgroundColor = 'transparent';
    }
    Object.defineProperty(ToolbarSearchComponent.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._expanded = value;
            this.expandedChange.emit(value);
            if (value) {
                // Set focus on the input when expanded
                this.field.focus();
            }
            else {
                // Clear text when contracted
                this.field.clear();
                // Remove focus (works around an IE issue where the caret remains visible)
                this.field.blur();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarSearchComponent.prototype, "background", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.backgroundColor = this._colorService.resolve(value) || 'transparent';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarSearchComponent.prototype, "expandedAnimation", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                value: this.expanded ? 'expanded' : 'collapsed',
                params: {
                    initialWidth: this.button.width + 'px'
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToolbarSearchComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Subscribe to the submit event on the input field, triggering the search event
        this.field.submit.subscribe(function (text) { return _this.search.emit(text); });
        // Subscribe to cancel events coming from the input field
        this.field.cancel.subscribe(function () { return _this.expanded = false; });
        // Subscribe to the button click event
        this.button.clicked.subscribe(function () {
            if (_this.expanded && _this.field.text) {
                _this.search.emit(_this.field.text);
            }
            else {
                _this.expanded = !_this.expanded;
            }
        });
        // Create placeholder element to avoid changing layout when switching to position: absolute
        this.createPlaceholder();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToolbarSearchComponent.prototype.animationStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'expanded') {
            this.position = 'absolute';
            this.enablePlaceholder(true);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ToolbarSearchComponent.prototype.animationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.toState === 'collapsed') {
            this.position = 'relative';
            this.enablePlaceholder(false);
        }
    };
    /**
     * @return {?}
     */
    ToolbarSearchComponent.prototype.createPlaceholder = /**
     * @return {?}
     */
    function () {
        // Get width and height of the component
        var /** @type {?} */ styles = getComputedStyle(this._elementRef.nativeElement);
        // Create invisible div with the same dimensions
        this._placeholder = this._document.createElement('div');
        this._placeholder.style.display = 'none';
        this._placeholder.style.width = this.button.width + 'px';
        this._placeholder.style.height = styles.height;
        this._placeholder.style.visibility = 'hidden';
        // Add as a sibling
        this._elementRef.nativeElement.parentNode.insertBefore(this._placeholder, this._elementRef.nativeElement);
    };
    /**
     * @param {?} enabled
     * @return {?}
     */
    ToolbarSearchComponent.prototype.enablePlaceholder = /**
     * @param {?} enabled
     * @return {?}
     */
    function (enabled) {
        this._placeholder.style.display = (enabled ? 'inline-block' : 'none');
    };
    ToolbarSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-toolbar-search',
                    template: "<ng-content></ng-content>",
                    animations: [
                        trigger('expanded', [
                            state('collapsed', style({
                                width: '{{initialWidth}}'
                            }), {
                                params: { initialWidth: '30px' }
                            }),
                            state('expanded', style({
                                width: '100%'
                            })),
                            transition('collapsed <=> expanded', [animate('0.3s ease-out')])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    ToolbarSearchComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: ColorService, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    ToolbarSearchComponent.propDecorators = {
        "expanded": [{ type: HostBinding, args: ['class.expanded',] }, { type: Input },],
        "direction": [{ type: Input }, { type: HostBinding, args: ['class',] },],
        "inverse": [{ type: Input }, { type: HostBinding, args: ['class.inverse',] },],
        "background": [{ type: Input },],
        "expandedChange": [{ type: Output },],
        "search": [{ type: Output },],
        "expandedAnimation": [{ type: HostBinding, args: ['@expanded',] },],
        "position": [{ type: HostBinding, args: ['style.position',] },],
        "backgroundColor": [{ type: HostBinding, args: ['style.background-color',] },],
        "field": [{ type: ContentChild, args: [ToolbarSearchFieldDirective,] },],
        "button": [{ type: ContentChild, args: [ToolbarSearchButtonDirective,] },],
        "animationStart": [{ type: HostListener, args: ['@expanded.start', ['$event'],] },],
        "animationDone": [{ type: HostListener, args: ['@expanded.done', ['$event'],] },],
    };
    return ToolbarSearchComponent;
}());
export { ToolbarSearchComponent };
function ToolbarSearchComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ToolbarSearchComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ToolbarSearchComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ToolbarSearchComponent.propDecorators;
    /** @type {?} */
    ToolbarSearchComponent.prototype.direction;
    /** @type {?} */
    ToolbarSearchComponent.prototype.inverse;
    /** @type {?} */
    ToolbarSearchComponent.prototype.expandedChange;
    /** @type {?} */
    ToolbarSearchComponent.prototype.search;
    /** @type {?} */
    ToolbarSearchComponent.prototype._expanded;
    /** @type {?} */
    ToolbarSearchComponent.prototype.position;
    /** @type {?} */
    ToolbarSearchComponent.prototype.backgroundColor;
    /** @type {?} */
    ToolbarSearchComponent.prototype.field;
    /** @type {?} */
    ToolbarSearchComponent.prototype.button;
    /** @type {?} */
    ToolbarSearchComponent.prototype._placeholder;
    /** @type {?} */
    ToolbarSearchComponent.prototype._elementRef;
    /** @type {?} */
    ToolbarSearchComponent.prototype._colorService;
    /** @type {?} */
    ToolbarSearchComponent.prototype._document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFvQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBMEYzRSxnQ0FDWSxhQUNBLGVBQ2tCO1FBRmxCLGdCQUFXLEdBQVgsV0FBVztRQUNYLGtCQUFhLEdBQWIsYUFBYTtRQUNLLGNBQVMsR0FBVCxTQUFTO3lCQXZDVCxPQUFPO3VCQUkzQixLQUFLOzhCQVFFLElBQUksWUFBWSxFQUFXO3NCQUduQyxJQUFJLFlBQVksRUFBVTt5QkFFTixLQUFLO3dCQVlRLFVBQVU7K0JBQ0ssYUFBYTtLQVVyRTswQkEvREcsNENBQVE7Ozs7O1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7OztRQUcxQixVQUFhLEtBQWM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJ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LE1BQU07MkJBR04sTUFBTTtzQ0FLTixXQUFXLFNBQUMsV0FBVzs2QkFVdkIsV0FBVyxTQUFDLGdCQUFnQjtvQ0FDNUIsV0FBVyxTQUFDLHdCQUF3QjswQkFDcEMsWUFBWSxTQUFDLDJCQUEyQjsyQkFDeEMsWUFBWSxTQUFDLDRCQUE0QjttQ0E4QnpDLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQztrQ0FRMUMsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOztpQ0FqSTlDOztTQWdDYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25FdmVudCwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2NvbG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9vbGJhclNlYXJjaEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbGJhci1zZWFyY2gtYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VhcmNoRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2xiYXItc2VhcmNoLWZpZWxkLmRpcmVjdGl2ZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC10b29sYmFyLXNlYXJjaCcsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2V4cGFuZGVkJywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ2NvbGxhcHNlZCcsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ3t7aW5pdGlhbFdpZHRofX0nXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHsgaW5pdGlhbFdpZHRoOiAnMzBweCcgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnZXhwYW5kZWQnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignY29sbGFwc2VkIDw9PiBleHBhbmRlZCcsIFthbmltYXRlKCcwLjNzIGVhc2Utb3V0JyldKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5leHBhbmRlZCcpXG4gICAgQElucHV0KClcbiAgICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgICB9XG5cbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU2V0IGZvY3VzIG9uIHRoZSBpbnB1dCB3aGVuIGV4cGFuZGVkXG4gICAgICAgICAgICB0aGlzLmZpZWxkLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDbGVhciB0ZXh0IHdoZW4gY29udHJhY3RlZFxuICAgICAgICAgICAgdGhpcy5maWVsZC5jbGVhcigpO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgZm9jdXMgKHdvcmtzIGFyb3VuZCBhbiBJRSBpc3N1ZSB3aGVyZSB0aGUgY2FyZXQgcmVtYWlucyB2aXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5maWVsZC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICAgIGRpcmVjdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdyaWdodCc7XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaW52ZXJzZScpXG4gICAgaW52ZXJzZSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgYmFja2dyb3VuZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUodmFsdWUpIHx8ICd0cmFuc3BhcmVudCc7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ0BleHBhbmRlZCcpXG4gICAgZ2V0IGV4cGFuZGVkQW5pbWF0aW9uKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5leHBhbmRlZCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxXaWR0aDogdGhpcy5idXR0b24ud2lkdGggKyAncHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wb3NpdGlvbicpIHBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJhY2tncm91bmQtY29sb3InKSBiYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIEBDb250ZW50Q2hpbGQoVG9vbGJhclNlYXJjaEZpZWxkRGlyZWN0aXZlKSBmaWVsZDogVG9vbGJhclNlYXJjaEZpZWxkRGlyZWN0aXZlO1xuICAgIEBDb250ZW50Q2hpbGQoVG9vbGJhclNlYXJjaEJ1dHRvbkRpcmVjdGl2ZSkgYnV0dG9uOiBUb29sYmFyU2VhcmNoQnV0dG9uRGlyZWN0aXZlO1xuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIHN1Ym1pdCBldmVudCBvbiB0aGUgaW5wdXQgZmllbGQsIHRyaWdnZXJpbmcgdGhlIHNlYXJjaCBldmVudFxuICAgICAgICB0aGlzLmZpZWxkLnN1Ym1pdC5zdWJzY3JpYmUoKHRleHQ6IHN0cmluZykgPT4gdGhpcy5zZWFyY2guZW1pdCh0ZXh0KSk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNhbmNlbCBldmVudHMgY29taW5nIGZyb20gdGhlIGlucHV0IGZpZWxkXG4gICAgICAgIHRoaXMuZmllbGQuY2FuY2VsLnN1YnNjcmliZSgoKSA9PiB0aGlzLmV4cGFuZGVkID0gZmFsc2UpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAgICAgIHRoaXMuYnV0dG9uLmNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGFuZGVkICYmIHRoaXMuZmllbGQudGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoLmVtaXQodGhpcy5maWVsZC50ZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgcGxhY2Vob2xkZXIgZWxlbWVudCB0byBhdm9pZCBjaGFuZ2luZyBsYXlvdXQgd2hlbiBzd2l0Y2hpbmcgdG8gcG9zaXRpb246IGFic29sdXRlXG4gICAgICAgIHRoaXMuY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdAZXhwYW5kZWQuc3RhcnQnLCBbJyRldmVudCddKVxuICAgIGFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2V4cGFuZGVkJykge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignQGV4cGFuZGVkLmRvbmUnLCBbJyRldmVudCddKVxuICAgIGFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnY29sbGFwc2VkJykge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIC8vIEdldCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnRcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBpbnZpc2libGUgZGl2IHdpdGggdGhlIHNhbWUgZGltZW5zaW9uc1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS53aWR0aCA9IHRoaXMuYnV0dG9uLndpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc3R5bGUuaGVpZ2h0ID0gc3R5bGVzLmhlaWdodDtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgIC8vIEFkZCBhcyBhIHNpYmxpbmdcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3BsYWNlaG9sZGVyLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5hYmxlUGxhY2Vob2xkZXIoZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gKGVuYWJsZWQgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJyk7XG4gICAgfVxufVxuIl19