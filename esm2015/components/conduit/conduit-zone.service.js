/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ConduitSubject } from './conduit-subject';
export class ConduitZone {
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // find all conduit subjects that are part of this zone
        ConduitZone.subjects.filter(_subject => _subject.zoneId === this._zoneId)
            .forEach(_subject => this.unregisterConduit(_subject.conduit));
    }
    /**
     * Store reference to the repository and begin watching for and emitting changes
     * @param {?} conduit
     * @return {?}
     */
    registerConduit(conduit) {
        ConduitZone.subjects.push(new ConduitSubject(conduit, this, this._zoneId));
    }
    /**
     * Destroy a conduit
     * @param {?} conduit
     * @return {?}
     */
    unregisterConduit(conduit) {
        const /** @type {?} */ subject = this.getConduitSubject(conduit.subject);
        if (subject) {
            // remove the subject from the internal list of conduit subjects
            ConduitZone.subjects = ConduitZone.subjects.filter(_subject => _subject !== subject);
            // perform all unsubscriptions
            subject.destroy();
        }
    }
    /**
     * Provide the zone with an ID
     * @param {?} zoneId
     * @return {?}
     */
    setZoneId(zoneId) {
        this._zoneId = zoneId;
    }
    /**
     * Emit a value to all zones for checking
     * @param {?} event
     * @return {?}
     */
    emit(event) {
        ConduitZone.events.next(event);
    }
    /**
     * Retrieve a conduit subsject object from the rxjs subject
     * @param {?} subject
     * @return {?}
     */
    getConduitSubject(subject) {
        return ConduitZone.subjects.find(_subject => _subject.conduit.subject === subject);
    }
    /**
     * Get all subjects from all zones
     * @return {?}
     */
    getSubjects() {
        return ConduitZone.subjects;
    }
    /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    setConduitProperties(subject, properties) {
        // find the conduit with the matching subject
        const /** @type {?} */ conduitSubject = this.getSubjects().find(_conduit => _conduit.conduit.subject === subject);
        // if a match was found update the properties
        if (conduitSubject) {
            // update each specified property
            for (const /** @type {?} */ prop in properties) {
                conduitSubject.conduit[prop] = properties[prop];
            }
        }
    }
    /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    createConduit(subject, properties) {
        // register the conduit with the zone
        this.registerConduit(Object.assign({}, properties, { subject }));
    }
    /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    registerConduits(component) {
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach((conduit) => this.registerConduit(Object.assign({}, conduit, { subject: component[conduit.propertyKey] })));
        }
    }
    /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    unregisterConduits(component) {
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach((conduit) => this.unregisterConduit(conduit));
        }
    }
    /**
     * Return the global event stream
     * @return {?}
     */
    getEvents() {
        return ConduitZone.events;
    }
}
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
ConduitZone.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC16b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQtem9uZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTW5ELE1BQU07Ozs7SUFXRixXQUFXOztRQUVQLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDcEUsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDdEU7Ozs7OztJQUdELGVBQWUsQ0FBQyxPQUF3QjtRQUNwQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQzlFOzs7Ozs7SUFHRCxpQkFBaUIsQ0FBQyxPQUF3QjtRQUN0Qyx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztZQUVWLFdBQVcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQzs7WUFHckYsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO0tBQ0o7Ozs7OztJQUdELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7Ozs7SUFHRCxJQUFJLENBQUMsS0FBbUI7UUFDcEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7OztJQUdELGlCQUFpQixDQUFDLE9BQXFCO1FBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUM7S0FDdEY7Ozs7O0lBR0QsV0FBVztRQUNQLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO0tBQy9COzs7Ozs7O0lBR0Qsb0JBQW9CLENBQUMsT0FBcUIsRUFBRSxVQUFzQzs7UUFHOUUsdUJBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDOztRQUdqRyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUdqQixHQUFHLENBQUMsQ0FBQyx1QkFBTSxJQUFJLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkQ7U0FDSjtLQUNKOzs7Ozs7O0lBR0QsYUFBYSxDQUFDLE9BQXFCLEVBQUUsVUFBNkI7O1FBRzlELElBQUksQ0FBQyxlQUFlLG1CQUFNLFVBQVUsSUFBRSxPQUFPLElBQUcsQ0FBQztLQUNwRDs7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsU0FBYztRQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUF3QixLQUFLLElBQUksQ0FBQyxlQUFlLG1CQUFNLE9BQU8sSUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBRyxDQUFDLENBQUM7U0FDNUk7S0FDSjs7Ozs7O0lBR0Qsa0JBQWtCLENBQUMsU0FBYztRQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUF3QixLQUFLLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzlGO0tBQ0o7Ozs7O0lBR0QsU0FBUztRQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO0tBQzdCOzs7Ozt1QkE1Rm1DLEVBQUU7Ozs7cUJBR3RCLElBQUksT0FBTyxFQUFnQjs7WUFQOUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBDb25kdWl0U3ViamVjdCB9IGZyb20gJy4vY29uZHVpdC1zdWJqZWN0JztcbmltcG9ydCB7IENvbmR1aXRFdmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LWV2ZW50JztcbmltcG9ydCB7IENvbmR1aXRNZXRhZGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbmR1aXRQcm9wZXJ0aWVzIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtcHJvcGVydGllcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25kdWl0Wm9uZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICAvKiogQ3JlYXRlIGEgZ2xvYmFsIHN1YmplY3Qgc3RvcmUgKi9cbiAgICBzdGF0aWMgc3ViamVjdHM6IENvbmR1aXRTdWJqZWN0W10gPSBbXTtcblxuICAgIC8qKiBFeHBvc2UgYW4gZXZlbnQgc3RyZWFtIG9mIG5ldyB2YWx1ZXMgKi9cbiAgICBzdGF0aWMgZXZlbnRzID0gbmV3IFN1YmplY3Q8Q29uZHVpdEV2ZW50PigpO1xuXG4gICAgLyoqIFN0b3JlIHRoZSB6b25lIG5hbWUgKi9cbiAgICBwcml2YXRlIF96b25lSWQ6IHN0cmluZztcblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyBmaW5kIGFsbCBjb25kdWl0IHN1YmplY3RzIHRoYXQgYXJlIHBhcnQgb2YgdGhpcyB6b25lXG4gICAgICAgIENvbmR1aXRab25lLnN1YmplY3RzLmZpbHRlcihfc3ViamVjdCA9PiBfc3ViamVjdC56b25lSWQgPT09IHRoaXMuX3pvbmVJZClcbiAgICAgICAgICAgIC5mb3JFYWNoKF9zdWJqZWN0ID0+IHRoaXMudW5yZWdpc3RlckNvbmR1aXQoX3N1YmplY3QuY29uZHVpdCkpO1xuICAgIH1cblxuICAgIC8qKiBTdG9yZSByZWZlcmVuY2UgdG8gdGhlIHJlcG9zaXRvcnkgYW5kIGJlZ2luIHdhdGNoaW5nIGZvciBhbmQgZW1pdHRpbmcgY2hhbmdlcyAqL1xuICAgIHJlZ2lzdGVyQ29uZHVpdChjb25kdWl0OiBDb25kdWl0TWV0YWRhdGEpOiB2b2lkIHtcbiAgICAgICAgQ29uZHVpdFpvbmUuc3ViamVjdHMucHVzaChuZXcgQ29uZHVpdFN1YmplY3QoY29uZHVpdCwgdGhpcywgdGhpcy5fem9uZUlkKSk7XG4gICAgfVxuXG4gICAgLyoqIERlc3Ryb3kgYSBjb25kdWl0ICovXG4gICAgdW5yZWdpc3RlckNvbmR1aXQoY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLmdldENvbmR1aXRTdWJqZWN0KGNvbmR1aXQuc3ViamVjdCk7XG5cbiAgICAgICAgaWYgKHN1YmplY3QpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgc3ViamVjdCBmcm9tIHRoZSBpbnRlcm5hbCBsaXN0IG9mIGNvbmR1aXQgc3ViamVjdHNcbiAgICAgICAgICAgIENvbmR1aXRab25lLnN1YmplY3RzID0gQ29uZHVpdFpvbmUuc3ViamVjdHMuZmlsdGVyKF9zdWJqZWN0ID0+IF9zdWJqZWN0ICE9PSBzdWJqZWN0KTtcblxuICAgICAgICAgICAgLy8gcGVyZm9ybSBhbGwgdW5zdWJzY3JpcHRpb25zXG4gICAgICAgICAgICBzdWJqZWN0LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQcm92aWRlIHRoZSB6b25lIHdpdGggYW4gSUQgKi9cbiAgICBzZXRab25lSWQoem9uZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fem9uZUlkID0gem9uZUlkO1xuICAgIH1cblxuICAgIC8qKiBFbWl0IGEgdmFsdWUgdG8gYWxsIHpvbmVzIGZvciBjaGVja2luZyAqL1xuICAgIGVtaXQoZXZlbnQ6IENvbmR1aXRFdmVudCk6IHZvaWQge1xuICAgICAgICBDb25kdWl0Wm9uZS5ldmVudHMubmV4dChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHJpZXZlIGEgY29uZHVpdCBzdWJzamVjdCBvYmplY3QgZnJvbSB0aGUgcnhqcyBzdWJqZWN0ICovXG4gICAgZ2V0Q29uZHVpdFN1YmplY3Qoc3ViamVjdDogU3ViamVjdDxhbnk+KTogQ29uZHVpdFN1YmplY3QgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIENvbmR1aXRab25lLnN1YmplY3RzLmZpbmQoX3N1YmplY3QgPT4gX3N1YmplY3QuY29uZHVpdC5zdWJqZWN0ID09PSBzdWJqZWN0KTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGFsbCBzdWJqZWN0cyBmcm9tIGFsbCB6b25lcyAqL1xuICAgIGdldFN1YmplY3RzKCk6IENvbmR1aXRTdWJqZWN0W10ge1xuICAgICAgICByZXR1cm4gQ29uZHVpdFpvbmUuc3ViamVjdHM7XG4gICAgfVxuXG4gICAgLyoqIEFsdGVyIHRoZSBwcm9wZXJ0aWVzIG9mIGEgY29uZHVpdCBkeW5hbWljYWxseSAqL1xuICAgIHNldENvbmR1aXRQcm9wZXJ0aWVzKHN1YmplY3Q6IFN1YmplY3Q8YW55PiwgcHJvcGVydGllczogUGFydGlhbDxDb25kdWl0UHJvcGVydGllcz4pOiB2b2lkIHtcblxuICAgICAgICAvLyBmaW5kIHRoZSBjb25kdWl0IHdpdGggdGhlIG1hdGNoaW5nIHN1YmplY3RcbiAgICAgICAgY29uc3QgY29uZHVpdFN1YmplY3QgPSB0aGlzLmdldFN1YmplY3RzKCkuZmluZChfY29uZHVpdCA9PiBfY29uZHVpdC5jb25kdWl0LnN1YmplY3QgPT09IHN1YmplY3QpO1xuXG4gICAgICAgIC8vIGlmIGEgbWF0Y2ggd2FzIGZvdW5kIHVwZGF0ZSB0aGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoY29uZHVpdFN1YmplY3QpIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGVhY2ggc3BlY2lmaWVkIHByb3BlcnR5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGNvbmR1aXRTdWJqZWN0LmNvbmR1aXRbcHJvcF0gPSBwcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFByb2dyYW1tYXRpY2FsbHkgY3JlYXRlIGEgY29uZHVpdCBhdCBydW50aW1lICovXG4gICAgY3JlYXRlQ29uZHVpdChzdWJqZWN0OiBTdWJqZWN0PGFueT4sIHByb3BlcnRpZXM6IENvbmR1aXRQcm9wZXJ0aWVzKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVnaXN0ZXIgdGhlIGNvbmR1aXQgd2l0aCB0aGUgem9uZVxuICAgICAgICB0aGlzLnJlZ2lzdGVyQ29uZHVpdCh7IC4uLnByb3BlcnRpZXMsIHN1YmplY3QgfSk7XG4gICAgfVxuXG4gICAgLyoqIFJlZ2lzdGVyIGFsbCBjb25kdWl0cyBpbiBhIGNvbXBvbmVudCAqL1xuICAgIHJlZ2lzdGVyQ29uZHVpdHMoY29tcG9uZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tcG9uZW50Ll9jb25kdWl0cykpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fY29uZHVpdHMuZm9yRWFjaCgoY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhKSA9PiB0aGlzLnJlZ2lzdGVyQ29uZHVpdCh7IC4uLmNvbmR1aXQsIHN1YmplY3Q6IGNvbXBvbmVudFtjb25kdWl0LnByb3BlcnR5S2V5XSB9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmVnaXN0ZXIgYWxsIGNvbmR1aXRzIGluIGEgY29tcG9uZW50ICovXG4gICAgdW5yZWdpc3RlckNvbmR1aXRzKGNvbXBvbmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudC5fY29uZHVpdHMpKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuX2NvbmR1aXRzLmZvckVhY2goKGNvbmR1aXQ6IENvbmR1aXRNZXRhZGF0YSkgPT4gdGhpcy51bnJlZ2lzdGVyQ29uZHVpdChjb25kdWl0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0dXJuIHRoZSBnbG9iYWwgZXZlbnQgc3RyZWFtICovXG4gICAgZ2V0RXZlbnRzKCk6IFN1YmplY3Q8Q29uZHVpdEV2ZW50PiB7XG4gICAgICAgIHJldHVybiBDb25kdWl0Wm9uZS5ldmVudHM7XG4gICAgfVxufVxuIl19