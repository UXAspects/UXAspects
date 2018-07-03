import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'uxd-conduit-zone-inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.less']
})
export class ConduitZoneInspectorComponent {

    @Input() zones: string[];
    @Input() acceptsInput: boolean | string[];
    @Input() producesOutput: boolean;
    @Input() takesInput: boolean = true;
    @Input() isProducer: boolean = true;

    @Output() acceptsInputChange = new EventEmitter<boolean | string[]>();
    @Output() producesOutputChange = new EventEmitter<boolean>();

    isZoneSelected(zone: string): boolean {
        return this.acceptsInput === true || Array.isArray(this.acceptsInput) && this.acceptsInput.indexOf(zone) !== -1;
    }

    setZoneSelected(zone: string, selected: boolean): void {

        // if it is not an array then convert it to an array
        if (this.acceptsInput === true) {
            this.acceptsInput = this.zones.slice();
        }

        if (this.acceptsInput === false) {
            this.acceptsInput = [];
        }

        // ensure there are no duplicates
        this.acceptsInput = this.acceptsInput.filter(input => input !== zone);

        // perform the selection if required
        if (selected === true) {
            this.acceptsInput.push(zone);
        }

        this.acceptsInputChange.emit(this.acceptsInput);
    }
}
