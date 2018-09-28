/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
     */
    constructor(_tabbableList, _elementRef) {
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
    { type: ElementRef }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmFibGUtbGlzdC1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvdGFiYmFibGUtbGlzdC90YWJiYWJsZS1saXN0LWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQscUJBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQU1mLE1BQU07Ozs7O0lBd0JGLFlBQW9CLGFBQWtDLEVBQVUsV0FBdUI7UUFBbkUsa0JBQWEsR0FBYixhQUFhLENBQXFCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBcEIvRCxDQUFDO3dCQUVJLEtBQUs7d0JBRUwsS0FBSzs4QkFFUCxJQUFJLFlBQVksRUFBVzt3QkFFcEIsQ0FBQyxDQUFDO2tCQUV2QixNQUFNLEVBQUU7MkJBRUUsS0FBSzt3QkFFWSxFQUFFO2lDQUV0QixJQUFJLE9BQU8sRUFBVzswQkFFckIsSUFBSSxPQUFPLEVBQVE7UUFJcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFOztZQUdqRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFHbkMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0o7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQztTQUNKLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLE1BQU07YUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEYsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3RDs7OztJQUVELFdBQVc7O1FBR1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUdELEtBQUs7O1FBR0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBR3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELFNBQVMsQ0FBQyxLQUFvQjtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0M7OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFLHVCQUF1QjthQUNwQzs7OztZQVBRLG1CQUFtQjtZQUpSLFVBQVU7OztxQkFjekIsS0FBSzttQkFFTCxLQUFLO3VCQUVMLEtBQUs7dUJBRUwsS0FBSzs2QkFFTCxNQUFNO3VCQUVOLFdBQVc7b0JBaURYLFlBQVksU0FBQyxPQUFPO3dCQVVwQixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW5kZXgnO1xuaW1wb3J0IHsgVGFiYmFibGVMaXN0U2VydmljZSB9IGZyb20gJy4vdGFiYmFibGUtbGlzdC5zZXJ2aWNlJztcblxubGV0IG5leHRJZCA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VGFiYmFibGVMaXN0SXRlbV0nLFxuICAgIGV4cG9ydEFzOiAndXgtdGFiYmFibGUtbGlzdC1pdGVtJ1xufSlcbmV4cG9ydCBjbGFzcyBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgRm9jdXNhYmxlT3B0aW9uLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgcGFyZW50OiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlO1xuXG4gICAgQElucHV0KCkgcmFuazogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQEhvc3RCaW5kaW5nKCkgdGFiaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgaWQ6IG51bWJlciA9IG5leHRJZCsrO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNoaWxkcmVuOiBUYWJiYWJsZUxpc3RJdGVtRGlyZWN0aXZlW10gPSBbXTtcblxuICAgIGtleWJvYXJkRXhwYW5kZWQkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90YWJiYWJsZUxpc3Q6IFRhYmJhYmxlTGlzdFNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcblxuICAgICAgICB0aGlzLmtleWJvYXJkRXhwYW5kZWQkLnBpcGUodGljaygpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGV4cGFuZGVkID0+IHtcblxuICAgICAgICAgICAgLy8gRW1pdCBldmVudCB3aGljaCBtYXkgYWx0ZXIgdGhlIERPTVxuICAgICAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KGV4cGFuZGVkKTtcblxuICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIGFwcHJvcHJpYXRlIGl0ZW1cbiAgICAgICAgICAgIGlmIChleHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmFjdGl2YXRlKHRoaXMuY2hpbGRyZW5bMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0LmFjdGl2YXRlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5mb2N1c0tleU1hbmFnZXIuY2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKCgpID0+IHRoaXMuX3RhYmJhYmxlTGlzdC5pc0l0ZW1BY3RpdmUodGhpcykpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShhY3RpdmUgPT4gdGhpcy50YWJpbmRleCA9IGFjdGl2ZSA/IDAgOiAtMSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBpcyB0aGUgY3VycmVudGx5IGZvY3VzZWQgaXRlbSAtIGlmIHNvIHdlIG5lZWQgdG8gbWFrZSBhbm90aGVyIGl0ZW0gdGFiYmFibGVcbiAgICAgICAgaWYgKHRoaXMudGFiaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5zZXRGaXJzdEl0ZW1UYWJiYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICAgIGZvY3VzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGFwcGx5IGZvY3VzIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGUgZm9jdXMga2V5IG1hbmFnZXIgdXBkYXRlcyB0aGUgYWN0aXZlIGl0ZW0gY29ycmVjdGx5XG4gICAgICAgIHRoaXMuX3RhYmJhYmxlTGlzdC5hY3RpdmF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiYmFibGVMaXN0Lm9uS2V5ZG93bih0aGlzLCBldmVudCk7XG4gICAgfVxufSJdfQ==