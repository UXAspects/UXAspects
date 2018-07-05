/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Optional } from '@angular/core';
import { invokeSuperFunction } from './conduit-utils';
import { ConduitZone } from './conduit-zone.service';
export class ConduitComponent {
    /**
     * @param {?} _zone
     */
    constructor(_zone) {
        this._zone = _zone;
        // we want to ensure these functions get called even if a class overrides them
        invokeSuperFunction(this, 'ngOnInit');
        invokeSuperFunction(this, 'ngOnDestroy');
    }
    /**
     * We need to register the conduits with the zone when the component is initialised
     * @return {?}
     */
    ngOnInit() {
        // register the conduit in the zone and ensure it gets the correct instance of the target
        this._zone.registerConduits(this);
    }
    /**
     * We need to unregister the conduits when the component is destroyed
     * @return {?}
     */
    ngOnDestroy() {
        this._zone.unregisterConduits(this);
    }
    /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    setConduitProperties(subject, properties) {
        this._zone.setConduitProperties(subject, properties);
    }
    /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    createConduit(subject, properties) {
        this._zone.createConduit(subject, properties);
    }
}
/** @nocollapse */
ConduitComponent.ctorParameters = () => [
    { type: ConduitZone, decorators: [{ type: Optional },] },
];
function ConduitComponent_tsickle_Closure_declarations() {
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ConduitComponent.ctorParameters;
    /** @type {?} */
    ConduitComponent.prototype._zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXFCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHckQsTUFBTTs7OztJQUVGLFlBQWtDO1FBQUEsVUFBSyxHQUFMLEtBQUs7O1FBRW5DLG1CQUFtQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN0QyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDNUM7Ozs7O0lBR0QsUUFBUTs7UUFFSixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDOzs7OztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZDOzs7Ozs7O0lBR0Qsb0JBQW9CLENBQUMsT0FBcUIsRUFBRSxVQUFzQztRQUM5RSxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN4RDs7Ozs7OztJQUdELGFBQWEsQ0FBQyxPQUFxQixFQUFFLFVBQTZCO1FBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNqRDs7OztZQTlCSSxXQUFXLHVCQUtILFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgaW52b2tlU3VwZXJGdW5jdGlvbiB9IGZyb20gJy4vY29uZHVpdC11dGlscyc7XG5pbXBvcnQgeyBDb25kdWl0Wm9uZSB9IGZyb20gJy4vY29uZHVpdC16b25lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZHVpdFByb3BlcnRpZXMgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1wcm9wZXJ0aWVzJztcblxuZXhwb3J0IGNsYXNzIENvbmR1aXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgX3pvbmU6IENvbmR1aXRab25lKSB7XG4gICAgICAgIC8vIHdlIHdhbnQgdG8gZW5zdXJlIHRoZXNlIGZ1bmN0aW9ucyBnZXQgY2FsbGVkIGV2ZW4gaWYgYSBjbGFzcyBvdmVycmlkZXMgdGhlbVxuICAgICAgICBpbnZva2VTdXBlckZ1bmN0aW9uKHRoaXMsICduZ09uSW5pdCcpO1xuICAgICAgICBpbnZva2VTdXBlckZ1bmN0aW9uKHRoaXMsICduZ09uRGVzdHJveScpO1xuICAgIH1cblxuICAgIC8qKiBXZSBuZWVkIHRvIHJlZ2lzdGVyIHRoZSBjb25kdWl0cyB3aXRoIHRoZSB6b25lIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXNlZCAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyByZWdpc3RlciB0aGUgY29uZHVpdCBpbiB0aGUgem9uZSBhbmQgZW5zdXJlIGl0IGdldHMgdGhlIGNvcnJlY3QgaW5zdGFuY2Ugb2YgdGhlIHRhcmdldFxuICAgICAgICB0aGlzLl96b25lLnJlZ2lzdGVyQ29uZHVpdHModGhpcyk7XG4gICAgfVxuXG4gICAgLyoqIFdlIG5lZWQgdG8gdW5yZWdpc3RlciB0aGUgY29uZHVpdHMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZCAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl96b25lLnVucmVnaXN0ZXJDb25kdWl0cyh0aGlzKTtcbiAgICB9XG5cbiAgICAvKiogQWx0ZXIgdGhlIHByb3BlcnRpZXMgb2YgYSBjb25kdWl0IGR5bmFtaWNhbGx5ICovXG4gICAgc2V0Q29uZHVpdFByb3BlcnRpZXMoc3ViamVjdDogU3ViamVjdDxhbnk+LCBwcm9wZXJ0aWVzOiBQYXJ0aWFsPENvbmR1aXRQcm9wZXJ0aWVzPik6IHZvaWQge1xuICAgICAgICB0aGlzLl96b25lLnNldENvbmR1aXRQcm9wZXJ0aWVzKHN1YmplY3QsIHByb3BlcnRpZXMpO1xuICAgIH1cblxuICAgIC8qKiBQcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZSBhIGNvbmR1aXQgYXQgcnVudGltZSAqL1xuICAgIGNyZWF0ZUNvbmR1aXQoc3ViamVjdDogU3ViamVjdDxhbnk+LCBwcm9wZXJ0aWVzOiBDb25kdWl0UHJvcGVydGllcyk6IHZvaWQge1xuICAgICAgICB0aGlzLl96b25lLmNyZWF0ZUNvbmR1aXQoc3ViamVjdCwgcHJvcGVydGllcyk7XG4gICAgfVxuXG59XG4iXX0=