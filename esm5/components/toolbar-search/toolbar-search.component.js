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
var ToolbarSearchComponent = /** @class */ (function () {
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
                }] }
    ];
    /** @nocollapse */
    ToolbarSearchComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ColorService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ToolbarSearchComponent.propDecorators = {
        expanded: [{ type: HostBinding, args: ['class.expanded',] }, { type: Input }],
        direction: [{ type: Input }, { type: HostBinding, args: ['class',] }],
        inverse: [{ type: Input }, { type: HostBinding, args: ['class.inverse',] }],
        background: [{ type: Input }],
        expandedChange: [{ type: Output }],
        search: [{ type: Output }],
        expandedAnimation: [{ type: HostBinding, args: ['@expanded',] }],
        position: [{ type: HostBinding, args: ['style.position',] }],
        backgroundColor: [{ type: HostBinding, args: ['style.background-color',] }],
        field: [{ type: ContentChild, args: [ToolbarSearchFieldDirective,] }],
        button: [{ type: ContentChild, args: [ToolbarSearchButtonDirective,] }],
        animationStart: [{ type: HostListener, args: ['@expanded.start', ['$event'],] }],
        animationDone: [{ type: HostListener, args: ['@expanded.done', ['$event'],] }]
    };
    return ToolbarSearchComponent;
}());
export { ToolbarSearchComponent };
function ToolbarSearchComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFvQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBMEYzRSxnQ0FDWSxhQUNBLGVBQ2tCLFNBQWM7UUFGaEMsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsa0JBQWEsR0FBYixhQUFhO1FBQ0ssY0FBUyxHQUFULFNBQVMsQ0FBSzt5QkF2Q2QsT0FBTzt1QkFJM0IsS0FBSzs4QkFRRSxJQUFJLFlBQVksRUFBVztzQkFHbkMsSUFBSSxZQUFZLEVBQVU7eUJBRU4sS0FBSzt3QkFZUSxVQUFVOytCQUNLLGFBQWE7S0FVckU7SUFqRUQsc0JBRUksNENBQVE7Ozs7UUFGWjtZQUdJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCOzs7OztRQUVELFVBQWEsS0FBYztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV2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Ozs7MkJBaEVuQixXQUFXLFNBQUMsZ0JBQWdCLGNBQzVCLEtBQUs7NEJBc0JMLEtBQUssWUFDTCxXQUFXLFNBQUMsT0FBTzswQkFHbkIsS0FBSyxZQUNMLFdBQVcsU0FBQyxlQUFlOzZCQUczQixLQUFLO2lDQUtMLE1BQU07eUJBR04sTUFBTTtvQ0FLTixXQUFXLFNBQUMsV0FBVzsyQkFVdkIsV0FBVyxTQUFDLGdCQUFnQjtrQ0FDNUIsV0FBVyxTQUFDLHdCQUF3Qjt3QkFDcEMsWUFBWSxTQUFDLDJCQUEyQjt5QkFDeEMsWUFBWSxTQUFDLDRCQUE0QjtpQ0E4QnpDLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQ0FRMUMsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOztpQ0FqSTlDOztTQWdDYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBBbmltYXRpb25FdmVudCwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2NvbG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9vbGJhclNlYXJjaEJ1dHRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbGJhci1zZWFyY2gtYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VhcmNoRmllbGREaXJlY3RpdmUgfSBmcm9tICcuL3Rvb2xiYXItc2VhcmNoLWZpZWxkLmRpcmVjdGl2ZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC10b29sYmFyLXNlYXJjaCcsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2V4cGFuZGVkJywgW1xuICAgICAgICAgICAgc3RhdGUoXG4gICAgICAgICAgICAgICAgJ2NvbGxhcHNlZCcsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ3t7aW5pdGlhbFdpZHRofX0nXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHsgaW5pdGlhbFdpZHRoOiAnMzBweCcgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnZXhwYW5kZWQnLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignY29sbGFwc2VkIDw9PiBleHBhbmRlZCcsIFthbmltYXRlKCcwLjNzIGVhc2Utb3V0JyldKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhclNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5leHBhbmRlZCcpXG4gICAgQElucHV0KClcbiAgICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgICB9XG5cbiAgICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgLy8gU2V0IGZvY3VzIG9uIHRoZSBpbnB1dCB3aGVuIGV4cGFuZGVkXG4gICAgICAgICAgICB0aGlzLmZpZWxkLmZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDbGVhciB0ZXh0IHdoZW4gY29udHJhY3RlZFxuICAgICAgICAgICAgdGhpcy5maWVsZC5jbGVhcigpO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgZm9jdXMgKHdvcmtzIGFyb3VuZCBhbiBJRSBpc3N1ZSB3aGVyZSB0aGUgY2FyZXQgcmVtYWlucyB2aXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5maWVsZC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICAgIGRpcmVjdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdyaWdodCc7XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaW52ZXJzZScpXG4gICAgaW52ZXJzZSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgYmFja2dyb3VuZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gdGhpcy5fY29sb3JTZXJ2aWNlLnJlc29sdmUodmFsdWUpIHx8ICd0cmFuc3BhcmVudCc7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBzZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ0BleHBhbmRlZCcpXG4gICAgZ2V0IGV4cGFuZGVkQW5pbWF0aW9uKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5leHBhbmRlZCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJyxcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxXaWR0aDogdGhpcy5idXR0b24ud2lkdGggKyAncHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wb3NpdGlvbicpIHBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJhY2tncm91bmQtY29sb3InKSBiYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIEBDb250ZW50Q2hpbGQoVG9vbGJhclNlYXJjaEZpZWxkRGlyZWN0aXZlKSBmaWVsZDogVG9vbGJhclNlYXJjaEZpZWxkRGlyZWN0aXZlO1xuICAgIEBDb250ZW50Q2hpbGQoVG9vbGJhclNlYXJjaEJ1dHRvbkRpcmVjdGl2ZSkgYnV0dG9uOiBUb29sYmFyU2VhcmNoQnV0dG9uRGlyZWN0aXZlO1xuXG4gICAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2NvbG9yU2VydmljZTogQ29sb3JTZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55KSB7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIHN1Ym1pdCBldmVudCBvbiB0aGUgaW5wdXQgZmllbGQsIHRyaWdnZXJpbmcgdGhlIHNlYXJjaCBldmVudFxuICAgICAgICB0aGlzLmZpZWxkLnN1Ym1pdC5zdWJzY3JpYmUoKHRleHQ6IHN0cmluZykgPT4gdGhpcy5zZWFyY2guZW1pdCh0ZXh0KSk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIGNhbmNlbCBldmVudHMgY29taW5nIGZyb20gdGhlIGlucHV0IGZpZWxkXG4gICAgICAgIHRoaXMuZmllbGQuY2FuY2VsLnN1YnNjcmliZSgoKSA9PiB0aGlzLmV4cGFuZGVkID0gZmFsc2UpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgYnV0dG9uIGNsaWNrIGV2ZW50XG4gICAgICAgIHRoaXMuYnV0dG9uLmNsaWNrZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGFuZGVkICYmIHRoaXMuZmllbGQudGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoLmVtaXQodGhpcy5maWVsZC50ZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgcGxhY2Vob2xkZXIgZWxlbWVudCB0byBhdm9pZCBjaGFuZ2luZyBsYXlvdXQgd2hlbiBzd2l0Y2hpbmcgdG8gcG9zaXRpb246IGFic29sdXRlXG4gICAgICAgIHRoaXMuY3JlYXRlUGxhY2Vob2xkZXIoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdAZXhwYW5kZWQuc3RhcnQnLCBbJyRldmVudCddKVxuICAgIGFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2V4cGFuZGVkJykge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignQGV4cGFuZGVkLmRvbmUnLCBbJyRldmVudCddKVxuICAgIGFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnY29sbGFwc2VkJykge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIC8vIEdldCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnRcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBpbnZpc2libGUgZGl2IHdpdGggdGhlIHNhbWUgZGltZW5zaW9uc1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS53aWR0aCA9IHRoaXMuYnV0dG9uLndpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc3R5bGUuaGVpZ2h0ID0gc3R5bGVzLmhlaWdodDtcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgIC8vIEFkZCBhcyBhIHNpYmxpbmdcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3BsYWNlaG9sZGVyLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZW5hYmxlUGxhY2Vob2xkZXIoZW5hYmxlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gKGVuYWJsZWQgPyAnaW5saW5lLWJsb2NrJyA6ICdub25lJyk7XG4gICAgfVxufVxuIl19