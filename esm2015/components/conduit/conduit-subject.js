/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
export class ConduitSubject {
    /**
     * @param {?} conduit
     * @param {?} _zone
     * @param {?} zoneId
     */
    constructor(conduit, _zone, zoneId) {
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
        _zone.getEvents().pipe(filter(event => event.conduit.id === conduit.id), takeUntil(this._onDestroy)).subscribe(this.onInput.bind(this));
    }
    /**
     * Check all allow inputs to see if there is a value we should initially set the conduit to
     * @return {?}
     */
    getInitialValue() {
        // if we do not accept inputs then do nothing
        if (this.conduit.acceptsInput === false) {
            return;
        }
        // return all subjects that are 1) Not itself 2) In a zone that is listed in acceptsInput 3) Have a currentValue set
        const /** @type {?} */ subjects = this._zone.getSubjects().filter(subject => {
            // If this is itself or if it has not value to give us then do nothing
            if (subject === this || subject.conduit.id !== this.conduit.id || !subject.conduit.hasOwnProperty('currentValue')) {
                return false;
            }
            // if acceptsInput is true then we return every time
            if (this.conduit.acceptsInput === true) {
                return true;
            }
            if (Array.isArray(this.conduit.acceptsInput)) {
                return this.conduit.acceptsInput.indexOf(subject.zoneId) !== -1;
            }
        });
        // if there are no matches then do nothing
        if (subjects.length === 0) {
            return;
        }
        // otherwise sort by the last modified field
        subjects.sort((subjectOne, subjectTwo) => subjectOne.conduit.lastModified.getTime() < subjectTwo.conduit.lastModified.getTime() ? 1 : -1);
        // get the most recent value
        this._subject.next(subjects[0].conduit.currentValue);
    }
    /**
     * This will be triggered when a conduits value has changed
     * @param {?} event
     * @return {?}
     */
    onInput(event) {
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
            if (!this.conduit.acceptsInput.find(zone => zone === event.zoneId)) {
                return;
            }
        }
        // if required transform the value
        const /** @type {?} */ outputValue = this.conduit.map ? this.conduit.map(event.value) : event.value;
        // update the subject
        this._subject.next(outputValue);
    }
    /**
     * This will be fired when this conduit emits a new value
     * @param {?} value
     * @return {?}
     */
    onOutput(value) {
        // store the most recent value and when it was modified - can be used for any new conduits to lookup a value
        this.conduit.currentValue = value;
        this.conduit.lastModified = new Date();
        // check if this should produce output
        if (this.conduit.producesOutput) {
            this._zone.emit({ conduit: this.conduit, zoneId: this.zoneId, value });
        }
    }
    /**
     * Unsubscribe once this subject is destroyed
     * @return {?}
     */
    destroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC1zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29uZHVpdC9jb25kdWl0LXN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUt2QyxNQUFNOzs7Ozs7SUFLRixZQUFtQixPQUF3QixFQUFVLEtBQWtCLEVBQVMsTUFBYztRQUEzRSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFROzBCQUZ6RSxJQUFJLE9BQU8sRUFBUTs7UUFLcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDOztRQUdoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBR3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hGLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUd6QyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENB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QUFDLENBQUM7S0FDbkM7Ozs7OztJQUdELFFBQVEsQ0FBQyxLQUFVOztRQUdmLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDOztRQUd2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO0tBQ0o7Ozs7O0lBR0QsT0FBTztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5QjtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBDb25kdWl0Wm9uZSB9IGZyb20gJy4vY29uZHVpdC16b25lLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZHVpdEV2ZW50IH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtZXZlbnQnO1xuaW1wb3J0IHsgQ29uZHVpdE1ldGFkYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtbWV0YWRhdGEnO1xuXG5leHBvcnQgY2xhc3MgQ29uZHVpdFN1YmplY3Qge1xuXG4gICAgcHJpdmF0ZSBfc3ViamVjdDogU3ViamVjdDxhbnk+O1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZHVpdDogQ29uZHVpdE1ldGFkYXRhLCBwcml2YXRlIF96b25lOiBDb25kdWl0Wm9uZSwgcHVibGljIHpvbmVJZDogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIHRhcmdldCBzdWJqZWN0IG9iamVjdFxuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gY29uZHVpdC5zdWJqZWN0O1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGFyZSBhbnkgY29uZHVpdHMgdGhhdCBoYXZlIHN1cHBsaWVkIGFuIGluaXRpYWwgdmFsdWVcbiAgICAgICAgdGhpcy5nZXRJbml0aWFsVmFsdWUoKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyB0byB0aGUgc291cmNlIHN1YmplY3RcbiAgICAgICAgdGhpcy5fc3ViamVjdC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKGNvbmR1aXQuY2hhbmdlRGV0ZWN0aW9uKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMub25PdXRwdXQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIHRoZSB6b25lIGV2ZW50cyBhbmQgcm9vdCB6b25lIGV2ZW50c1xuICAgICAgICBfem9uZS5nZXRFdmVudHMoKS5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5jb25kdWl0LmlkID09PSBjb25kdWl0LmlkKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh0aGlzLm9uSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqIENoZWNrIGFsbCBhbGxvdyBpbnB1dHMgdG8gc2VlIGlmIHRoZXJlIGlzIGEgdmFsdWUgd2Ugc2hvdWxkIGluaXRpYWxseSBzZXQgdGhlIGNvbmR1aXQgdG8gKi9cbiAgICBnZXRJbml0aWFsVmFsdWUoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgd2UgZG8gbm90IGFjY2VwdCBpbnB1dHMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmV0dXJuIGFsbCBzdWJqZWN0cyB0aGF0IGFyZSAxKSBOb3QgaXRzZWxmIDIpIEluIGEgem9uZSB0aGF0IGlzIGxpc3RlZCBpbiBhY2NlcHRzSW5wdXQgMykgSGF2ZSBhIGN1cnJlbnRWYWx1ZSBzZXRcbiAgICAgICAgY29uc3Qgc3ViamVjdHMgPSB0aGlzLl96b25lLmdldFN1YmplY3RzKCkuZmlsdGVyKHN1YmplY3QgPT4ge1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIGl0c2VsZiBvciBpZiBpdCBoYXMgbm90IHZhbHVlIHRvIGdpdmUgdXMgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgICAgICBpZiAoc3ViamVjdCA9PT0gdGhpcyB8fCBzdWJqZWN0LmNvbmR1aXQuaWQgIT09IHRoaXMuY29uZHVpdC5pZCB8fCAhc3ViamVjdC5jb25kdWl0Lmhhc093blByb3BlcnR5KCdjdXJyZW50VmFsdWUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgYWNjZXB0c0lucHV0IGlzIHRydWUgdGhlbiB3ZSByZXR1cm4gZXZlcnkgdGltZVxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dC5pbmRleE9mKHN1YmplY3Quem9uZUlkKSAhPT0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtYXRjaGVzIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoc3ViamVjdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2Ugc29ydCBieSB0aGUgbGFzdCBtb2RpZmllZCBmaWVsZFxuICAgICAgICBzdWJqZWN0cy5zb3J0KChzdWJqZWN0T25lLCBzdWJqZWN0VHdvKSA9PiBzdWJqZWN0T25lLmNvbmR1aXQubGFzdE1vZGlmaWVkLmdldFRpbWUoKSA8IHN1YmplY3RUd28uY29uZHVpdC5sYXN0TW9kaWZpZWQuZ2V0VGltZSgpID8gMSA6IC0xKTtcblxuICAgICAgICAvLyBnZXQgdGhlIG1vc3QgcmVjZW50IHZhbHVlXG4gICAgICAgIHRoaXMuX3N1YmplY3QubmV4dChzdWJqZWN0c1swXS5jb25kdWl0LmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFRoaXMgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBhIGNvbmR1aXRzIHZhbHVlIGhhcyBjaGFuZ2VkICovXG4gICAgb25JbnB1dChldmVudDogQ29uZHVpdEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHdlIGRvbnQgYWNjZXB0IGlucHV0IG9yIHdlIGVtaXR0ZWQgdGhpcyB2YWx1ZSB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQgPT09IGZhbHNlIHx8IGV2ZW50LmNvbmR1aXQgPT09IHRoaXMuY29uZHVpdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGNvbmR1aXQgcHJvZHVjZXMgb3V0cHV0IC0gaWYgbm90IHdlIG9ubHkgZG8gc29tZXRoaW5nIGlmIHdlIGFyZSBpbiB0aGUgc2FtZSB6b25lXG4gICAgICAgIGlmIChldmVudC5jb25kdWl0LnByb2R1Y2VzT3V0cHV0ID09PSBmYWxzZSAmJiBldmVudC56b25lSWQgIT09IHRoaXMuem9uZUlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBvbmx5IGFjY2VwdCBpbnB1dHMgZnJvbSBzcGVjaWZpYyB6b25lc1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0KSkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGV2ZW50IGNhbWUgZnJvbSBhbiBhY2NlcHRhYmxlIHpvbmVcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dC5maW5kKHpvbmUgPT4gem9uZSA9PT0gZXZlbnQuem9uZUlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHJlcXVpcmVkIHRyYW5zZm9ybSB0aGUgdmFsdWVcbiAgICAgICAgY29uc3Qgb3V0cHV0VmFsdWUgPSB0aGlzLmNvbmR1aXQubWFwID8gdGhpcy5jb25kdWl0Lm1hcChldmVudC52YWx1ZSkgOiBldmVudC52YWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHN1YmplY3RcbiAgICAgICAgdGhpcy5fc3ViamVjdC5uZXh0KG91dHB1dFZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogVGhpcyB3aWxsIGJlIGZpcmVkIHdoZW4gdGhpcyBjb25kdWl0IGVtaXRzIGEgbmV3IHZhbHVlICovXG4gICAgb25PdXRwdXQodmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBtb3N0IHJlY2VudCB2YWx1ZSBhbmQgd2hlbiBpdCB3YXMgbW9kaWZpZWQgLSBjYW4gYmUgdXNlZCBmb3IgYW55IG5ldyBjb25kdWl0cyB0byBsb29rdXAgYSB2YWx1ZVxuICAgICAgICB0aGlzLmNvbmR1aXQuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY29uZHVpdC5sYXN0TW9kaWZpZWQgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgc2hvdWxkIHByb2R1Y2Ugb3V0cHV0XG4gICAgICAgIGlmICh0aGlzLmNvbmR1aXQucHJvZHVjZXNPdXRwdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUuZW1pdCh7IGNvbmR1aXQ6IHRoaXMuY29uZHVpdCwgem9uZUlkOiB0aGlzLnpvbmVJZCwgdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVW5zdWJzY3JpYmUgb25jZSB0aGlzIHN1YmplY3QgaXMgZGVzdHJveWVkICovXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIl19