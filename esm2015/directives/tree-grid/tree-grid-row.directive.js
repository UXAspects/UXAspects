/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { distinctUntilChanged, skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/operators/tick.operator';
import { TreeGridService } from './tree-grid.service';
export class TreeGridRowDirective {
    /**
     * @param {?} _treeGridService
     */
    constructor(_treeGridService) {
        this._treeGridService = _treeGridService;
        this.expandedChange = new EventEmitter();
        this.loading = false;
        this.isExpanded = false;
        this._expanded$ = new BehaviorSubject(false);
        this._onDestroy = new Subject();
        this._expanded$.pipe(skip(1), tick(), distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(expanded => {
            this.expandedChange.emit(expanded);
            this._treeGridService.setExpanded(this.item, expanded);
            this.isExpanded = expanded;
        });
    }
    /**
     * @param {?} expanded
     * @return {?}
     */
    set expanded(expanded) {
        this._expanded$.next(!!expanded);
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded$.getValue();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.item || !this.item.state) {
            throw new Error('uxTreeGridRow should be configured with an object emitted by uxTreeGrid.rows.');
        }
        this.item.state.loading$.pipe(takeUntil(this._onDestroy))
            .subscribe(loading => this.loading = loading);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    collapse(event) {
        this.expanded = false;
        if (event) {
            event.preventDefault();
        }
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    expand(event) {
        // take into account whether or not the item can expanded
        this.expanded = this.canExpand && true;
        if (event) {
            event.preventDefault();
        }
    }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded ? this.collapse() : this.expand();
    }
}
TreeGridRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTreeGridRow]',
                exportAs: 'uxTreeGridRow',
                host: {
                    '[class.treegrid-row]': 'true'
                }
            },] }
];
/** @nocollapse */
TreeGridRowDirective.ctorParameters = () => [
    { type: TreeGridService }
];
TreeGridRowDirective.propDecorators = {
    item: [{ type: Input, args: ['uxTreeGridRow',] }],
    canExpand: [{ type: Input }],
    expanded: [{ type: Input }],
    expandedChange: [{ type: Output }],
    loading: [{ type: HostBinding, args: ['class.treegrid-row-loading',] }],
    isExpanded: [{ type: HostBinding, args: ['class.treegrid-row-expanded',] }],
    collapse: [{ type: HostListener, args: ['keydown.ArrowLeft', ['$event'],] }],
    expand: [{ type: HostListener, args: ['keydown.ArrowRight', ['$event'],] }]
};
function TreeGridRowDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    TreeGridRowDirective.prototype.item;
    /** @type {?} */
    TreeGridRowDirective.prototype.canExpand;
    /** @type {?} */
    TreeGridRowDirective.prototype.expandedChange;
    /** @type {?} */
    TreeGridRowDirective.prototype.loading;
    /** @type {?} */
    TreeGridRowDirective.prototype.isExpanded;
    /** @type {?} */
    TreeGridRowDirective.prototype._expanded$;
    /** @type {?} */
    TreeGridRowDirective.prototype._onDestroy;
    /** @type {?} */
    TreeGridRowDirective.prototype._treeGridService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBU3RELE1BQU07Ozs7SUE2QkYsWUFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7OEJBWnBDLElBQUksWUFBWSxFQUFXO3VCQUd6QixLQUFLOzBCQUdGLEtBQUs7MEJBRU4sSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDOzBCQUUxQixJQUFJLE9BQU8sRUFBUTtRQUdwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjs7Ozs7SUEzQkQsSUFDSSxRQUFRLENBQUMsUUFBaUI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBQ0QsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDckM7Ozs7SUF1QkQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7U0FDcEc7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztLQUNyRDs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsUUFBUSxDQUFDLEtBQWE7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtLQUNKOzs7OztJQUdELE1BQU0sQ0FBQyxLQUFhOztRQUdoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7S0FDSjs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNuRDs7O1lBbEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsZUFBZTtnQkFDekIsSUFBSSxFQUFFO29CQUNGLHNCQUFzQixFQUFFLE1BQU07aUJBQ2pDO2FBQ0o7Ozs7WUFSUSxlQUFlOzs7bUJBV25CLEtBQUssU0FBQyxlQUFlO3dCQUdyQixLQUFLO3VCQUdMLEtBQUs7NkJBUUwsTUFBTTtzQkFHTixXQUFXLFNBQUMsNEJBQTRCO3lCQUd4QyxXQUFXLFNBQUMsNkJBQTZCO3VCQThCekMsWUFBWSxTQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDO3FCQVU1QyxZQUFZLFNBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMtY29tcGF0L0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2tpcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyB0aWNrIH0gZnJvbSAnLi4vLi4vY29tbW9uL29wZXJhdG9ycy90aWNrLm9wZXJhdG9yJztcbmltcG9ydCB7IFRyZWVHcmlkSXRlbSB9IGZyb20gJy4vdHJlZS1ncmlkLWl0ZW0uaW50ZXJmYWNlJztcbmltcG9ydCB7IFRyZWVHcmlkU2VydmljZSB9IGZyb20gJy4vdHJlZS1ncmlkLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eFRyZWVHcmlkUm93XScsXG4gICAgZXhwb3J0QXM6ICd1eFRyZWVHcmlkUm93JyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudHJlZWdyaWQtcm93XSc6ICd0cnVlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZUdyaWRSb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoJ3V4VHJlZUdyaWRSb3cnKVxuICAgIGl0ZW06IFRyZWVHcmlkSXRlbTtcblxuICAgIEBJbnB1dCgpXG4gICAgY2FuRXhwYW5kOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBzZXQgZXhwYW5kZWQoZXhwYW5kZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQkLm5leHQoISFleHBhbmRlZCk7XG4gICAgfVxuICAgIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkJC5nZXRWYWx1ZSgpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKVxuICAgIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy50cmVlZ3JpZC1yb3ctbG9hZGluZycpXG4gICAgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy50cmVlZ3JpZC1yb3ctZXhwYW5kZWQnKVxuICAgIGlzRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2V4cGFuZGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RyZWVHcmlkU2VydmljZTogVHJlZUdyaWRTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX2V4cGFuZGVkJC5waXBlKHNraXAoMSksIHRpY2soKSwgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShleHBhbmRlZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQoZXhwYW5kZWQpO1xuICAgICAgICAgICAgdGhpcy5fdHJlZUdyaWRTZXJ2aWNlLnNldEV4cGFuZGVkKHRoaXMuaXRlbSwgZXhwYW5kZWQpO1xuICAgICAgICAgICAgdGhpcy5pc0V4cGFuZGVkID0gZXhwYW5kZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIGlmICghdGhpcy5pdGVtIHx8ICF0aGlzLml0ZW0uc3RhdGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndXhUcmVlR3JpZFJvdyBzaG91bGQgYmUgY29uZmlndXJlZCB3aXRoIGFuIG9iamVjdCBlbWl0dGVkIGJ5IHV4VHJlZUdyaWQucm93cy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbS5zdGF0ZS5sb2FkaW5nJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShsb2FkaW5nID0+IHRoaXMubG9hZGluZyA9IGxvYWRpbmcpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkFycm93TGVmdCcsIFsnJGV2ZW50J10pXG4gICAgY29sbGFwc2UoZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkFycm93UmlnaHQnLCBbJyRldmVudCddKVxuICAgIGV4cGFuZChldmVudD86IEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gdGFrZSBpbnRvIGFjY291bnQgd2hldGhlciBvciBub3QgdGhlIGl0ZW0gY2FuIGV4cGFuZGVkXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLmNhbkV4cGFuZCAmJiB0cnVlO1xuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA/IHRoaXMuY29sbGFwc2UoKSA6IHRoaXMuZXhwYW5kKCk7XG4gICAgfVxufSJdfQ==