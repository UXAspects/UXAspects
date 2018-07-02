import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ConduitZone } from './conduit-zone.service';
import { ConduitEvent } from './interfaces/conduit-event';
import { ConduitMetadata } from './interfaces/conduit-metadata';

export class ConduitSubject {

  private _subject: Subject<any>;
  private _onDestroy = new Subject<void>();

  constructor(public conduit: ConduitMetadata, private _zone: ConduitZone, public zoneId: string) {

    // store the target subject object
    this._subject = conduit.subject;

    // subscribe to changes to the source subject
    this._subject.pipe(distinctUntilChanged(conduit.changeDetection), takeUntil(this._onDestroy))
      .subscribe(this.onOutput.bind(this));

    // subscribe to the zone events and root zone events
    _zone.rootZone.events.pipe(takeUntil(this._onDestroy)).subscribe(this.onInput.bind(this));

    // check if there are any conduits that have supplied an initial value
    this.getInitialValue();
  }

  /** Check all allow inputs to see if there is a value we should initially set the conduit to */
  getInitialValue(): void {

    // if we do not accept inputs then do nothing
    if (this.conduit.acceptsInput === false) {
      return;
    }

    // return all subjects that are 1) Not itself 2) In a zone that is listed in acceptsInput 3) Have a currentValue set
    const subjects = this._zone.getSubjects().filter(subject => {

      // If this is itself or if it has not value to give us then do nothing
      if (subject === this || !subject.conduit.hasOwnProperty('currentValue')) {
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

  /** This will be triggered when a conduits value has changed */
  onInput(event: ConduitEvent): void {
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
    const outputValue = this.conduit.map ? this.conduit.map(event.value) : event.value;

    // update the subject
    this._subject.next(outputValue);
  }

  /** This will be fired when this conduit emits a new value */
  onOutput(value: any): void {

    // store the most recent value and when it was modified - can be used for any new conduits to lookup a value
    this.conduit.currentValue = value;
    this.conduit.lastModified = new Date();

    // check if this should produce output
    if (this.conduit.producesOutput) {
      this._zone.emit({ conduit: this.conduit, zoneId: this.zoneId, value });
    }
  }

  /** Unsubscribe once this subject is destroyed */
  destroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
