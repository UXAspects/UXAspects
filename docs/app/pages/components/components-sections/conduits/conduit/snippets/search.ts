import { Component } from '@angular/core';
import { Conduit, ConduitComponent } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'conduit-search',
    templateUrl: './search.component.html'
})
export class SearchComponent extends ConduitComponent {

    @Conduit({ id: 'search' }) search = new BehaviorSubject('');

    producesOutput: boolean = true;
    acceptsInput: boolean = true;

    updateConduit(): void {
        this.setConduitProperties(this.search, {
            producesOutput: this.producesOutput,
            acceptsInput: this.acceptsInput
        });
    }
}