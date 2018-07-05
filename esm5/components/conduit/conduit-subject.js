/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var ConduitSubject = (function () {
    function ConduitSubject(conduit, _zone, zoneId) {
        this.conduit = conduit;
        this._zone = _zone;
        this.zoneId = zoneId;
        this._onDestroy = new Subject();
        // store the target subject object
        this._subject = conduit.subject;
        // check if there are any conduits that have supplied an initial value
        this.getInitialValue();
        // subscribe to changes to the source subject
        this._subject.pipe(distinctUntilChanged(conduit.changeDetection), takeUntil(this._onDestroy))
            .subscribe(this.onOutput.bind(this));
        // subscribe to the zone events and root zone events
        _zone.getEvents().pipe(filter(function (event) { return event.conduit.id === conduit.id; }), takeUntil(this._onDestroy)).subscribe(this.onInput.bind(this));
    }
    /** Check all allow inputs to see if there is a value we should initially set the conduit to */
    /**
     * Check all allow inputs to see if there is a value we should initially set the conduit to
     * @return {?}
     */
    ConduitSubject.prototype.getInitialValue = /**
     * Check all allow inputs to see if there is a value we should initially set the conduit to
     * @return {?}
     */
    function () {
        var _this = this;
        // if we do not accept inputs then do nothing
        if (this.conduit.acceptsInput === false) {
            return;
        }
        // return all subjects that are 1) Not itself 2) In a zone that is listed in acceptsInput 3) Have a currentValue set
        var /** @type {?} */ subjects = this._zone.getSubjects().filter(function (subject) {
            // If this is itself or if it has not value to give us then do nothing
            if (subject === _this || subject.conduit.id !== _this.conduit.id || !subject.conduit.hasOwnProperty('currentValue')) {
                return false;
            }
            // if acceptsInput is true then we return every time
            if (_this.conduit.acceptsInput === true) {
                return true;
            }
            if (Array.isArray(_this.conduit.acceptsInput)) {
                return _this.conduit.acceptsInput.indexOf(subject.zoneId) !== -1;
            }
        });
        // if there are no matches then do nothing
        if (subjects.length === 0) {
            return;
        }
        // otherwise sort by the last modified field
        subjects.sort(function (subjectOne, subjectTwo) { return subjectOne.conduit.lastModified.getTime() < subjectTwo.conduit.lastModified.getTime() ? 1 : -1; });
        // get the most recent value
        this._subject.next(subjects[0].conduit.currentValue);
    };
    /** This will be triggered when a conduits value has changed */
    /**
     * This will be triggered when a conduits value has changed
     * @param {?} event
     * @return {?}
     */
    ConduitSubject.prototype.onInput = /**
     * This will be triggered when a conduits value has changed
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // if we dont accept input or we emitted this value then do nothing
        if (this.conduit.acceptsInput === false || event.conduit === this.conduit) {
            return;
        }
        // check if the conduit produces output - if not we only do something if we are in the same zone
        if (event.conduit.producesOutput === false && event.zoneId !== this.zoneId) {
            return;
        }
        // check if we only accept inputs from specific zones
        if (Array.isArray(this.conduit.acceptsInput)) {
            // check if the event came from an acceptable zone
            if (!this.conduit.acceptsInput.find(function (zone) { return zone === event.zoneId; })) {
                return;
            }
        }
        // if required transform the value
        var /** @type {?} */ outputValue = this.conduit.map ? this.conduit.map(event.value) : event.value;
        // update the subject
        this._subject.next(outputValue);
    };
    /** This will be fired when this conduit emits a new value */
    /**
     * This will be fired when this conduit emits a new value
     * @param {?} value
     * @return {?}
     */
    ConduitSubject.prototype.onOutput = /**
     * This will be fired when this conduit emits a new value
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // store the most recent value and when it was modified - can be used for any new conduits to lookup a value
        this.conduit.currentValue = value;
        this.conduit.lastModified = new Date();
        // check if this should produce output
        if (this.conduit.producesOutput) {
            this._zone.emit({ conduit: this.conduit, zoneId: this.zoneId, value: value });
        }
    };
    /** Unsubscribe once this subject is destroyed */
    /**
     * Unsubscribe once this subject is destroyed
     * @return {?}
     */
    ConduitSubject.prototype.destroy = /**
     * Unsubscribe once this subject is destroyed
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    return ConduitSubject;
}());
export { ConduitSubject };
function ConduitSubject_tsickle_Closure_declarations() {
    /** @type {?} */
    ConduitSubject.prototype._subject;
    /** @type {?} */
    ConduitSubject.prototype._onDestroy;
    /** @type {?} */
    ConduitSubject.prototype.conduit;
    /** @type {?} */
    ConduitSubject.prototype._zone;
    /** @type {?} */
    ConduitSubject.prototype.zoneId;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC1zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29uZHVpdC9jb25kdWl0LXN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUt2QyxJQUFBO0lBS0ksd0JBQW1CLE9BQXdCLEVBQVUsS0FBa0IsRUFBUyxNQUFjO1FBQTNFLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7MEJBRnpFLElBQUksT0FBTyxFQUFROztRQUtwQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7O1FBR2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFHdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEYsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3pDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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R25GLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsNkRBQTZEOzs7Ozs7SUFDN0QsaUNBQVE7Ozs7O0lBQVIsVUFBUyxLQUFVOztRQUdmLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDOztRQUd2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7U0FDMUU7S0FDSjtJQUVELGlEQUFpRDs7Ozs7SUFDakQsZ0NBQU87Ozs7SUFBUDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjt5QkE3R0w7SUE4R0MsQ0FBQTtBQXhHRCwwQkF3R0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IENvbmR1aXRab25lIH0gZnJvbSAnLi9jb25kdWl0LXpvbmUuc2VydmljZSc7XG5pbXBvcnQgeyBDb25kdWl0RXZlbnQgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1ldmVudCc7XG5pbXBvcnQgeyBDb25kdWl0TWV0YWRhdGEgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1tZXRhZGF0YSc7XG5cbmV4cG9ydCBjbGFzcyBDb25kdWl0U3ViamVjdCB7XG5cbiAgICBwcml2YXRlIF9zdWJqZWN0OiBTdWJqZWN0PGFueT47XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb25kdWl0OiBDb25kdWl0TWV0YWRhdGEsIHByaXZhdGUgX3pvbmU6IENvbmR1aXRab25lLCBwdWJsaWMgem9uZUlkOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgdGFyZ2V0IHN1YmplY3Qgb2JqZWN0XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBjb25kdWl0LnN1YmplY3Q7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSBjb25kdWl0cyB0aGF0IGhhdmUgc3VwcGxpZWQgYW4gaW5pdGlhbCB2YWx1ZVxuICAgICAgICB0aGlzLmdldEluaXRpYWxWYWx1ZSgpO1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBzb3VyY2Ugc3ViamVjdFxuICAgICAgICB0aGlzLl9zdWJqZWN0LnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoY29uZHVpdC5jaGFuZ2VEZXRlY3Rpb24pLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy5vbk91dHB1dC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIHpvbmUgZXZlbnRzIGFuZCByb290IHpvbmUgZXZlbnRzXG4gICAgICAgIF96b25lLmdldEV2ZW50cygpLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmNvbmR1aXQuaWQgPT09IGNvbmR1aXQuaWQpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHRoaXMub25JbnB1dC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKiogQ2hlY2sgYWxsIGFsbG93IGlucHV0cyB0byBzZWUgaWYgdGhlcmUgaXMgYSB2YWx1ZSB3ZSBzaG91bGQgaW5pdGlhbGx5IHNldCB0aGUgY29uZHVpdCB0byAqL1xuICAgIGdldEluaXRpYWxWYWx1ZSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB3ZSBkbyBub3QgYWNjZXB0IGlucHV0cyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gYWxsIHN1YmplY3RzIHRoYXQgYXJlIDEpIE5vdCBpdHNlbGYgMikgSW4gYSB6b25lIHRoYXQgaXMgbGlzdGVkIGluIGFjY2VwdHNJbnB1dCAzKSBIYXZlIGEgY3VycmVudFZhbHVlIHNldFxuICAgICAgICBjb25zdCBzdWJqZWN0cyA9IHRoaXMuX3pvbmUuZ2V0U3ViamVjdHMoKS5maWx0ZXIoc3ViamVjdCA9PiB7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgaXRzZWxmIG9yIGlmIGl0IGhhcyBub3QgdmFsdWUgdG8gZ2l2ZSB1cyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIGlmIChzdWJqZWN0ID09PSB0aGlzIHx8IHN1YmplY3QuY29uZHVpdC5pZCAhPT0gdGhpcy5jb25kdWl0LmlkIHx8ICFzdWJqZWN0LmNvbmR1aXQuaGFzT3duUHJvcGVydHkoJ2N1cnJlbnRWYWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBhY2NlcHRzSW5wdXQgaXMgdHJ1ZSB0aGVuIHdlIHJldHVybiBldmVyeSB0aW1lXG4gICAgICAgICAgICBpZiAodGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0LmluZGV4T2Yoc3ViamVjdC56b25lSWQpICE9PSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1hdGNoZXMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmIChzdWJqZWN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSBzb3J0IGJ5IHRoZSBsYXN0IG1vZGlmaWVkIGZpZWxkXG4gICAgICAgIHN1YmplY3RzLnNvcnQoKHN1YmplY3RPbmUsIHN1YmplY3RUd28pID0+IHN1YmplY3RPbmUuY29uZHVpdC5sYXN0TW9kaWZpZWQuZ2V0VGltZSgpIDwgc3ViamVjdFR3by5jb25kdWl0Lmxhc3RNb2RpZmllZC5nZXRUaW1lKCkgPyAxIDogLTEpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgbW9zdCByZWNlbnQgdmFsdWVcbiAgICAgICAgdGhpcy5fc3ViamVjdC5uZXh0KHN1YmplY3RzWzBdLmNvbmR1aXQuY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogVGhpcyB3aWxsIGJlIHRyaWdnZXJlZCB3aGVuIGEgY29uZHVpdHMgdmFsdWUgaGFzIGNoYW5nZWQgKi9cbiAgICBvbklucHV0KGV2ZW50OiBDb25kdWl0RXZlbnQpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgd2UgZG9udCBhY2NlcHQgaW5wdXQgb3Igd2UgZW1pdHRlZCB0aGlzIHZhbHVlIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dCA9PT0gZmFsc2UgfHwgZXZlbnQuY29uZHVpdCA9PT0gdGhpcy5jb25kdWl0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgY29uZHVpdCBwcm9kdWNlcyBvdXRwdXQgLSBpZiBub3Qgd2Ugb25seSBkbyBzb21ldGhpbmcgaWYgd2UgYXJlIGluIHRoZSBzYW1lIHpvbmVcbiAgICAgICAgaWYgKGV2ZW50LmNvbmR1aXQucHJvZHVjZXNPdXRwdXQgPT09IGZhbHNlICYmIGV2ZW50LnpvbmVJZCAhPT0gdGhpcy56b25lSWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIG9ubHkgYWNjZXB0IGlucHV0cyBmcm9tIHNwZWNpZmljIHpvbmVzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQpKSB7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZXZlbnQgY2FtZSBmcm9tIGFuIGFjY2VwdGFibGUgem9uZVxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0LmZpbmQoem9uZSA9PiB6b25lID09PSBldmVudC56b25lSWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgcmVxdWlyZWQgdHJhbnNmb3JtIHRoZSB2YWx1ZVxuICAgICAgICBjb25zdCBvdXRwdXRWYWx1ZSA9IHRoaXMuY29uZHVpdC5tYXAgPyB0aGlzLmNvbmR1aXQubWFwKGV2ZW50LnZhbHVlKSA6IGV2ZW50LnZhbHVlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc3ViamVjdFxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5leHQob3V0cHV0VmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBUaGlzIHdpbGwgYmUgZmlyZWQgd2hlbiB0aGlzIGNvbmR1aXQgZW1pdHMgYSBuZXcgdmFsdWUgKi9cbiAgICBvbk91dHB1dCh2YWx1ZTogYW55KTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIG1vc3QgcmVjZW50IHZhbHVlIGFuZCB3aGVuIGl0IHdhcyBtb2RpZmllZCAtIGNhbiBiZSB1c2VkIGZvciBhbnkgbmV3IGNvbmR1aXRzIHRvIGxvb2t1cCBhIHZhbHVlXG4gICAgICAgIHRoaXMuY29uZHVpdC5jdXJyZW50VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jb25kdWl0Lmxhc3RNb2RpZmllZCA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBzaG91bGQgcHJvZHVjZSBvdXRwdXRcbiAgICAgICAgaWYgKHRoaXMuY29uZHVpdC5wcm9kdWNlc091dHB1dCkge1xuICAgICAgICAgICAgdGhpcy5fem9uZS5lbWl0KHsgY29uZHVpdDogdGhpcy5jb25kdWl0LCB6b25lSWQ6IHRoaXMuem9uZUlkLCB2YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVbnN1YnNjcmliZSBvbmNlIHRoaXMgc3ViamVjdCBpcyBkZXN0cm95ZWQgKi9cbiAgICBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG59XG4iXX0=