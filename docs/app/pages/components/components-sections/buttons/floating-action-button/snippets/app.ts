import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    direction: string = 'right';

    get placement(): string {
        return this.direction === 'top' || this.direction === 'bottom' ? 'right' : 'top';
    }
}
