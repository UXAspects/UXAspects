/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SidePanelService } from './side-panel.service';
export class SidePanelComponent {
    /**
     * @param {?} service
     * @param {?} _elementRef
     */
    constructor(service, _elementRef) {
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
    /**
     * @return {?}
     */
    get open() {
        return this.service.open$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        this.service.open$.next(value);
    }
    /**
     * @return {?}
     */
    get position() {
        if (this.inline) {
            return 'static';
        }
        if (this.attachTo === 'container') {
            return 'absolute';
        }
        return 'fixed';
    }
    /**
     * @return {?}
     */
    get cssWidth() {
        if (typeof this.width === 'number') {
            return this.width === 0 ? '0' : this.width + 'px';
        }
        return this.width;
    }
    /**
     * @return {?}
     */
    get cssTop() {
        if (typeof this.top === 'number') {
            return this.top === 0 ? '0' : this.top + 'px';
        }
        return this.top;
    }
    /**
     * @return {?}
     */
    get componentWidth() {
        if (this.inline) {
            return this.open ? this.cssWidth : '0';
        }
        return null;
    }
    /**
     * @return {?}
     */
    get hostWidth() {
        return this.inline ? '100%' : this.cssWidth;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.service.open$.pipe(takeUntil(this._onDestroy)).subscribe(isOpen => this.openChange.emit(isOpen));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    openPanel() {
        this.service.open();
    }
    /**
     * @return {?}
     */
    closePanel() {
        this.service.close();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }
        const /** @type {?} */ target = /** @type {?} */ (event.target);
        if (!this._elementRef.nativeElement.contains(target) ||
            (target && target.classList.contains('modal-backdrop'))) {
            this.closePanel();
        }
    }
}
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
SidePanelComponent.ctorParameters = () => [
    { type: SidePanelService },
    { type: ElementRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqSSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQVd4RCxNQUFNOzs7OztJQWdGRixZQUNjLE9BQXlCLEVBQzNCO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXO3NCQXBFZCxLQUFLO3dCQUdxQixRQUFRO3FCQUdsQixLQUFLO21CQUdQLEdBQUc7cUJBSWxCLEtBQUs7dUJBSUgsS0FBSztvQ0FHUSxLQUFLOzJCQUdMLEtBQUs7MEJBR2YsSUFBSSxZQUFZLEVBQVc7MEJBc0NqQixJQUFJLE9BQU8sRUFBUTtLQUtyQzs7OztJQWpGTCxJQUVJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ25DOzs7OztJQUVELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBZ0NELElBQUksUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLFFBQVEs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SUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRSxlQUFlO2lCQUMzQjthQUNKOzs7O1lBVlEsZ0JBQWdCO1lBSEwsVUFBVTs7O21CQWdCekIsS0FBSyxZQUNMLFdBQVcsU0FBQyxZQUFZO3FCQVN4QixLQUFLLFlBQ0wsV0FBVyxTQUFDLGNBQWM7dUJBRzFCLEtBQUs7b0JBR0wsS0FBSztrQkFHTCxLQUFLO29CQUdMLEtBQUssWUFDTCxXQUFXLFNBQUMsaUJBQWlCO3NCQUc3QixLQUFLLFlBQ0wsV0FBVyxTQUFDLGVBQWU7bUNBRzNCLEtBQUs7MEJBR0wsS0FBSzt5QkFHTCxNQUFNOzZCQTJCTixXQUFXLFNBQUMsYUFBYTt5QkFnQ3pCLFlBQVksU0FBQyx1QkFBdUI7MkJBS3BDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTaWRlUGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlLXBhbmVsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNpZGUtcGFuZWwnLFxuICAgIGV4cG9ydEFzOiAndXgtc2lkZS1wYW5lbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdzaWRlLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtTaWRlUGFuZWxTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICd1eC1zaWRlLXBhbmVsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICAgIGdldCBvcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLm9wZW4kLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBvcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5vcGVuJC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaW5saW5lJylcbiAgICBpbmxpbmUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgYXR0YWNoVG86ICd3aW5kb3cnIHwgJ2NvbnRhaW5lcicgPSAnd2luZG93JztcblxuICAgIEBJbnB1dCgpXG4gICAgd2lkdGg6IHN0cmluZyB8IG51bWJlciA9ICc1MCUnO1xuXG4gICAgQElucHV0KClcbiAgICB0b3A6IHN0cmluZyB8IG51bWJlciA9ICcwJztcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbW9kYWwnKVxuICAgIG1vZGFsID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZScpXG4gICAgYW5pbWF0ZSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uRXh0ZXJuYWxDbGljayA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBmb2N1c09uU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXRpYyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNoVG8gPT09ICdjb250YWluZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2ZpeGVkJztcbiAgICB9XG5cbiAgICBnZXQgY3NzV2lkdGgoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggPT09IDAgPyAnMCcgOiB0aGlzLndpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBnZXQgY3NzVG9wKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy50b3AgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgPT09IDAgPyAnMCcgOiB0aGlzLnRvcCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9wO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICAgIGdldCBjb21wb25lbnRXaWR0aCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW4gPyB0aGlzLmNzc1dpZHRoIDogJzAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldCBob3N0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlubGluZSA/ICcxMDAlJyA6IHRoaXMuY3NzV2lkdGg7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzZXJ2aWNlOiBTaWRlUGFuZWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbiQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGlzT3BlbiA9PiB0aGlzLm9wZW5DaGFuZ2UuZW1pdChpc09wZW4pKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgb3BlblBhbmVsKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbigpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXVwLmVzY2FwZScpXG4gICAgY2xvc2VQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMub3BlbiB8fCAhdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljaykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkgfHxcbiAgICAgICAgICAgICh0YXJnZXQgJiYgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtYmFja2Ryb3AnKSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==