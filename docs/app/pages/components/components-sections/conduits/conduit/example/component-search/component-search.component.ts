import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Conduit, ConduitComponent } from '../../../../../../../../../src/components/conduit/index';

@Component({
    selector: 'uxd-conduit-search',
    templateUrl: './component-search.component.html'
})
export class ConduitComponentSearchComponent extends ConduitComponent {

    @Conduit({ id: 'search' }) search = new BehaviorSubject('');

    producesOutput: boolean = true;
    acceptsInput: boolean = true;

    updateConduit(): void {
        this.setConduitProperties(this.search, { producesOutput: this.producesOutput, acceptsInput: this.acceptsInput });
    }
}