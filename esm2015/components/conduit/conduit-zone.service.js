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
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC16b25lLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQtem9uZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTW5ELE1BQU07Ozs7SUFXRixXQUFXOztRQUVQLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BFLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUN0RTs7Ozs7O0lBR0QsZUFBZSxDQUFDLE9BQXdCO1FBQ3BDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDOUU7Ozs7OztJQUdELGlCQUFpQixDQUFDLE9BQXdCO1FBQ3RDLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O1lBRVYsV0FBVyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQzs7WUFHckYsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCO0tBQ0o7Ozs7OztJQUdELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7Ozs7SUFHRCxJQUFJLENBQUMsS0FBbUI7UUFDcEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7OztJQUdELGlCQUFpQixDQUFDLE9BQXFCO1FBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUFDO0tBQ3RGOzs7OztJQUdELFdBQVc7UUFDUCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztLQUMvQjs7Ozs7OztJQUdELG9CQUFvQixDQUFDLE9BQXFCLEVBQUUsVUFBc0M7O1FBRzlFLHVCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUM7O1FBR2pHLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7O1lBR2pCLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuRDtTQUNKO0tBQ0o7Ozs7Ozs7SUFHRCxhQUFhLENBQUMsT0FBcUIsRUFBRSxVQUE2Qjs7UUFHOUQsSUFBSSxDQUFDLGVBQWUsbUJBQU0sVUFBVSxJQUFFLE9BQU8sSUFBRyxDQUFDO0tBQ3BEOzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxTQUFjO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQXdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLG1CQUFNLE9BQU8sSUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBRyxDQUFDLENBQUM7U0FDNUk7S0FDSjs7Ozs7O0lBR0Qsa0JBQWtCLENBQUMsU0FBYztRQUM3QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUF3QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUM5RjtLQUNKOzs7OztJQUdELFNBQVM7UUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztLQUM3Qjs7Ozs7dUJBNUZtQyxFQUFFOzs7O3FCQUd0QixJQUFJLE9BQU8sRUFBZ0I7O1lBUDlDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQ29uZHVpdFN1YmplY3QgfSBmcm9tICcuL2NvbmR1aXQtc3ViamVjdCc7XG5pbXBvcnQgeyBDb25kdWl0RXZlbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1ldmVudCc7XG5pbXBvcnQgeyBDb25kdWl0TWV0YWRhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb25kdWl0UHJvcGVydGllcyB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LXByb3BlcnRpZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZHVpdFpvbmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIENyZWF0ZSBhIGdsb2JhbCBzdWJqZWN0IHN0b3JlICovXG4gICAgc3RhdGljIHN1YmplY3RzOiBDb25kdWl0U3ViamVjdFtdID0gW107XG5cbiAgICAvKiogRXhwb3NlIGFuIGV2ZW50IHN0cmVhbSBvZiBuZXcgdmFsdWVzICovXG4gICAgc3RhdGljIGV2ZW50cyA9IG5ldyBTdWJqZWN0PENvbmR1aXRFdmVudD4oKTtcblxuICAgIC8qKiBTdG9yZSB0aGUgem9uZSBuYW1lICovXG4gICAgcHJpdmF0ZSBfem9uZUlkOiBzdHJpbmc7XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gZmluZCBhbGwgY29uZHVpdCBzdWJqZWN0cyB0aGF0IGFyZSBwYXJ0IG9mIHRoaXMgem9uZVxuICAgICAgICBDb25kdWl0Wm9uZS5zdWJqZWN0cy5maWx0ZXIoX3N1YmplY3QgPT4gX3N1YmplY3Quem9uZUlkID09PSB0aGlzLl96b25lSWQpXG4gICAgICAgICAgICAuZm9yRWFjaChfc3ViamVjdCA9PiB0aGlzLnVucmVnaXN0ZXJDb25kdWl0KF9zdWJqZWN0LmNvbmR1aXQpKTtcbiAgICB9XG5cbiAgICAvKiogU3RvcmUgcmVmZXJlbmNlIHRvIHRoZSByZXBvc2l0b3J5IGFuZCBiZWdpbiB3YXRjaGluZyBmb3IgYW5kIGVtaXR0aW5nIGNoYW5nZXMgKi9cbiAgICByZWdpc3RlckNvbmR1aXQoY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhKTogdm9pZCB7XG4gICAgICAgIENvbmR1aXRab25lLnN1YmplY3RzLnB1c2gobmV3IENvbmR1aXRTdWJqZWN0KGNvbmR1aXQsIHRoaXMsIHRoaXMuX3pvbmVJZCkpO1xuICAgIH1cblxuICAgIC8qKiBEZXN0cm95IGEgY29uZHVpdCAqL1xuICAgIHVucmVnaXN0ZXJDb25kdWl0KGNvbmR1aXQ6IENvbmR1aXRNZXRhZGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gdGhpcy5nZXRDb25kdWl0U3ViamVjdChjb25kdWl0LnN1YmplY3QpO1xuXG4gICAgICAgIGlmIChzdWJqZWN0KSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHN1YmplY3QgZnJvbSB0aGUgaW50ZXJuYWwgbGlzdCBvZiBjb25kdWl0IHN1YmplY3RzXG4gICAgICAgICAgICBDb25kdWl0Wm9uZS5zdWJqZWN0cyA9IENvbmR1aXRab25lLnN1YmplY3RzLmZpbHRlcihfc3ViamVjdCA9PiBfc3ViamVjdCAhPT0gc3ViamVjdCk7XG5cbiAgICAgICAgICAgIC8vIHBlcmZvcm0gYWxsIHVuc3Vic2NyaXB0aW9uc1xuICAgICAgICAgICAgc3ViamVjdC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUHJvdmlkZSB0aGUgem9uZSB3aXRoIGFuIElEICovXG4gICAgc2V0Wm9uZUlkKHpvbmVJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3pvbmVJZCA9IHpvbmVJZDtcbiAgICB9XG5cbiAgICAvKiogRW1pdCBhIHZhbHVlIHRvIGFsbCB6b25lcyBmb3IgY2hlY2tpbmcgKi9cbiAgICBlbWl0KGV2ZW50OiBDb25kdWl0RXZlbnQpOiB2b2lkIHtcbiAgICAgICAgQ29uZHVpdFpvbmUuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKiBSZXRyaWV2ZSBhIGNvbmR1aXQgc3Vic2plY3Qgb2JqZWN0IGZyb20gdGhlIHJ4anMgc3ViamVjdCAqL1xuICAgIGdldENvbmR1aXRTdWJqZWN0KHN1YmplY3Q6IFN1YmplY3Q8YW55Pik6IENvbmR1aXRTdWJqZWN0IHwgbnVsbCB7XG4gICAgICAgIHJldHVybiBDb25kdWl0Wm9uZS5zdWJqZWN0cy5maW5kKF9zdWJqZWN0ID0+IF9zdWJqZWN0LmNvbmR1aXQuc3ViamVjdCA9PT0gc3ViamVjdCk7XG4gICAgfVxuXG4gICAgLyoqIEdldCBhbGwgc3ViamVjdHMgZnJvbSBhbGwgem9uZXMgKi9cbiAgICBnZXRTdWJqZWN0cygpOiBDb25kdWl0U3ViamVjdFtdIHtcbiAgICAgICAgcmV0dXJuIENvbmR1aXRab25lLnN1YmplY3RzO1xuICAgIH1cblxuICAgIC8qKiBBbHRlciB0aGUgcHJvcGVydGllcyBvZiBhIGNvbmR1aXQgZHluYW1pY2FsbHkgKi9cbiAgICBzZXRDb25kdWl0UHJvcGVydGllcyhzdWJqZWN0OiBTdWJqZWN0PGFueT4sIHByb3BlcnRpZXM6IFBhcnRpYWw8Q29uZHVpdFByb3BlcnRpZXM+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCB0aGUgY29uZHVpdCB3aXRoIHRoZSBtYXRjaGluZyBzdWJqZWN0XG4gICAgICAgIGNvbnN0IGNvbmR1aXRTdWJqZWN0ID0gdGhpcy5nZXRTdWJqZWN0cygpLmZpbmQoX2NvbmR1aXQgPT4gX2NvbmR1aXQuY29uZHVpdC5zdWJqZWN0ID09PSBzdWJqZWN0KTtcblxuICAgICAgICAvLyBpZiBhIG1hdGNoIHdhcyBmb3VuZCB1cGRhdGUgdGhlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKGNvbmR1aXRTdWJqZWN0KSB7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBlYWNoIHNwZWNpZmllZCBwcm9wZXJ0eVxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBjb25kdWl0U3ViamVjdC5jb25kdWl0W3Byb3BdID0gcHJvcGVydGllc1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBQcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZSBhIGNvbmR1aXQgYXQgcnVudGltZSAqL1xuICAgIGNyZWF0ZUNvbmR1aXQoc3ViamVjdDogU3ViamVjdDxhbnk+LCBwcm9wZXJ0aWVzOiBDb25kdWl0UHJvcGVydGllcyk6IHZvaWQge1xuXG4gICAgICAgIC8vIHJlZ2lzdGVyIHRoZSBjb25kdWl0IHdpdGggdGhlIHpvbmVcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbmR1aXQoeyAuLi5wcm9wZXJ0aWVzLCBzdWJqZWN0IH0pO1xuICAgIH1cblxuICAgIC8qKiBSZWdpc3RlciBhbGwgY29uZHVpdHMgaW4gYSBjb21wb25lbnQgKi9cbiAgICByZWdpc3RlckNvbmR1aXRzKGNvbXBvbmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudC5fY29uZHVpdHMpKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuX2NvbmR1aXRzLmZvckVhY2goKGNvbmR1aXQ6IENvbmR1aXRNZXRhZGF0YSkgPT4gdGhpcy5yZWdpc3RlckNvbmR1aXQoeyAuLi5jb25kdWl0LCBzdWJqZWN0OiBjb21wb25lbnRbY29uZHVpdC5wcm9wZXJ0eUtleV0gfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJlZ2lzdGVyIGFsbCBjb25kdWl0cyBpbiBhIGNvbXBvbmVudCAqL1xuICAgIHVucmVnaXN0ZXJDb25kdWl0cyhjb21wb25lbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnQuX2NvbmR1aXRzKSkge1xuICAgICAgICAgICAgY29tcG9uZW50Ll9jb25kdWl0cy5mb3JFYWNoKChjb25kdWl0OiBDb25kdWl0TWV0YWRhdGEpID0+IHRoaXMudW5yZWdpc3RlckNvbmR1aXQoY29uZHVpdCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJldHVybiB0aGUgZ2xvYmFsIGV2ZW50IHN0cmVhbSAqL1xuICAgIGdldEV2ZW50cygpOiBTdWJqZWN0PENvbmR1aXRFdmVudD4ge1xuICAgICAgICByZXR1cm4gQ29uZHVpdFpvbmUuZXZlbnRzO1xuICAgIH1cbn1cbiJdfQ==