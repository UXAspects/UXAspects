/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Optional } from '@angular/core';
import { invokeSuperFunction } from './conduit-utils';
import { ConduitZone } from './conduit-zone.service';
var ConduitComponent = (function () {
    function ConduitComponent(_zone) {
        this._zone = _zone;
        // we want to ensure these functions get called even if a class overrides them
        invokeSuperFunction(this, 'ngOnInit');
        invokeSuperFunction(this, 'ngOnDestroy');
    }
    /** We need to register the conduits with the zone when the component is initialised */
    /**
     * We need to register the conduits with the zone when the component is initialised
     * @return {?}
     */
    ConduitComponent.prototype.ngOnInit = /**
     * We need to register the conduits with the zone when the component is initialised
     * @return {?}
     */
    function () {
        // register the conduit in the zone and ensure it gets the correct instance of the target
        this._zone.registerConduits(this);
    };
    /** We need to unregister the conduits when the component is destroyed */
    /**
     * We need to unregister the conduits when the component is destroyed
     * @return {?}
     */
    ConduitComponent.prototype.ngOnDestroy = /**
     * We need to unregister the conduits when the component is destroyed
     * @return {?}
     */
    function () {
        this._zone.unregisterConduits(this);
    };
    /** Alter the properties of a conduit dynamically */
    /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    ConduitComponent.prototype.setConduitProperties = /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    function (subject, properties) {
        this._zone.setConduitProperties(subject, properties);
    };
    /** Programmatically create a conduit at runtime */
    /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    ConduitComponent.prototype.createConduit = /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    function (subject, properties) {
        this._zone.createConduit(subject, properties);
    };
    /** @nocollapse */
    ConduitComponent.ctorParameters = function () { return [
        { type: ConduitZone, decorators: [{ type: Optional },] },
    ]; };
    return ConduitComponent;
}());
export { ConduitComponent };
function ConduitComponent_tsickle_Closure_declarations() {
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ConduitComponent.ctorParameters;
    /** @type {?} */
    ConduitComponent.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXFCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBS2pELDBCQUFrQztRQUFBLFVBQUssR0FBTCxLQUFLOztRQUVuQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdEMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0tBQzVDO0lBRUQsdUZBQXVGOzs7OztJQUN2RixtQ0FBUTs7OztJQUFSOztRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckM7SUFFRCx5RUFBeUU7Ozs7O0lBQ3pFLHNDQUFXOzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsb0RBQW9EOzs7Ozs7O0lBQ3BELCtDQUFvQjs7Ozs7O0lBQXBCLFVBQXFCLE9BQXFCLEVBQUUsVUFBc0M7UUFDOUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDeEQ7SUFFRCxtREFBbUQ7Ozs7Ozs7SUFDbkQsd0NBQWE7Ozs7OztJQUFiLFVBQWMsT0FBcUIsRUFBRSxVQUE2QjtRQUM5RCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDakQ7OztnQkE5QkksV0FBVyx1QkFLSCxRQUFROzsyQkFSekI7O1NBTWEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IGludm9rZVN1cGVyRnVuY3Rpb24gfSBmcm9tICcuL2NvbmR1aXQtdXRpbHMnO1xuaW1wb3J0IHsgQ29uZHVpdFpvbmUgfSBmcm9tICcuL2NvbmR1aXQtem9uZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmR1aXRQcm9wZXJ0aWVzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtcHJvcGVydGllcyc7XG5cbmV4cG9ydCBjbGFzcyBDb25kdWl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHJvdGVjdGVkIF96b25lOiBDb25kdWl0Wm9uZSkge1xuICAgICAgICAvLyB3ZSB3YW50IHRvIGVuc3VyZSB0aGVzZSBmdW5jdGlvbnMgZ2V0IGNhbGxlZCBldmVuIGlmIGEgY2xhc3Mgb3ZlcnJpZGVzIHRoZW1cbiAgICAgICAgaW52b2tlU3VwZXJGdW5jdGlvbih0aGlzLCAnbmdPbkluaXQnKTtcbiAgICAgICAgaW52b2tlU3VwZXJGdW5jdGlvbih0aGlzLCAnbmdPbkRlc3Ryb3knKTtcbiAgICB9XG5cbiAgICAvKiogV2UgbmVlZCB0byByZWdpc3RlciB0aGUgY29uZHVpdHMgd2l0aCB0aGUgem9uZSB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGlzZWQgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNvbmR1aXQgaW4gdGhlIHpvbmUgYW5kIGVuc3VyZSBpdCBnZXRzIHRoZSBjb3JyZWN0IGluc3RhbmNlIG9mIHRoZSB0YXJnZXRcbiAgICAgICAgdGhpcy5fem9uZS5yZWdpc3RlckNvbmR1aXRzKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKiBXZSBuZWVkIHRvIHVucmVnaXN0ZXIgdGhlIGNvbmR1aXRzIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fem9uZS51bnJlZ2lzdGVyQ29uZHVpdHModGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIEFsdGVyIHRoZSBwcm9wZXJ0aWVzIG9mIGEgY29uZHVpdCBkeW5hbWljYWxseSAqL1xuICAgIHNldENvbmR1aXRQcm9wZXJ0aWVzKHN1YmplY3Q6IFN1YmplY3Q8YW55PiwgcHJvcGVydGllczogUGFydGlhbDxDb25kdWl0UHJvcGVydGllcz4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fem9uZS5zZXRDb25kdWl0UHJvcGVydGllcyhzdWJqZWN0LCBwcm9wZXJ0aWVzKTtcbiAgICB9XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSBjcmVhdGUgYSBjb25kdWl0IGF0IHJ1bnRpbWUgKi9cbiAgICBjcmVhdGVDb25kdWl0KHN1YmplY3Q6IFN1YmplY3Q8YW55PiwgcHJvcGVydGllczogQ29uZHVpdFByb3BlcnRpZXMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fem9uZS5jcmVhdGVDb25kdWl0KHN1YmplY3QsIHByb3BlcnRpZXMpO1xuICAgIH1cblxufVxuIl19