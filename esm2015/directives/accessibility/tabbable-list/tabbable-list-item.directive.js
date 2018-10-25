/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../../common/index';
import { TabbableListService } from './tabbable-list.service';
let /** @type {?} */ nextId = 0;
export class TabbableListItemDirective {
    /**
     * @param {?} _tabbableList
     * @param {?} _elementRef
     * @param {?} focusMonitor
     */
    constructor(_tabbableList, _elementRef, focusMonitor) {
        this._tabbableList = _tabbableList;
        this._elementRef = _elementRef;
        this.rank = 0;
        this.disabled = false;
        this.expanded = false;
        this.expandedChange = new EventEmitter();
        this.tabindex = -1;
        this.id = nextId++;
        this.initialized = false;
        this.children = [];
        this.keyboardExpanded$ = new Subject();
        this._onDestroy = new Subject();
        this.keyboardExpanded$.pipe(tick(), takeUntil(this._onDestroy)).subscribe(expanded => {
            // Emit event which may alter the DOM
            this.expandedChange.emit(expanded);
            // Activate the appropriate item
            if (expanded) {
                if (this.children.length > 0) {
                    this._tabbableList.activate(this.children[0]);
                }
            }
            else {
                this._tabbableList.activate(this);
            }
        });
        // add classes to indicate the origin of the focus event
        focusMonitor.monitor(_elementRef.nativeElement, false).pipe(takeUntil(this._onDestroy)).subscribe();
    }
    /**
     * @return {?}
     */
    onInit() {
        this.initialized = true;
        this._tabbableList.focusKeyManager.change
            .pipe(takeUntil(this._onDestroy), map(() => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // check if this is the currently focused item - if so we need to make another item tabbable
        if (this.tabindex === 0) {
            this._tabbableList.setFirstItemTabbable();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    focus() {
        // apply focus to the element
        this._elementRef.nativeElement.focus();
        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._tabbableList.onKeydown(this, event);
    }
}
TabbableListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabbableListItem]',
                exportAs: 'ux-tabbable-list-item'
            },] }
];
/** @nocollapse */
TabbableListItemDirective.ctorParameters = () => [
    { type: TabbableListService },
    { type: ElementRef },
    { type: FocusMonitor }
];
TabbableListItemDirective.propDecorators = {
    parent: [{ type: Input }],
    rank: [{ type: Input }],
    disabled: [{ type: Input }],
    expanded: [{ type: Input }],
    expandedChange: [{ type: Output }],
    tabindex: [{ type: HostBinding }],
    focus: [{ type: HostListener, args: ['focus',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
function TabbableListItemDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TabbableListItemDirective.prototype.parent;
    /** @type {?} */
    TabbableListItemDirective.prototype.rank;
    /** @type {?} */
    TabbableListItemDirective.prototype.disabled;
    /** @type {?} */
    TabbableListItemDirective.prototype.expanded;
    /** @type {?} */
    TabbableListItemDirective.prototype.expandedChange;
    /** @type {?} */
    TabbableListItemDirective.prototype.tabindex;
    /** @type {?} */
    TabbableListItemDirective.prototype.id;
    /** @type {?} */
    TabbableListItemDirective.prototype.initialized;
    /** @type {?} */
    TabbableListItemDirective.prototype.children;
    /** @type {?} */
    TabbableListItemDirective.prototype.keyboardExpanded$;
    /** @type {?} */
    TabbableListItemDirective.prototype._onDestroy;
    /** @type {?} */
    TabbableListItemDirective.prototype._tabbableList;
    /** @type {?} */
    TabbableListItemDirective.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW1CLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxxQkFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBTWYsTUFBTTs7Ozs7O0lBd0JGLFlBQW9CLGFBQWtDLEVBQVUsV0FBdUIsRUFBRSxZQUEwQjtRQUEvRixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtvQkFwQi9ELENBQUM7d0JBRUksS0FBSzt3QkFFTCxLQUFLOzhCQUVQLElBQUksWUFBWSxFQUFXO3dCQUVwQixDQUFDLENBQUM7a0JBRXZCLE1BQU0sRUFBRTsyQkFFRSxLQUFLO3dCQUVZLEVBQUU7aUNBRXRCLElBQUksT0FBTyxFQUFXOzBCQUVyQixJQUFJLE9BQU8sRUFBUTtRQUlwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7O1lBR2pGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztZQUduQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakQ7YUFDSjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JDO1NBQ0osQ0FBQyxDQUFDOztRQUdILFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3ZHOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLE1BQU07YUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEYsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RDs7OztJQUVELFdBQVc7O1FBR1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUdELEtBQUs7O1FBR0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELFNBQVMsQ0FBQyxLQUFvQjtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0M7OztZQWpGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFLHVCQUF1QjthQUNwQzs7OztZQVBRLG1CQUFtQjtZQUpSLFVBQVU7WUFESixZQUFZOzs7cUJBZWpDLEtBQUs7bUJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUVMLEtBQUs7NkJBRUwsTUFBTTt1QkFFTixXQUFXO29CQW9EWCxZQUFZLFNBQUMsT0FBTzt3QkFVcEIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvY3VzYWJsZU9wdGlvbiwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXgnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VGFiYmFibGVMaXN0SXRlbV0nLFxuICAgIGV4cG9ydEFzOiAndXgtdGFiYmFibGUtbGlzdC1pdGVtJ1xufSlcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgcGFyZW50OiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlO1xuXG4gICAgQElucHV0KCkgcmFuazogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQEhvc3RCaW5kaW5nKCkgdGFiaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgaWQ6IG51bWJlciA9IG5leHRJZCsrO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNoaWxkcmVuOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10gPSBbXTtcblxuICAgIGtleWJvYXJkRXhwYW5kZWQkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7XG5cbiAgICAgICAgdGhpcy5rZXlib2FyZEV4cGFuZGVkJC5waXBlKHRpY2soKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShleHBhbmRlZCA9PiB7XG5cbiAgICAgICAgICAgIC8vIEVtaXQgZXZlbnQgd2hpY2ggbWF5IGFsdGVyIHRoZSBET01cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdChleHBhbmRlZCk7XG5cbiAgICAgICAgICAgIC8vIEFjdGl2YXRlIHRoZSBhcHByb3ByaWF0ZSBpdGVtXG4gICAgICAgICAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIGNsYXNzZXMgdG8gaW5kaWNhdGUgdGhlIG9yaWdpbiBvZiB0aGUgZm9jdXMgZXZlbnRcbiAgICAgICAgZm9jdXNNb25pdG9yLm1vbml0b3IoX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIG9uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmZvY3VzS2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAoKCkgPT4gdGhpcy5fdGFiYmFibGVMaXN0LmlzSXRlbUFjdGl2ZSh0aGlzKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFjdGl2ZSA9PiB0aGlzLnRhYmluZGV4ID0gYWN0aXZlID8gMCA6IC0xKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBpdGVtIC0gaWYgc28gd2UgbmVlZCB0byBtYWtlIGFub3RoZXIgaXRlbSB0YWJiYWJsZVxuICAgICAgICBpZiAodGhpcy50YWJpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LnNldEZpcnN0SXRlbVRhYmJhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gICAgZm9jdXMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gYXBwbHkgZm9jdXMgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoZSBmb2N1cyBrZXkgbWFuYWdlciB1cGRhdGVzIHRoZSBhY3RpdmUgaXRlbSBjb3JyZWN0bHlcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmFjdGl2YXRlKHRoaXMpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJiYWJsZUxpc3Qub25LZXlkb3duKHRoaXMsIGV2ZW50KTtcbiAgICB9XG59Il19