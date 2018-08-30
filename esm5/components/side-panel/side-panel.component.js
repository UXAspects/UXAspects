/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SidePanelService } from './side-panel.service';
var SidePanelComponent = /** @class */ (function () {
    function SidePanelComponent(service, _elementRef) {
        this.service = service;
        this._elementRef = _elementRef;
        this.inline = false;
        this.attachTo = 'window';
        this.width = '50%';
        this.top = '0';
        this.modal = false;
        this.animate = false;
        this.closeOnExternalClick = false;
        this.focusOnShow = false;
        this.openChange = new EventEmitter();
        this._onDestroy = new Subject();
    }
    Object.defineProperty(SidePanelComponent.prototype, "open", {
        get: /**
         * @return {?}
         */
        function () {
            return this.service.open$.value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.service.open$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.inline) {
                return 'static';
            }
            if (this.attachTo === 'container') {
                return 'absolute';
            }
            return 'fixed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "cssWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (typeof this.width === 'number') {
                return this.width === 0 ? '0' : this.width + 'px';
            }
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "cssTop", {
        get: /**
         * @return {?}
         */
        function () {
            if (typeof this.top === 'number') {
                return this.top === 0 ? '0' : this.top + 'px';
            }
            return this.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "componentWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.inline) {
                return this.open ? this.cssWidth : '0';
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidePanelComponent.prototype, "hostWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inline ? '100%' : this.cssWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.service.open$.pipe(takeUntil(this._onDestroy)).subscribe(function (isOpen) { return _this.openChange.emit(isOpen); });
    };
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.openPanel = /**
     * @return {?}
     */
    function () {
        this.service.open();
    };
    /**
     * @return {?}
     */
    SidePanelComponent.prototype.closePanel = /**
     * @return {?}
     */
    function () {
        this.service.close();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SidePanelComponent.prototype.clickHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }
        var /** @type {?} */ target = /** @type {?} */ (event.target);
        if (!this._elementRef.nativeElement.contains(target) ||
            (target && target.classList.contains('modal-backdrop'))) {
            this.closePanel();
        }
    };
    SidePanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-side-panel',
                    exportAs: 'ux-side-panel',
                    template: "<div *ngIf=\"modal && open\" class=\"modal-backdrop\"\n    [style.position]=\"position\"\n    [style.top]=\"cssTop\"></div>\n\n<div class=\"ux-side-panel-host\"\n    [class.modal-panel]=\"modal\"\n    [style.position]=\"position\"\n    [style.width]=\"hostWidth\"\n    [style.top]=\"cssTop\"\n    [tabindex]=\"open ? 0 : -1\"\n    [focusIf]=\"open && focusOnShow\"\n    [focusIfScroll]=\"false\"\n    [cdkTrapFocus]=\"open && modal\">\n    <ng-content></ng-content>\n</div>\n",
                    providers: [SidePanelService],
                    host: {
                        'class': 'ux-side-panel'
                    }
                }] }
    ];
    /** @nocollapse */
    SidePanelComponent.ctorParameters = function () { return [
        { type: SidePanelService },
        { type: ElementRef }
    ]; };
    SidePanelComponent.propDecorators = {
        open: [{ type: Input }, { type: HostBinding, args: ['class.open',] }],
        inline: [{ type: Input }, { type: HostBinding, args: ['class.inline',] }],
        attachTo: [{ type: Input }],
        width: [{ type: Input }],
        top: [{ type: Input }],
        modal: [{ type: Input }, { type: HostBinding, args: ['attr.aria-modal',] }],
        animate: [{ type: Input }, { type: HostBinding, args: ['class.animate',] }],
        closeOnExternalClick: [{ type: Input }],
        focusOnShow: [{ type: Input }],
        openChange: [{ type: Output }],
        componentWidth: [{ type: HostBinding, args: ['style.width',] }],
        closePanel: [{ type: HostListener, args: ['document:keyup.escape',] }],
        clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return SidePanelComponent;
}());
export { SidePanelComponent };
function SidePanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SidePanelComponent.prototype.inline;
    /** @type {?} */
    SidePanelComponent.prototype.attachTo;
    /** @type {?} */
    SidePanelComponent.prototype.width;
    /** @type {?} */
    SidePanelComponent.prototype.top;
    /** @type {?} */
    SidePanelComponent.prototype.modal;
    /** @type {?} */
    SidePanelComponent.prototype.animate;
    /** @type {?} */
    SidePanelComponent.prototype.closeOnExternalClick;
    /** @type {?} */
    SidePanelComponent.prototype.focusOnShow;
    /** @type {?} */
    SidePanelComponent.prototype.openChange;
    /** @type {?} */
    SidePanelComponent.prototype._onDestroy;
    /** @type {?} */
    SidePanelComponent.prototype.service;
    /** @type {?} */
    SidePanelComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUEyRnBELDRCQUNjLE9BQXlCLEVBQzNCO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXO3NCQXBFZCxLQUFLO3dCQUdxQixRQUFRO3FCQUdsQixLQUFLO21CQUdQLEdBQUc7cUJBSWxCLEtBQUs7dUJBSUgsS0FBSztvQ0FHUSxLQUFLOzJCQUdMLEtBQUs7MEJBR2YsSUFBSSxZQUFZLEVBQVc7MEJBc0NqQixJQUFJLE9BQU8sRUFBUTtLQUtyQztJQWpGTCxzQkFFSSxvQ0FBSTs7OztRQUZSO1lBR0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUNuQzs7Ozs7UUFFRCxVQUFTLEtBQWM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDOzs7T0FKQTtJQW9DRCxzQkFBSSx3Q0FBUTs7OztRQUFaO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLFFBQVEs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Q0FBQztTQUNyQjtLQUNKOztnQkE1SEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsZUFBZTtvQkFDekIsdWVBQXdDO29CQUN4QyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxlQUFlO3FCQUMzQjtpQkFDSjs7OztnQkFWUSxnQkFBZ0I7Z0JBSEwsVUFBVTs7O3VCQWdCekIsS0FBSyxZQUNMLFdBQVcsU0FBQyxZQUFZO3lCQVN4QixLQUFLLFlBQ0wsV0FBVyxTQUFDLGNBQWM7MkJBRzFCLEtBQUs7d0JBR0wsS0FBSztzQkFHTCxLQUFLO3dCQUdMLEtBQUssWUFDTCxXQUFXLFNBQUMsaUJBQWlCOzBCQUc3QixLQUFLLFlBQ0wsV0FBVyxTQUFDLGVBQWU7dUNBRzNCLEtBQUs7OEJBR0wsS0FBSzs2QkFHTCxNQUFNO2lDQTJCTixXQUFXLFNBQUMsYUFBYTs2QkFnQ3pCLFlBQVksU0FBQyx1QkFBdUI7K0JBS3BDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7NkJBckg5Qzs7U0FjYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4vc2lkZS1wYW5lbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zaWRlLXBhbmVsJyxcbiAgICBleHBvcnRBczogJ3V4LXNpZGUtcGFuZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnc2lkZS1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbU2lkZVBhbmVsU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndXgtc2lkZS1wYW5lbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNpZGVQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgICBnZXQgb3BlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5vcGVuJC52YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbiQubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmlubGluZScpXG4gICAgaW5saW5lID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGF0dGFjaFRvOiAnd2luZG93JyB8ICdjb250YWluZXInID0gJ3dpbmRvdyc7XG5cbiAgICBASW5wdXQoKVxuICAgIHdpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSAnNTAlJztcblxuICAgIEBJbnB1dCgpXG4gICAgdG9wOiBzdHJpbmcgfCBudW1iZXIgPSAnMCc7XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW1vZGFsJylcbiAgICBtb2RhbCA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFuaW1hdGUnKVxuICAgIGFuaW1hdGUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZm9jdXNPblNob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBnZXQgcG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICdzdGF0aWMnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dGFjaFRvID09PSAnY29udGFpbmVyJykge1xuICAgICAgICAgICAgcmV0dXJuICdhYnNvbHV0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdmaXhlZCc7XG4gICAgfVxuXG4gICAgZ2V0IGNzc1dpZHRoKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy53aWR0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndpZHRoID09PSAwID8gJzAnIDogdGhpcy53aWR0aCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgZ2V0IGNzc1RvcCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMudG9wID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9wID09PSAwID8gJzAnIDogdGhpcy50b3AgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvcDtcbiAgICB9XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgICBnZXQgY29tcG9uZW50V2lkdGgoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuID8gdGhpcy5jc3NXaWR0aCA6ICcwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgaG9zdFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmxpbmUgPyAnMTAwJScgOiB0aGlzLmNzc1dpZHRoO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgc2VydmljZTogU2lkZVBhbmVsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLm9wZW4kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShpc09wZW4gPT4gdGhpcy5vcGVuQ2hhbmdlLmVtaXQoaXNPcGVuKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG9wZW5QYW5lbCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLm9wZW4oKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXl1cC5lc2NhcGUnKVxuICAgIGNsb3NlUGFuZWwoKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wZW4gfHwgIXRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2spIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpIHx8XG4gICAgICAgICAgICAodGFyZ2V0ICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLWJhY2tkcm9wJykpKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=