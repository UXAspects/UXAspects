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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC1zdWJqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29uZHVpdC9jb25kdWl0LXN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUt2QyxNQUFNOzs7Ozs7SUFLRixZQUFtQixPQUF3QixFQUFVLEtBQWtCLEVBQVMsTUFBYztRQUEzRSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFROzBCQUZ6RSxJQUFJLE9BQU8sRUFBUTs7UUFLcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDOztRQUdoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O1FBR3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3hGLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUd6QyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMzSTs7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LENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7UUFHdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUMxRTtLQUNKOzs7OztJQUdELE9BQU87UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQ29uZHVpdFpvbmUgfSBmcm9tICcuL2NvbmR1aXQtem9uZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmR1aXRFdmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LWV2ZW50JztcbmltcG9ydCB7IENvbmR1aXRNZXRhZGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25kdWl0LW1ldGFkYXRhJztcblxuZXhwb3J0IGNsYXNzIENvbmR1aXRTdWJqZWN0IHtcblxuICAgIHByaXZhdGUgX3N1YmplY3Q6IFN1YmplY3Q8YW55PjtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbmR1aXQ6IENvbmR1aXRNZXRhZGF0YSwgcHJpdmF0ZSBfem9uZTogQ29uZHVpdFpvbmUsIHB1YmxpYyB6b25lSWQ6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSB0YXJnZXQgc3ViamVjdCBvYmplY3RcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IGNvbmR1aXQuc3ViamVjdDtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgYW55IGNvbmR1aXRzIHRoYXQgaGF2ZSBzdXBwbGllZCBhbiBpbml0aWFsIHZhbHVlXG4gICAgICAgIHRoaXMuZ2V0SW5pdGlhbFZhbHVlKCk7XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgdG8gdGhlIHNvdXJjZSBzdWJqZWN0XG4gICAgICAgIHRoaXMuX3N1YmplY3QucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChjb25kdWl0LmNoYW5nZURldGVjdGlvbiksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh0aGlzLm9uT3V0cHV0LmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byB0aGUgem9uZSBldmVudHMgYW5kIHJvb3Qgem9uZSBldmVudHNcbiAgICAgICAgX3pvbmUuZ2V0RXZlbnRzKCkucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQuY29uZHVpdC5pZCA9PT0gY29uZHVpdC5pZCksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodGhpcy5vbklucHV0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKiBDaGVjayBhbGwgYWxsb3cgaW5wdXRzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIHZhbHVlIHdlIHNob3VsZCBpbml0aWFsbHkgc2V0IHRoZSBjb25kdWl0IHRvICovXG4gICAgZ2V0SW5pdGlhbFZhbHVlKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHdlIGRvIG5vdCBhY2NlcHQgaW5wdXRzIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiBhbGwgc3ViamVjdHMgdGhhdCBhcmUgMSkgTm90IGl0c2VsZiAyKSBJbiBhIHpvbmUgdGhhdCBpcyBsaXN0ZWQgaW4gYWNjZXB0c0lucHV0IDMpIEhhdmUgYSBjdXJyZW50VmFsdWUgc2V0XG4gICAgICAgIGNvbnN0IHN1YmplY3RzID0gdGhpcy5fem9uZS5nZXRTdWJqZWN0cygpLmZpbHRlcihzdWJqZWN0ID0+IHtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBpdHNlbGYgb3IgaWYgaXQgaGFzIG5vdCB2YWx1ZSB0byBnaXZlIHVzIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICAgICAgaWYgKHN1YmplY3QgPT09IHRoaXMgfHwgc3ViamVjdC5jb25kdWl0LmlkICE9PSB0aGlzLmNvbmR1aXQuaWQgfHwgIXN1YmplY3QuY29uZHVpdC5oYXNPd25Qcm9wZXJ0eSgnY3VycmVudFZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGFjY2VwdHNJbnB1dCBpcyB0cnVlIHRoZW4gd2UgcmV0dXJuIGV2ZXJ5IHRpbWVcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQuaW5kZXhPZihzdWJqZWN0LnpvbmVJZCkgIT09IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbWF0Y2hlcyB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHN1YmplY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHNvcnQgYnkgdGhlIGxhc3QgbW9kaWZpZWQgZmllbGRcbiAgICAgICAgc3ViamVjdHMuc29ydCgoc3ViamVjdE9uZSwgc3ViamVjdFR3bykgPT4gc3ViamVjdE9uZS5jb25kdWl0Lmxhc3RNb2RpZmllZC5nZXRUaW1lKCkgPCBzdWJqZWN0VHdvLmNvbmR1aXQubGFzdE1vZGlmaWVkLmdldFRpbWUoKSA/IDEgOiAtMSk7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBtb3N0IHJlY2VudCB2YWx1ZVxuICAgICAgICB0aGlzLl9zdWJqZWN0Lm5leHQoc3ViamVjdHNbMF0uY29uZHVpdC5jdXJyZW50VmFsdWUpO1xuICAgIH1cblxuICAgIC8qKiBUaGlzIHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gYSBjb25kdWl0cyB2YWx1ZSBoYXMgY2hhbmdlZCAqL1xuICAgIG9uSW5wdXQoZXZlbnQ6IENvbmR1aXRFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBpZiB3ZSBkb250IGFjY2VwdCBpbnB1dCBvciB3ZSBlbWl0dGVkIHRoaXMgdmFsdWUgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmNvbmR1aXQuYWNjZXB0c0lucHV0ID09PSBmYWxzZSB8fCBldmVudC5jb25kdWl0ID09PSB0aGlzLmNvbmR1aXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBjb25kdWl0IHByb2R1Y2VzIG91dHB1dCAtIGlmIG5vdCB3ZSBvbmx5IGRvIHNvbWV0aGluZyBpZiB3ZSBhcmUgaW4gdGhlIHNhbWUgem9uZVxuICAgICAgICBpZiAoZXZlbnQuY29uZHVpdC5wcm9kdWNlc091dHB1dCA9PT0gZmFsc2UgJiYgZXZlbnQuem9uZUlkICE9PSB0aGlzLnpvbmVJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgd2Ugb25seSBhY2NlcHQgaW5wdXRzIGZyb20gc3BlY2lmaWMgem9uZXNcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25kdWl0LmFjY2VwdHNJbnB1dCkpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBldmVudCBjYW1lIGZyb20gYW4gYWNjZXB0YWJsZSB6b25lXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29uZHVpdC5hY2NlcHRzSW5wdXQuZmluZCh6b25lID0+IHpvbmUgPT09IGV2ZW50LnpvbmVJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiByZXF1aXJlZCB0cmFuc2Zvcm0gdGhlIHZhbHVlXG4gICAgICAgIGNvbnN0IG91dHB1dFZhbHVlID0gdGhpcy5jb25kdWl0Lm1hcCA/IHRoaXMuY29uZHVpdC5tYXAoZXZlbnQudmFsdWUpIDogZXZlbnQudmFsdWU7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBzdWJqZWN0XG4gICAgICAgIHRoaXMuX3N1YmplY3QubmV4dChvdXRwdXRWYWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqIFRoaXMgd2lsbCBiZSBmaXJlZCB3aGVuIHRoaXMgY29uZHVpdCBlbWl0cyBhIG5ldyB2YWx1ZSAqL1xuICAgIG9uT3V0cHV0KHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgbW9zdCByZWNlbnQgdmFsdWUgYW5kIHdoZW4gaXQgd2FzIG1vZGlmaWVkIC0gY2FuIGJlIHVzZWQgZm9yIGFueSBuZXcgY29uZHVpdHMgdG8gbG9va3VwIGEgdmFsdWVcbiAgICAgICAgdGhpcy5jb25kdWl0LmN1cnJlbnRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNvbmR1aXQubGFzdE1vZGlmaWVkID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHNob3VsZCBwcm9kdWNlIG91dHB1dFxuICAgICAgICBpZiAodGhpcy5jb25kdWl0LnByb2R1Y2VzT3V0cHV0KSB7XG4gICAgICAgICAgICB0aGlzLl96b25lLmVtaXQoeyBjb25kdWl0OiB0aGlzLmNvbmR1aXQsIHpvbmVJZDogdGhpcy56b25lSWQsIHZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVuc3Vic2NyaWJlIG9uY2UgdGhpcyBzdWJqZWN0IGlzIGRlc3Ryb3llZCAqL1xuICAgIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==