import { Component, forwardRef } from '@angular/core';
import { Conduit, ConduitComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'uxd-conduit-search',
    templateUrl: './component-search.component.html'
})
export class ConduitComponentSearchComponent extends ConduitComponent {

    @Conduit(forwardRef(() => ({ id: 'search' })) as any) search = new BehaviorSubject('');

    producesOutput: boolean = true;
    acceptsInput: boolean = true;

    updateConduit(): void {
        this.setConduitProperties(this.search, { producesOutput: this.producesOutput, acceptsInput: this.acceptsInput });
    }
}