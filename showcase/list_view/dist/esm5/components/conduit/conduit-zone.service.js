/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitSubject } from './conduit-subject';
var ConduitZone = (function () {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ConduitZone.ctorParameters = function () { return []; };
    return ConduitZone;
}());
export { ConduitZone };
function ConduitZone_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ConduitZone.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ConduitZone.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC16b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQtem9uZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7OztJQWlCL0MsaUNBQVc7OztJQUFYO1FBQUEsaUJBSUM7O1FBRkcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUksQ0FBQyxPQUFPLEVBQWhDLENBQWdDLENBQUM7YUFDcEUsT0FBTyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO0tBQ3RFO0lBRUQsb0ZBQW9GOzs7Ozs7SUFDcEYscUNBQWU7Ozs7O0lBQWYsVUFBZ0IsT0FBd0I7UUFDcEMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUM5RTtJQUVELHdCQUF3Qjs7Ozs7O0lBQ3hCLHVDQUFpQjs7Ozs7SUFBakIsVUFBa0IsT0FBd0I7UUFDdEMscUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7WUFFVixXQUFXLENBQUMsUUFBUSxHQUFHLFdBQVcs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QUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IENvbmR1aXRTdWJqZWN0IH0gZnJvbSAnLi9jb25kdWl0LXN1YmplY3QnO1xuaW1wb3J0IHsgQ29uZHVpdEV2ZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtZXZlbnQnO1xuaW1wb3J0IHsgQ29uZHVpdE1ldGFkYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29uZHVpdFByb3BlcnRpZXMgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1wcm9wZXJ0aWVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmR1aXRab25lIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBDcmVhdGUgYSBnbG9iYWwgc3ViamVjdCBzdG9yZSAqL1xuICAgIHN0YXRpYyBzdWJqZWN0czogQ29uZHVpdFN1YmplY3RbXSA9IFtdO1xuXG4gICAgLyoqIEV4cG9zZSBhbiBldmVudCBzdHJlYW0gb2YgbmV3IHZhbHVlcyAqL1xuICAgIHN0YXRpYyBldmVudHMgPSBuZXcgU3ViamVjdDxDb25kdWl0RXZlbnQ+KCk7XG5cbiAgICAvKiogU3RvcmUgdGhlIHpvbmUgbmFtZSAqL1xuICAgIHByaXZhdGUgX3pvbmVJZDogc3RyaW5nO1xuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIC8vIGZpbmQgYWxsIGNvbmR1aXQgc3ViamVjdHMgdGhhdCBhcmUgcGFydCBvZiB0aGlzIHpvbmVcbiAgICAgICAgQ29uZHVpdFpvbmUuc3ViamVjdHMuZmlsdGVyKF9zdWJqZWN0ID0+IF9zdWJqZWN0LnpvbmVJZCA9PT0gdGhpcy5fem9uZUlkKVxuICAgICAgICAgICAgLmZvckVhY2goX3N1YmplY3QgPT4gdGhpcy51bnJlZ2lzdGVyQ29uZHVpdChfc3ViamVjdC5jb25kdWl0KSk7XG4gICAgfVxuXG4gICAgLyoqIFN0b3JlIHJlZmVyZW5jZSB0byB0aGUgcmVwb3NpdG9yeSBhbmQgYmVnaW4gd2F0Y2hpbmcgZm9yIGFuZCBlbWl0dGluZyBjaGFuZ2VzICovXG4gICAgcmVnaXN0ZXJDb25kdWl0KGNvbmR1aXQ6IENvbmR1aXRNZXRhZGF0YSk6IHZvaWQge1xuICAgICAgICBDb25kdWl0Wm9uZS5zdWJqZWN0cy5wdXNoKG5ldyBDb25kdWl0U3ViamVjdChjb25kdWl0LCB0aGlzLCB0aGlzLl96b25lSWQpKTtcbiAgICB9XG5cbiAgICAvKiogRGVzdHJveSBhIGNvbmR1aXQgKi9cbiAgICB1bnJlZ2lzdGVyQ29uZHVpdChjb25kdWl0OiBDb25kdWl0TWV0YWRhdGEpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IHRoaXMuZ2V0Q29uZHVpdFN1YmplY3QoY29uZHVpdC5zdWJqZWN0KTtcblxuICAgICAgICBpZiAoc3ViamVjdCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzdWJqZWN0IGZyb20gdGhlIGludGVybmFsIGxpc3Qgb2YgY29uZHVpdCBzdWJqZWN0c1xuICAgICAgICAgICAgQ29uZHVpdFpvbmUuc3ViamVjdHMgPSBDb25kdWl0Wm9uZS5zdWJqZWN0cy5maWx0ZXIoX3N1YmplY3QgPT4gX3N1YmplY3QgIT09IHN1YmplY3QpO1xuXG4gICAgICAgICAgICAvLyBwZXJmb3JtIGFsbCB1bnN1YnNjcmlwdGlvbnNcbiAgICAgICAgICAgIHN1YmplY3QuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFByb3ZpZGUgdGhlIHpvbmUgd2l0aCBhbiBJRCAqL1xuICAgIHNldFpvbmVJZCh6b25lSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl96b25lSWQgPSB6b25lSWQ7XG4gICAgfVxuXG4gICAgLyoqIEVtaXQgYSB2YWx1ZSB0byBhbGwgem9uZXMgZm9yIGNoZWNraW5nICovXG4gICAgZW1pdChldmVudDogQ29uZHVpdEV2ZW50KTogdm9pZCB7XG4gICAgICAgIENvbmR1aXRab25lLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKiogUmV0cmlldmUgYSBjb25kdWl0IHN1YnNqZWN0IG9iamVjdCBmcm9tIHRoZSByeGpzIHN1YmplY3QgKi9cbiAgICBnZXRDb25kdWl0U3ViamVjdChzdWJqZWN0OiBTdWJqZWN0PGFueT4pOiBDb25kdWl0U3ViamVjdCB8IG51bGwge1xuICAgICAgICByZXR1cm4gQ29uZHVpdFpvbmUuc3ViamVjdHMuZmluZChfc3ViamVjdCA9PiBfc3ViamVjdC5jb25kdWl0LnN1YmplY3QgPT09IHN1YmplY3QpO1xuICAgIH1cblxuICAgIC8qKiBHZXQgYWxsIHN1YmplY3RzIGZyb20gYWxsIHpvbmVzICovXG4gICAgZ2V0U3ViamVjdHMoKTogQ29uZHVpdFN1YmplY3RbXSB7XG4gICAgICAgIHJldHVybiBDb25kdWl0Wm9uZS5zdWJqZWN0cztcbiAgICB9XG5cbiAgICAvKiogQWx0ZXIgdGhlIHByb3BlcnRpZXMgb2YgYSBjb25kdWl0IGR5bmFtaWNhbGx5ICovXG4gICAgc2V0Q29uZHVpdFByb3BlcnRpZXMoc3ViamVjdDogU3ViamVjdDxhbnk+LCBwcm9wZXJ0aWVzOiBQYXJ0aWFsPENvbmR1aXRQcm9wZXJ0aWVzPik6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIGNvbmR1aXQgd2l0aCB0aGUgbWF0Y2hpbmcgc3ViamVjdFxuICAgICAgICBjb25zdCBjb25kdWl0U3ViamVjdCA9IHRoaXMuZ2V0U3ViamVjdHMoKS5maW5kKF9jb25kdWl0ID0+IF9jb25kdWl0LmNvbmR1aXQuc3ViamVjdCA9PT0gc3ViamVjdCk7XG5cbiAgICAgICAgLy8gaWYgYSBtYXRjaCB3YXMgZm91bmQgdXBkYXRlIHRoZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmIChjb25kdWl0U3ViamVjdCkge1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZWFjaCBzcGVjaWZpZWQgcHJvcGVydHlcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgY29uZHVpdFN1YmplY3QuY29uZHVpdFtwcm9wXSA9IHByb3BlcnRpZXNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUHJvZ3JhbW1hdGljYWxseSBjcmVhdGUgYSBjb25kdWl0IGF0IHJ1bnRpbWUgKi9cbiAgICBjcmVhdGVDb25kdWl0KHN1YmplY3Q6IFN1YmplY3Q8YW55PiwgcHJvcGVydGllczogQ29uZHVpdFByb3BlcnRpZXMpOiB2b2lkIHtcblxuICAgICAgICAvLyByZWdpc3RlciB0aGUgY29uZHVpdCB3aXRoIHRoZSB6b25lXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb25kdWl0KHsgLi4ucHJvcGVydGllcywgc3ViamVjdCB9KTtcbiAgICB9XG5cbiAgICAvKiogUmVnaXN0ZXIgYWxsIGNvbmR1aXRzIGluIGEgY29tcG9uZW50ICovXG4gICAgcmVnaXN0ZXJDb25kdWl0cyhjb21wb25lbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnQuX2NvbmR1aXRzKSkge1xuICAgICAgICAgICAgY29tcG9uZW50Ll9jb25kdWl0cy5mb3JFYWNoKChjb25kdWl0OiBDb25kdWl0TWV0YWRhdGEpID0+IHRoaXMucmVnaXN0ZXJDb25kdWl0KHsgLi4uY29uZHVpdCwgc3ViamVjdDogY29tcG9uZW50W2NvbmR1aXQucHJvcGVydHlLZXldIH0pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZWdpc3RlciBhbGwgY29uZHVpdHMgaW4gYSBjb21wb25lbnQgKi9cbiAgICB1bnJlZ2lzdGVyQ29uZHVpdHMoY29tcG9uZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tcG9uZW50Ll9jb25kdWl0cykpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fY29uZHVpdHMuZm9yRWFjaCgoY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhKSA9PiB0aGlzLnVucmVnaXN0ZXJDb25kdWl0KGNvbmR1aXQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZXR1cm4gdGhlIGdsb2JhbCBldmVudCBzdHJlYW0gKi9cbiAgICBnZXRFdmVudHMoKTogU3ViamVjdDxDb25kdWl0RXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIENvbmR1aXRab25lLmV2ZW50cztcbiAgICB9XG59XG4iXX0=