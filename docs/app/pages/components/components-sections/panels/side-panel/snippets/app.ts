import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    open = false;
    inline = false;
    attachTo = 'window';
    width = '50%';
    top = '0';
    modal = false;
    animate = true;
    closeOnExternalClick = false;
}