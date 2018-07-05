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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLFdBQVcsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBc0J4RCxNQUFNOzs7OztJQTZFRixZQUNjLE9BQXlCLEVBQzNCO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDM0IsZ0JBQVcsR0FBWCxXQUFXO3NCQWpFZCxLQUFLO3dCQUdxQixRQUFRO3FCQUdsQixLQUFLO21CQUdQLEdBQUc7cUJBSWxCLEtBQUs7dUJBSUgsS0FBSztvQ0FHUSxLQUFLOzBCQUdmLElBQUksWUFBWSxFQUFXO0tBMkNuQzs7OztRQTVFRCxJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7Ozs7O0lBR3BDLElBQUksSUFBSSxDQUFDLEtBQWM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7O0lBNkJELElBQUksUUFBUTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNuQjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDO1NBQ3JCO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FB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LFNBQUMsYUFBYTsyQkFpQ3pCLFlBQVksU0FBQyx1QkFBdUI7NkJBS3BDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4vc2lkZS1wYW5lbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zaWRlLXBhbmVsJyxcbiAgICBleHBvcnRBczogJ3V4LXNpZGUtcGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cIm1vZGFsICYmIG9wZW5cIiBjbGFzcz1cIm1vZGFsLWJhY2tkcm9wXCJcbiAgICBbc3R5bGUucG9zaXRpb25dPVwicG9zaXRpb25cIlxuICAgIFtzdHlsZS50b3BdPVwiY3NzVG9wXCI+PC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJ1eC1zaWRlLXBhbmVsLWhvc3RcIlxuICAgIFtjbGFzcy5tb2RhbC1wYW5lbF09XCJtb2RhbFwiXG4gICAgW3N0eWxlLnBvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAgICBbc3R5bGUud2lkdGhdPVwiaG9zdFdpZHRoXCJcbiAgICBbc3R5bGUudG9wXT1cImNzc1RvcFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuYCxcbiAgICBwcm92aWRlcnM6IFtTaWRlUGFuZWxTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICd1eC1zaWRlLXBhbmVsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICAgIGdldCBvcGVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLm9wZW4kLnZhbHVlO1xuICAgIH1cblxuICAgIHNldCBvcGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5vcGVuJC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaW5saW5lJylcbiAgICBpbmxpbmUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgYXR0YWNoVG86ICd3aW5kb3cnIHwgJ2NvbnRhaW5lcicgPSAnd2luZG93JztcblxuICAgIEBJbnB1dCgpXG4gICAgd2lkdGg6IHN0cmluZyB8IG51bWJlciA9ICc1MCUnO1xuXG4gICAgQElucHV0KClcbiAgICB0b3A6IHN0cmluZyB8IG51bWJlciA9ICcwJztcblxuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbW9kYWwnKVxuICAgIG1vZGFsID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0ZScpXG4gICAgYW5pbWF0ZSA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uRXh0ZXJuYWxDbGljayA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIGdldCBwb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3N0YXRpYyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNoVG8gPT09ICdjb250YWluZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2ZpeGVkJztcbiAgICB9XG5cbiAgICBnZXQgY3NzV2lkdGgoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggPT09IDAgPyAnMCcgOiB0aGlzLndpZHRoICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBnZXQgY3NzVG9wKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy50b3AgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgPT09IDAgPyAnMCcgOiB0aGlzLnRvcCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9wO1xuICAgIH1cblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICAgIGdldCBjb21wb25lbnRXaWR0aCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5pbmxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW4gPyB0aGlzLmNzc1dpZHRoIDogJzAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGdldCBob3N0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlubGluZSA/ICcxMDAlJyA6IHRoaXMuY3NzV2lkdGg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIHNlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWZcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5vcGVuJC5zdWJzY3JpYmUoKG5leHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KG5leHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgb3BlblBhbmVsKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbigpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleXVwLmVzY2FwZScpXG4gICAgY2xvc2VQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMub3BlbiB8fCAhdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljaykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkgfHxcbiAgICAgICAgICAgICh0YXJnZXQgJiYgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtYmFja2Ryb3AnKSkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==