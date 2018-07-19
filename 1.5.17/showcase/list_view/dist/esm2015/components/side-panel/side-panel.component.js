/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';
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
        this.openChange = new EventEmitter();
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
        this._subscription = this.service.open$.subscribe((next) => {
            this.openChange.emit(next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
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
                template: `<div *ngIf="modal && open" class="modal-backdrop"
    [style.position]="position"
    [style.top]="cssTop"></div>

<div class="ux-side-panel-host"
    [class.modal-panel]="modal"
    [style.position]="position"
    [style.width]="hostWidth"
    [style.top]="cssTop">
    <ng-content></ng-content>
</div>
`,
                providers: [SidePanelService],
                host: {
                    'class': 'ux-side-panel'
                }
            },] },
];
/** @nocollapse */
SidePanelComponent.ctorParameters = () => [
    { type: SidePanelService, },
    { type: ElementRef, },
];
SidePanelComponent.propDecorators = {
    "open": [{ type: Input }, { type: HostBinding, args: ['class.open',] },],
    "inline": [{ type: Input }, { type: HostBinding, args: ['class.inline',] },],
    "attachTo": [{ type: Input },],
    "width": [{ type: Input },],
    "top": [{ type: Input },],
    "modal": [{ type: Input }, { type: HostBinding, args: ['attr.aria-modal',] },],
    "animate": [{ type: Input }, { type: HostBinding, args: ['class.animate',] },],
    "closeOnExternalClick": [{ type: Input },],
    "openChange": [{ type: Output },],
    "componentWidth": [{ type: HostBinding, args: ['style.width',] },],
    "closePanel": [{ type: HostListener, args: ['document:keyup.escape',] },],
    "clickHandler": [{ type: HostListener, args: ['document:click', ['$event'],] },],
};
function SidePanelComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SidePanelComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SidePanelComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SidePanelComponent.propDecorators;
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
    SidePanelComponent.prototype.openChange;
    /** @type {?} */
    SidePanelComponent.prototype._subscription;
    /** @type {?} */
    SidePanelComponent.prototype.service;
    /** @type {?} */
    SidePanelComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLFdBQVcsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBc0J4RCxNQUFNOzs7OztJQTZFRixZQUNjLE9BQXlCLEVBQzNCO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXO3NCQWpFZCxLQUFLO3dCQUdxQixRQUFRO3FCQUdsQixLQUFLO21CQUdQLEdBQUc7cUJBSWxCLEtBQUs7dUJBSUgsS0FBSztvQ0FHUSxLQUFLOzBCQUdmLElBQUksWUFBWSxFQUFXO0tBMkNuQzs7OztRQTVFRCxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7Ozs7O0lBR3BDLElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBNkJELElBQUksUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNuQjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ3JCO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FB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LFNBQUMsYUFBYTsyQkFpQ3pCLFlBQVksU0FBQyx1QkFBdUI7NkJBS3BDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IFNpZGVQYW5lbFNlcnZpY2UgfSBmcm9tICcuL3NpZGUtcGFuZWwuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtc2lkZS1wYW5lbCcsXHJcbiAgICBleHBvcnRBczogJ3V4LXNpZGUtcGFuZWwnLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwibW9kYWwgJiYgb3BlblwiIGNsYXNzPVwibW9kYWwtYmFja2Ryb3BcIlxyXG4gICAgW3N0eWxlLnBvc2l0aW9uXT1cInBvc2l0aW9uXCJcclxuICAgIFtzdHlsZS50b3BdPVwiY3NzVG9wXCI+PC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1ob3N0XCJcclxuICAgIFtjbGFzcy5tb2RhbC1wYW5lbF09XCJtb2RhbFwiXHJcbiAgICBbc3R5bGUucG9zaXRpb25dPVwicG9zaXRpb25cIlxyXG4gICAgW3N0eWxlLndpZHRoXT1cImhvc3RXaWR0aFwiXHJcbiAgICBbc3R5bGUudG9wXT1cImNzc1RvcFwiPlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48L2Rpdj5cclxuYCxcclxuICAgIHByb3ZpZGVyczogW1NpZGVQYW5lbFNlcnZpY2VdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdjbGFzcyc6ICd1eC1zaWRlLXBhbmVsJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxyXG4gICAgZ2V0IG9wZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5vcGVuJC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgb3Blbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5vcGVuJC5uZXh0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbmxpbmUnKVxyXG4gICAgaW5saW5lID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGF0dGFjaFRvOiAnd2luZG93JyB8ICdjb250YWluZXInID0gJ3dpbmRvdyc7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHdpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSAnNTAlJztcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgdG9wOiBzdHJpbmcgfCBudW1iZXIgPSAnMCc7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW1vZGFsJylcclxuICAgIG1vZGFsID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZScpXHJcbiAgICBhbmltYXRlID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGNsb3NlT25FeHRlcm5hbENsaWNrID0gZmFsc2U7XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIGdldCBwb3NpdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5pbmxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdzdGF0aWMnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hdHRhY2hUbyA9PT0gJ2NvbnRhaW5lcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnZml4ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBjc3NXaWR0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy53aWR0aCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggPT09IDAgPyAnMCcgOiB0aGlzLndpZHRoICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNzc1RvcCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy50b3AgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcCA9PT0gMCA/ICcwJyA6IHRoaXMudG9wICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9wO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxyXG4gICAgZ2V0IGNvbXBvbmVudFdpZHRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW4gPyB0aGlzLmNzc1dpZHRoIDogJzAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaG9zdFdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlubGluZSA/ICcxMDAlJyA6IHRoaXMuY3NzV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJvdGVjdGVkIHNlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZlxyXG4gICAgKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnNlcnZpY2Uub3BlbiQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5QYW5lbCgpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXVwLmVzY2FwZScpXHJcbiAgICBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHRoaXMuc2VydmljZS5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIGNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcGVuIHx8ICF0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0KSB8fFxyXG4gICAgICAgICAgICAodGFyZ2V0ICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vZGFsLWJhY2tkcm9wJykpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==