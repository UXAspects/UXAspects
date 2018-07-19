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
export class ToolbarSearchComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _colorService
     * @param {?} _document
     */
    constructor(_elementRef, _colorService, _document) {
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
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set background(value) {
        this.backgroundColor = this._colorService.resolve(value) || 'transparent';
    }
    /**
     * @return {?}
     */
    get expandedAnimation() {
        return {
            value: this.expanded ? 'expanded' : 'collapsed',
            params: {
                initialWidth: this.button.width + 'px'
            }
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Subscribe to the submit event on the input field, triggering the search event
        this.field.submit.subscribe((text) => this.search.emit(text));
        // Subscribe to cancel events coming from the input field
        this.field.cancel.subscribe(() => this.expanded = false);
        // Subscribe to the button click event
        this.button.clicked.subscribe(() => {
            if (this.expanded && this.field.text) {
                this.search.emit(this.field.text);
            }
            else {
                this.expanded = !this.expanded;
            }
        });
        // Create placeholder element to avoid changing layout when switching to position: absolute
        this.createPlaceholder();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationStart(event) {
        if (event.toState === 'expanded') {
            this.position = 'absolute';
            this.enablePlaceholder(true);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationDone(event) {
        if (event.toState === 'collapsed') {
            this.position = 'relative';
            this.enablePlaceholder(false);
        }
    }
    /**
     * @return {?}
     */
    createPlaceholder() {
        // Get width and height of the component
        const /** @type {?} */ styles = getComputedStyle(this._elementRef.nativeElement);
        // Create invisible div with the same dimensions
        this._placeholder = this._document.createElement('div');
        this._placeholder.style.display = 'none';
        this._placeholder.style.width = this.button.width + 'px';
        this._placeholder.style.height = styles.height;
        this._placeholder.style.visibility = 'hidden';
        // Add as a sibling
        this._elementRef.nativeElement.parentNode.insertBefore(this._placeholder, this._elementRef.nativeElement);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    enablePlaceholder(enabled) {
        this._placeholder.style.display = (enabled ? 'inline-block' : 'none');
    }
}
ToolbarSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-toolbar-search',
                template: `<ng-content></ng-content>`,
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
ToolbarSearchComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ColorService, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdG9vbGJhci1zZWFyY2gvdG9vbGJhci1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFvQixTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0SixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUEyQi9FLE1BQU07Ozs7OztJQStERixZQUNZLGFBQ0EsZUFDa0I7UUFGbEIsZ0JBQVcsR0FBWCxXQUFXO1FBQ1gsa0JBQWEsR0FBYixhQUFhO1FBQ0ssY0FBUyxHQUFULFNBQVM7eUJBdkNULE9BQU87dUJBSTNCLEtBQUs7OEJBUUUsSUFBSSxZQUFZLEVBQVc7c0JBR25DLElBQUksWUFBWSxFQUFVO3lCQUVOLEtBQUs7d0JBWVEsVUFBVTsrQkFDSyxhQUFhO0tBVXJFOzs7O1FBL0RHLFFBQVE7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Ozs7O0lBRzFCLElBQUksUUFBUSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIs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QVcsU0FBQyx3QkFBd0I7c0JBQ3BDLFlBQVksU0FBQywyQkFBMkI7dUJBQ3hDLFlBQVksU0FBQyw0QkFBNEI7K0JBOEJ6QyxZQUFZLFNBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBUTFDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sb3IvY29sb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBUb29sYmFyU2VhcmNoQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi90b29sYmFyLXNlYXJjaC1idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IFRvb2xiYXJTZWFyY2hGaWVsZERpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbGJhci1zZWFyY2gtZmllbGQuZGlyZWN0aXZlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXRvb2xiYXItc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZXhwYW5kZWQnLCBbXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnY29sbGFwc2VkJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAne3tpbml0aWFsV2lkdGh9fSdcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogeyBpbml0aWFsV2lkdGg6ICczMHB4JyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXRlKFxuICAgICAgICAgICAgICAgICdleHBhbmRlZCcsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdjb2xsYXBzZWQgPD0+IGV4cGFuZGVkJywgW2FuaW1hdGUoJzAuM3MgZWFzZS1vdXQnKV0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUb29sYmFyU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmV4cGFuZGVkJylcbiAgICBASW5wdXQoKVxuICAgIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xuICAgIH1cblxuICAgIHNldCBleHBhbmRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9leHBhbmRlZCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBTZXQgZm9jdXMgb24gdGhlIGlucHV0IHdoZW4gZXhwYW5kZWRcbiAgICAgICAgICAgIHRoaXMuZmllbGQuZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENsZWFyIHRleHQgd2hlbiBjb250cmFjdGVkXG4gICAgICAgICAgICB0aGlzLmZpZWxkLmNsZWFyKCk7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBmb2N1cyAod29ya3MgYXJvdW5kIGFuIElFIGlzc3VlIHdoZXJlIHRoZSBjYXJldCByZW1haW5zIHZpc2libGUpXG4gICAgICAgICAgICB0aGlzLmZpZWxkLmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgZGlyZWN0aW9uOiAnbGVmdCcgfCAncmlnaHQnID0gJ3JpZ2h0JztcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbnZlcnNlJylcbiAgICBpbnZlcnNlID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBiYWNrZ3JvdW5kKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLl9jb2xvclNlcnZpY2UucmVzb2x2ZSh2YWx1ZSkgfHwgJ3RyYW5zcGFyZW50JztcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBIb3N0QmluZGluZygnQGV4cGFuZGVkJylcbiAgICBnZXQgZXhwYW5kZWRBbmltYXRpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmV4cGFuZGVkID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnLFxuICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbFdpZHRoOiB0aGlzLmJ1dHRvbi53aWR0aCArICdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBvc2l0aW9uJykgcG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUuYmFja2dyb3VuZC1jb2xvcicpIGJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgQENvbnRlbnRDaGlsZChUb29sYmFyU2VhcmNoRmllbGREaXJlY3RpdmUpIGZpZWxkOiBUb29sYmFyU2VhcmNoRmllbGREaXJlY3RpdmU7XG4gICAgQENvbnRlbnRDaGlsZChUb29sYmFyU2VhcmNoQnV0dG9uRGlyZWN0aXZlKSBidXR0b246IFRvb2xiYXJTZWFyY2hCdXR0b25EaXJlY3RpdmU7XG5cbiAgICBwcml2YXRlIF9wbGFjZWhvbGRlcjogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgc3VibWl0IGV2ZW50IG9uIHRoZSBpbnB1dCBmaWVsZCwgdHJpZ2dlcmluZyB0aGUgc2VhcmNoIGV2ZW50XG4gICAgICAgIHRoaXMuZmllbGQuc3VibWl0LnN1YnNjcmliZSgodGV4dDogc3RyaW5nKSA9PiB0aGlzLnNlYXJjaC5lbWl0KHRleHQpKTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY2FuY2VsIGV2ZW50cyBjb21pbmcgZnJvbSB0aGUgaW5wdXQgZmllbGRcbiAgICAgICAgdGhpcy5maWVsZC5jYW5jZWwuc3Vic2NyaWJlKCgpID0+IHRoaXMuZXhwYW5kZWQgPSBmYWxzZSk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIHRoZSBidXR0b24gY2xpY2sgZXZlbnRcbiAgICAgICAgdGhpcy5idXR0b24uY2xpY2tlZC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQgJiYgdGhpcy5maWVsZC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2guZW1pdCh0aGlzLmZpZWxkLnRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBwbGFjZWhvbGRlciBlbGVtZW50IHRvIGF2b2lkIGNoYW5naW5nIGxheW91dCB3aGVuIHN3aXRjaGluZyB0byBwb3NpdGlvbjogYWJzb2x1dGVcbiAgICAgICAgdGhpcy5jcmVhdGVQbGFjZWhvbGRlcigpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ0BleHBhbmRlZC5zdGFydCcsIFsnJGV2ZW50J10pXG4gICAgYW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50b1N0YXRlID09PSAnZXhwYW5kZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUGxhY2Vob2xkZXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdAZXhwYW5kZWQuZG9uZScsIFsnJGV2ZW50J10pXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdjb2xsYXBzZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUGxhY2Vob2xkZXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQbGFjZWhvbGRlcigpIHtcbiAgICAgICAgLy8gR2V0IHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudFxuICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGludmlzaWJsZSBkaXYgd2l0aCB0aGUgc2FtZSBkaW1lbnNpb25zXG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLnN0eWxlLndpZHRoID0gdGhpcy5idXR0b24ud2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS5oZWlnaHQgPSBzdHlsZXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgICAgLy8gQWRkIGFzIGEgc2libGluZ1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5fcGxhY2Vob2xkZXIsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmFibGVQbGFjZWhvbGRlcihlbmFibGVkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAoZW5hYmxlZCA/ICdpbmxpbmUtYmxvY2snIDogJ25vbmUnKTtcbiAgICB9XG59XG4iXX0=