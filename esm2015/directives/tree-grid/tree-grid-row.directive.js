/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBU3RELE1BQU07Ozs7SUE2QkYsWUFBb0IsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7OEJBWnBDLElBQUksWUFBWSxFQUFXO3VCQUd6QixLQUFLOzBCQUdGLEtBQUs7MEJBRU4sSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDOzBCQUUxQixJQUFJLE9BQU8sRUFBUTtRQUdwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUM5QixDQUFDLENBQUM7S0FDTjs7Ozs7SUEzQkQsSUFDSSxRQUFRLENBQUMsUUFBaUI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3BDOzs7O0lBQ0QsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDckM7Ozs7SUF1QkQsUUFBUTtRQUVKLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7U0FDcEc7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDcEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztLQUNyRDs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsUUFBUSxDQUFDLEtBQWE7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtLQUNKOzs7OztJQUdELE1BQU0sQ0FBQyxLQUFhOztRQUdoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7S0FDSjs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNuRDs7O1lBbEZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsZUFBZTtnQkFDekIsSUFBSSxFQUFFO29CQUNGLHNCQUFzQixFQUFFLE1BQU07aUJBQ2pDO2FBQ0o7Ozs7WUFSUSxlQUFlOzs7bUJBV25CLEtBQUssU0FBQyxlQUFlO3dCQUdyQixLQUFLO3VCQUdMLEtBQUs7NkJBUUwsTUFBTTtzQkFHTixXQUFXLFNBQUMsNEJBQTRCO3lCQUd4QyxXQUFXLFNBQUMsNkJBQTZCO3VCQThCekMsWUFBWSxTQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDO3FCQVU1QyxZQUFZLFNBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBza2lwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi9jb21tb24vb3BlcmF0b3JzL3RpY2sub3BlcmF0b3InO1xuaW1wb3J0IHsgVHJlZUdyaWRJdGVtIH0gZnJvbSAnLi90cmVlLWdyaWQtaXRlbS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVHJlZUdyaWRTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWdyaWQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VHJlZUdyaWRSb3ddJyxcbiAgICBleHBvcnRBczogJ3V4VHJlZUdyaWRSb3cnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy50cmVlZ3JpZC1yb3ddJzogJ3RydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUcmVlR3JpZFJvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgndXhUcmVlR3JpZFJvdycpXG4gICAgaXRlbTogVHJlZUdyaWRJdGVtO1xuXG4gICAgQElucHV0KClcbiAgICBjYW5FeHBhbmQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBleHBhbmRlZChleHBhbmRlZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9leHBhbmRlZCQubmV4dCghIWV4cGFuZGVkKTtcbiAgICB9XG4gICAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQkLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRyZWVncmlkLXJvdy1sb2FkaW5nJylcbiAgICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRyZWVncmlkLXJvdy1leHBhbmRlZCcpXG4gICAgaXNFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfZXhwYW5kZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdHJlZUdyaWRTZXJ2aWNlOiBUcmVlR3JpZFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kZWQkLnBpcGUoc2tpcCgxKSwgdGljaygpLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGV4cGFuZGVkID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdChleHBhbmRlZCk7XG4gICAgICAgICAgICB0aGlzLl90cmVlR3JpZFNlcnZpY2Uuc2V0RXhwYW5kZWQodGhpcy5pdGVtLCBleHBhbmRlZCk7XG4gICAgICAgICAgICB0aGlzLmlzRXhwYW5kZWQgPSBleHBhbmRlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKCF0aGlzLml0ZW0gfHwgIXRoaXMuaXRlbS5zdGF0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1eFRyZWVHcmlkUm93IHNob3VsZCBiZSBjb25maWd1cmVkIHdpdGggYW4gb2JqZWN0IGVtaXR0ZWQgYnkgdXhUcmVlR3JpZC5yb3dzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pdGVtLnN0YXRlLmxvYWRpbmckLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGxvYWRpbmcgPT4gdGhpcy5sb2FkaW5nID0gbG9hZGluZyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dMZWZ0JywgWyckZXZlbnQnXSlcbiAgICBjb2xsYXBzZShldmVudD86IEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXG4gICAgZXhwYW5kKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyB0YWtlIGludG8gYWNjb3VudCB3aGV0aGVyIG9yIG5vdCB0aGUgaXRlbSBjYW4gZXhwYW5kZWRcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMuY2FuRXhwYW5kICYmIHRydWU7XG5cbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID8gdGhpcy5jb2xsYXBzZSgpIDogdGhpcy5leHBhbmQoKTtcbiAgICB9XG59XG4iXX0=