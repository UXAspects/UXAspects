/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitSubject } from './conduit-subject';
var ConduitZone = /** @class */ (function () {
    function ConduitZone() {
    }
    /**
     * @return {?}
     */
    ConduitZone.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // find all conduit subjects that are part of this zone
        ConduitZone.subjects.filter(function (_subject) { return _subject.zoneId === _this._zoneId; })
            .forEach(function (_subject) { return _this.unregisterConduit(_subject.conduit); });
    };
    /** Store reference to the repository and begin watching for and emitting changes */
    /**
     * Store reference to the repository and begin watching for and emitting changes
     * @param {?} conduit
     * @return {?}
     */
    ConduitZone.prototype.registerConduit = /**
     * Store reference to the repository and begin watching for and emitting changes
     * @param {?} conduit
     * @return {?}
     */
    function (conduit) {
        ConduitZone.subjects.push(new ConduitSubject(conduit, this, this._zoneId));
    };
    /** Destroy a conduit */
    /**
     * Destroy a conduit
     * @param {?} conduit
     * @return {?}
     */
    ConduitZone.prototype.unregisterConduit = /**
     * Destroy a conduit
     * @param {?} conduit
     * @return {?}
     */
    function (conduit) {
        var /** @type {?} */ subject = this.getConduitSubject(conduit.subject);
        if (subject) {
            // remove the subject from the internal list of conduit subjects
            ConduitZone.subjects = ConduitZone.subjects.filter(function (_subject) { return _subject !== subject; });
            // perform all unsubscriptions
            subject.destroy();
        }
    };
    /** Provide the zone with an ID */
    /**
     * Provide the zone with an ID
     * @param {?} zoneId
     * @return {?}
     */
    ConduitZone.prototype.setZoneId = /**
     * Provide the zone with an ID
     * @param {?} zoneId
     * @return {?}
     */
    function (zoneId) {
        this._zoneId = zoneId;
    };
    /** Emit a value to all zones for checking */
    /**
     * Emit a value to all zones for checking
     * @param {?} event
     * @return {?}
     */
    ConduitZone.prototype.emit = /**
     * Emit a value to all zones for checking
     * @param {?} event
     * @return {?}
     */
    function (event) {
        ConduitZone.events.next(event);
    };
    /** Retrieve a conduit subsject object from the rxjs subject */
    /**
     * Retrieve a conduit subsject object from the rxjs subject
     * @param {?} subject
     * @return {?}
     */
    ConduitZone.prototype.getConduitSubject = /**
     * Retrieve a conduit subsject object from the rxjs subject
     * @param {?} subject
     * @return {?}
     */
    function (subject) {
        return ConduitZone.subjects.find(function (_subject) { return _subject.conduit.subject === subject; });
    };
    /** Get all subjects from all zones */
    /**
     * Get all subjects from all zones
     * @return {?}
     */
    ConduitZone.prototype.getSubjects = /**
     * Get all subjects from all zones
     * @return {?}
     */
    function () {
        return ConduitZone.subjects;
    };
    /** Alter the properties of a conduit dynamically */
    /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    ConduitZone.prototype.setConduitProperties = /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    function (subject, properties) {
        // find the conduit with the matching subject
        var /** @type {?} */ conduitSubject = this.getSubjects().find(function (_conduit) { return _conduit.conduit.subject === subject; });
        // if a match was found update the properties
        if (conduitSubject) {
            // update each specified property
            for (var /** @type {?} */ prop in properties) {
                conduitSubject.conduit[prop] = properties[prop];
            }
        }
    };
    /** Programmatically create a conduit at runtime */
    /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    ConduitZone.prototype.createConduit = /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    function (subject, properties) {
        // register the conduit with the zone
        this.registerConduit(tslib_1.__assign({}, properties, { subject: subject }));
    };
    /** Register all conduits in a component */
    /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    ConduitZone.prototype.registerConduits = /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    function (component) {
        var _this = this;
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach(function (conduit) { return _this.registerConduit(tslib_1.__assign({}, conduit, { subject: component[conduit.propertyKey] })); });
        }
    };
    /** Register all conduits in a component */
    /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    ConduitZone.prototype.unregisterConduits = /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    function (component) {
        var _this = this;
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach(function (conduit) { return _this.unregisterConduit(conduit); });
        }
    };
    /** Return the global event stream */
    /**
     * Return the global event stream
     * @return {?}
     */
    ConduitZone.prototype.getEvents = /**
     * Return the global event stream
     * @return {?}
     */
    function () {
        return ConduitZone.events;
    };
    /**
     * Create a global subject store
     */
    ConduitZone.subjects = [];
    /**
     * Expose an event stream of new values
     */
    ConduitZone.events = new Subject();
    ConduitZone.decorators = [
        { type: Injectable }
    ];
    return ConduitZone;
}());
export { ConduitZone };
function ConduitZone_tsickle_Closure_declarations() {
    /**
     * Create a global subject store
     * @type {?}
     */
    ConduitZone.subjects;
    /**
     * Expose an event stream of new values
     * @type {?}
     */
    ConduitZone.events;
    /**
     * Store the zone name
     * @type {?}
     */
    ConduitZone.prototype._zoneId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC16b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQtem9uZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7OztJQWlCL0MsaUNBQVc7OztJQUFYO1FBQUEsaUJBSUM7O1FBRkcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUksQ0FBQyxPQUFPLEVBQWhDLENBQWdDLENBQUM7YUFDcEUsT0FBTyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO0tBQ3RFO0lBRUQsb0ZBQW9GOzs7Ozs7SUFDcEYscUNBQWU7Ozs7O0lBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUM5RTtJQUVELHdCQUF3Qjs7Ozs7O0lBQ3hCLHVDQUFpQjs7Ozs7SUFBakIsVUFBa0IsT0FBd0I7UUFDdEMscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFFVixXQUFXLENBQUMsUUFBUSxHQUFHLFdBQVcs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VyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBDb25kdWl0U3ViamVjdCB9IGZyb20gJy4vY29uZHVpdC1zdWJqZWN0JztcbmltcG9ydCB7IENvbmR1aXRFdmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LWV2ZW50JztcbmltcG9ydCB7IENvbmR1aXRNZXRhZGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbmR1aXRQcm9wZXJ0aWVzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtcHJvcGVydGllcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25kdWl0Wm9uZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogQ3JlYXRlIGEgZ2xvYmFsIHN1YmplY3Qgc3RvcmUgKi9cbiAgICBzdGF0aWMgc3ViamVjdHM6IENvbmR1aXRTdWJqZWN0W10gPSBbXTtcblxuICAgIC8qKiBFeHBvc2UgYW4gZXZlbnQgc3RyZWFtIG9mIG5ldyB2YWx1ZXMgKi9cbiAgICBzdGF0aWMgZXZlbnRzID0gbmV3IFN1YmplY3Q8Q29uZHVpdEV2ZW50PigpO1xuXG4gICAgLyoqIFN0b3JlIHRoZSB6b25lIG5hbWUgKi9cbiAgICBwcml2YXRlIF96b25lSWQ6IHN0cmluZztcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIGFsbCBjb25kdWl0IHN1YmplY3RzIHRoYXQgYXJlIHBhcnQgb2YgdGhpcyB6b25lXG4gICAgICAgIENvbmR1aXRab25lLnN1YmplY3RzLmZpbHRlcihfc3ViamVjdCA9PiBfc3ViamVjdC56b25lSWQgPT09IHRoaXMuX3pvbmVJZClcbiAgICAgICAgICAgIC5mb3JFYWNoKF9zdWJqZWN0ID0+IHRoaXMudW5yZWdpc3RlckNvbmR1aXQoX3N1YmplY3QuY29uZHVpdCkpO1xuICAgIH1cblxuICAgIC8qKiBTdG9yZSByZWZlcmVuY2UgdG8gdGhlIHJlcG9zaXRvcnkgYW5kIGJlZ2luIHdhdGNoaW5nIGZvciBhbmQgZW1pdHRpbmcgY2hhbmdlcyAqL1xuICAgIHJlZ2lzdGVyQ29uZHVpdChjb25kdWl0OiBDb25kdWl0TWV0YWRhdGEpOiB2b2lkIHtcbiAgICAgICAgQ29uZHVpdFpvbmUuc3ViamVjdHMucHVzaChuZXcgQ29uZHVpdFN1YmplY3QoY29uZHVpdCwgdGhpcywgdGhpcy5fem9uZUlkKSk7XG4gICAgfVxuXG4gICAgLyoqIERlc3Ryb3kgYSBjb25kdWl0ICovXG4gICAgdW5yZWdpc3RlckNvbmR1aXQoY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLmdldENvbmR1aXRTdWJqZWN0KGNvbmR1aXQuc3ViamVjdCk7XG5cbiAgICAgICAgaWYgKHN1YmplY3QpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgc3ViamVjdCBmcm9tIHRoZSBpbnRlcm5hbCBsaXN0IG9mIGNvbmR1aXQgc3ViamVjdHNcbiAgICAgICAgICAgIENvbmR1aXRab25lLnN1YmplY3RzID0gQ29uZHVpdFpvbmUuc3ViamVjdHMuZmlsdGVyKF9zdWJqZWN0ID0+IF9zdWJqZWN0ICE9PSBzdWJqZWN0KTtcblxuICAgICAgICAgICAgLy8gcGVyZm9ybSBhbGwgdW5zdWJzY3JpcHRpb25zXG4gICAgICAgICAgICBzdWJqZWN0LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQcm92aWRlIHRoZSB6b25lIHdpdGggYW4gSUQgKi9cbiAgICBzZXRab25lSWQoem9uZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fem9uZUlkID0gem9uZUlkO1xuICAgIH1cblxuICAgIC8qKiBFbWl0IGEgdmFsdWUgdG8gYWxsIHpvbmVzIGZvciBjaGVja2luZyAqL1xuICAgIGVtaXQoZXZlbnQ6IENvbmR1aXRFdmVudCk6IHZvaWQge1xuICAgICAgICBDb25kdWl0Wm9uZS5ldmVudHMubmV4dChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHJpZXZlIGEgY29uZHVpdCBzdWJzamVjdCBvYmplY3QgZnJvbSB0aGUgcnhqcyBzdWJqZWN0ICovXG4gICAgZ2V0Q29uZHVpdFN1YmplY3Qoc3ViamVjdDogU3ViamVjdDxhbnk+KTogQ29uZHVpdFN1YmplY3QgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIENvbmR1aXRab25lLnN1YmplY3RzLmZpbmQoX3N1YmplY3QgPT4gX3N1YmplY3QuY29uZHVpdC5zdWJqZWN0ID09PSBzdWJqZWN0KTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBzdWJqZWN0cyBmcm9tIGFsbCB6b25lcyAqL1xuICAgIGdldFN1YmplY3RzKCk6IENvbmR1aXRTdWJqZWN0W10ge1xuICAgICAgICByZXR1cm4gQ29uZHVpdFpvbmUuc3ViamVjdHM7XG4gICAgfVxuXG4gICAgLyoqIEFsdGVyIHRoZSBwcm9wZXJ0aWVzIG9mIGEgY29uZHVpdCBkeW5hbWljYWxseSAqL1xuICAgIHNldENvbmR1aXRQcm9wZXJ0aWVzKHN1YmplY3Q6IFN1YmplY3Q8YW55PiwgcHJvcGVydGllczogUGFydGlhbDxDb25kdWl0UHJvcGVydGllcz4pOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIHRoZSBjb25kdWl0IHdpdGggdGhlIG1hdGNoaW5nIHN1YmplY3RcbiAgICAgICAgY29uc3QgY29uZHVpdFN1YmplY3QgPSB0aGlzLmdldFN1YmplY3RzKCkuZmluZChfY29uZHVpdCA9PiBfY29uZHVpdC5jb25kdWl0LnN1YmplY3QgPT09IHN1YmplY3QpO1xuXG4gICAgICAgIC8vIGlmIGEgbWF0Y2ggd2FzIGZvdW5kIHVwZGF0ZSB0aGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoY29uZHVpdFN1YmplY3QpIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGVhY2ggc3BlY2lmaWVkIHByb3BlcnR5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGNvbmR1aXRTdWJqZWN0LmNvbmR1aXRbcHJvcF0gPSBwcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFByb2dyYW1tYXRpY2FsbHkgY3JlYXRlIGEgY29uZHVpdCBhdCBydW50aW1lICovXG4gICAgY3JlYXRlQ29uZHVpdChzdWJqZWN0OiBTdWJqZWN0PGFueT4sIHByb3BlcnRpZXM6IENvbmR1aXRQcm9wZXJ0aWVzKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNvbmR1aXQgd2l0aCB0aGUgem9uZVxuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29uZHVpdCh7IC4uLnByb3BlcnRpZXMsIHN1YmplY3QgfSk7XG4gICAgfVxuXG4gICAgLyoqIFJlZ2lzdGVyIGFsbCBjb25kdWl0cyBpbiBhIGNvbXBvbmVudCAqL1xuICAgIHJlZ2lzdGVyQ29uZHVpdHMoY29tcG9uZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tcG9uZW50Ll9jb25kdWl0cykpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fY29uZHVpdHMuZm9yRWFjaCgoY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhKSA9PiB0aGlzLnJlZ2lzdGVyQ29uZHVpdCh7IC4uLmNvbmR1aXQsIHN1YmplY3Q6IGNvbXBvbmVudFtjb25kdWl0LnByb3BlcnR5S2V5XSB9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmVnaXN0ZXIgYWxsIGNvbmR1aXRzIGluIGEgY29tcG9uZW50ICovXG4gICAgdW5yZWdpc3RlckNvbmR1aXRzKGNvbXBvbmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudC5fY29uZHVpdHMpKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuX2NvbmR1aXRzLmZvckVhY2goKGNvbmR1aXQ6IENvbmR1aXRNZXRhZGF0YSkgPT4gdGhpcy51bnJlZ2lzdGVyQ29uZHVpdChjb25kdWl0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0dXJuIHRoZSBnbG9iYWwgZXZlbnQgc3RyZWFtICovXG4gICAgZ2V0RXZlbnRzKCk6IFN1YmplY3Q8Q29uZHVpdEV2ZW50PiB7XG4gICAgICAgIHJldHVybiBDb25kdWl0Wm9uZS5ldmVudHM7XG4gICAgfVxufVxuIl19