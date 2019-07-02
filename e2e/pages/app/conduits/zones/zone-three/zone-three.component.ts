import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Conduit, ConduitZone, ConduitZoneComponent } from '../../../../../../dist';

@Component({
    selector: 'app-zone-three',
    templateUrl: './zone-three.component.html',
    providers: [ConduitZone]
})
export class ZoneThreeComponent extends ConduitZoneComponent {
    zoneId: string = 'zone-three';
    producesOutput: boolean = true;
    acceptsInput1: boolean = true;
    acceptsInput2: boolean = true;

    @Conduit({ id: 'search' })
    search = new BehaviorSubject<string>('');

    updateConduit(): void {
        const acceptsInput = [];

        if (this.acceptsInput1) {
            acceptsInput.push('zone-one');
        }

        if (this.acceptsInput2) {
            acceptsInput.push('zone-two');
        }

        this.setConduitProperties(this.search, { producesOutput: this.producesOutput, acceptsInput });
    }
}
