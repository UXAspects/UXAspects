/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
var ConduitSubject = /** @class */ (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC1zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29uZHVpdC9jb25kdWl0LXN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUt2QyxJQUFBO0lBS0ksd0JBQW1CLE9BQXdCLEVBQVUsS0FBa0IsRUFBUyxNQUFjO1FBQTNFLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7MEJBRnpFLElBQUksT0FBTyxFQUFROztRQUtwQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7O1FBR2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7UUFHdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEYsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3pDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOztRQUduRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNuQztJQUVELDZEQUE2RDs7Ozs7O0lBQzdELGlDQUFROzs7OztJQUFSLFVBQVMsS0FBVTs7UUFHZixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7UUFHdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO0tBQ0o7SUFFRCxpREFBaUQ7Ozs7O0lBQ2pELGdDQUFPOzs7O0lBQVA7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7eUJBN0dMO0lBOEdDLENBQUE7QUF4R0QsMEJBd0dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBDb25kdWl0Wm9uZSB9IGZyb20gJy4vY29uZHVpdC16b25lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZHVpdEV2ZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtZXZlbnQnO1xuaW1wb3J0IHsgQ29uZHVpdE1ldGFkYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtbWV0YWRhdGEnO1xuXG5leHBvcnQgY2xhc3MgQ29uZHVpdFN1YmplY3Qge1xuXG4gICAgcHJpdmF0ZSBfc3ViamVjdDogU3ViamVjdDxhbnk+O1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhLCBwcml2YXRlIF96b25lOiBDb25kdWl0Wm9uZSwgcHVibGljIHpvbmVJZDogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHRhcmdldCBzdWJqZWN0IG9iamVjdFxuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gY29uZHVpdC5zdWJqZWN0O1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgY29uZHVpdHMgdGhhdCBoYXZlIHN1cHBsaWVkIGFuIGluaXRpYWwgdmFsdWVcbiAgICAgICAgdGhpcy5nZXRJbml0aWFsVmFsdWUoKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyB0byB0aGUgc291cmNlIHN1YmplY3RcbiAgICAgICAgdGhpcy5fc3ViamVjdC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbmR1aXQuY2hhbmdlRGV0ZWN0aW9uKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25PdXRwdXQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIHRoZSB6b25lIGV2ZW50cyBhbmQgcm9vdCB6b25lIGV2ZW50c1xuICAgICAgICBfem9uZS5nZXRFdmVudHMoKS5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5jb25kdWl0LmlkID09PSBjb25kdWl0LmlkKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrIGFsbCBhbGxvdyBpbnB1dHMgdG8gc2VlIGlmIHRoZXJlIGlzIGEgdmFsdWUgd2Ugc2hvdWxkIGluaXRpYWxseSBzZXQgdGhlIGNvbmR1aXQgdG8gKi9cbiAgICBnZXRJbml0aWFsVmFsdWUoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgd2UgZG8gbm90IGFjY2VwdCBpbnB1dHMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIGFsbCBzdWJqZWN0cyB0aGF0IGFyZSAxKSBOb3QgaXRzZWxmIDIpIEluIGEgem9uZSB0aGF0IGlzIGxpc3RlZCBpbiBhY2NlcHRzSW5wdXQgMykgSGF2ZSBhIGN1cnJlbnRWYWx1ZSBzZXRcbiAgICAgICAgY29uc3Qgc3ViamVjdHMgPSB0aGlzLl96b25lLmdldFN1YmplY3RzKCkuZmlsdGVyKHN1YmplY3QgPT4ge1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGl0c2VsZiBvciBpZiBpdCBoYXMgbm90IHZhbHVlIHRvIGdpdmUgdXMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgICAgICBpZiAoc3ViamVjdCA9PT0gdGhpcyB8fCBzdWJqZWN0LmNvbmR1aXQuaWQgIT09IHRoaXMuY29uZHVpdC5pZCB8fCAhc3ViamVjdC5jb25kdWl0Lmhhc093blByb3BlcnR5KCdjdXJyZW50VmFsdWUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgYWNjZXB0c0lucHV0IGlzIHRydWUgdGhlbiB3ZSByZXR1cm4gZXZlcnkgdGltZVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dC5pbmRleE9mKHN1YmplY3Quem9uZUlkKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtYXRjaGVzIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoc3ViamVjdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2Ugc29ydCBieSB0aGUgbGFzdCBtb2RpZmllZCBmaWVsZFxuICAgICAgICBzdWJqZWN0cy5zb3J0KChzdWJqZWN0T25lLCBzdWJqZWN0VHdvKSA9PiBzdWJqZWN0T25lLmNvbmR1aXQubGFzdE1vZGlmaWVkLmdldFRpbWUoKSA8IHN1YmplY3RUd28uY29uZHVpdC5sYXN0TW9kaWZpZWQuZ2V0VGltZSgpID8gMSA6IC0xKTtcblxuICAgICAgICAvLyBnZXQgdGhlIG1vc3QgcmVjZW50IHZhbHVlXG4gICAgICAgIHRoaXMuX3N1YmplY3QubmV4dChzdWJqZWN0c1swXS5jb25kdWl0LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFRoaXMgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBhIGNvbmR1aXRzIHZhbHVlIGhhcyBjaGFuZ2VkICovXG4gICAgb25JbnB1dChldmVudDogQ29uZHVpdEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHdlIGRvbnQgYWNjZXB0IGlucHV0IG9yIHdlIGVtaXR0ZWQgdGhpcyB2YWx1ZSB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQgPT09IGZhbHNlIHx8IGV2ZW50LmNvbmR1aXQgPT09IHRoaXMuY29uZHVpdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNvbmR1aXQgcHJvZHVjZXMgb3V0cHV0IC0gaWYgbm90IHdlIG9ubHkgZG8gc29tZXRoaW5nIGlmIHdlIGFyZSBpbiB0aGUgc2FtZSB6b25lXG4gICAgICAgIGlmIChldmVudC5jb25kdWl0LnByb2R1Y2VzT3V0cHV0ID09PSBmYWxzZSAmJiBldmVudC56b25lSWQgIT09IHRoaXMuem9uZUlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBvbmx5IGFjY2VwdCBpbnB1dHMgZnJvbSBzcGVjaWZpYyB6b25lc1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0KSkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGV2ZW50IGNhbWUgZnJvbSBhbiBhY2NlcHRhYmxlIHpvbmVcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dC5maW5kKHpvbmUgPT4gem9uZSA9PT0gZXZlbnQuem9uZUlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHJlcXVpcmVkIHRyYW5zZm9ybSB0aGUgdmFsdWVcbiAgICAgICAgY29uc3Qgb3V0cHV0VmFsdWUgPSB0aGlzLmNvbmR1aXQubWFwID8gdGhpcy5jb25kdWl0Lm1hcChldmVudC52YWx1ZSkgOiBldmVudC52YWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHN1YmplY3RcbiAgICAgICAgdGhpcy5fc3ViamVjdC5uZXh0KG91dHB1dFZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogVGhpcyB3aWxsIGJlIGZpcmVkIHdoZW4gdGhpcyBjb25kdWl0IGVtaXRzIGEgbmV3IHZhbHVlICovXG4gICAgb25PdXRwdXQodmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBtb3N0IHJlY2VudCB2YWx1ZSBhbmQgd2hlbiBpdCB3YXMgbW9kaWZpZWQgLSBjYW4gYmUgdXNlZCBmb3IgYW55IG5ldyBjb25kdWl0cyB0byBsb29rdXAgYSB2YWx1ZVxuICAgICAgICB0aGlzLmNvbmR1aXQuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29uZHVpdC5sYXN0TW9kaWZpZWQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgc2hvdWxkIHByb2R1Y2Ugb3V0cHV0XG4gICAgICAgIGlmICh0aGlzLmNvbmR1aXQucHJvZHVjZXNPdXRwdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUuZW1pdCh7IGNvbmR1aXQ6IHRoaXMuY29uZHVpdCwgem9uZUlkOiB0aGlzLnpvbmVJZCwgdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgb25jZSB0aGlzIHN1YmplY3QgaXMgZGVzdHJveWVkICovXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIl19