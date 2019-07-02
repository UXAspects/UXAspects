import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Conduit, ConduitZone, ConduitZoneComponent } from '../../../../../../dist';

@Component({
    selector: 'app-zone-two',
    templateUrl: './zone-two.component.html',
    providers: [ConduitZone]
})
export class ZoneTwoComponent extends ConduitZoneComponent {
    zoneId: string = 'zone-two';
    producesOutput: boolean = true;
    acceptsInput1: boolean = true;
    acceptsInput3: boolean = true;

    @Conduit({ id: 'search' })
    search = new BehaviorSubject<string>('');

    updateConduit(): void {
        const acceptsInput = [];

        if (this.acceptsInput1) {
            acceptsInput.push('zone-one');
        }

        if (this.acceptsInput3) {
            acceptsInput.push('zone-three');
        }

        this.setConduitProperties(this.search, { producesOutput: this.producesOutput, acceptsInput });
    }
}