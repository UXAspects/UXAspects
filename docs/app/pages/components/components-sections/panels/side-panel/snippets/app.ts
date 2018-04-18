import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.less']
})
export class AppComponent {
    
    open = false;
    inline = false;
    attachTo = 'window';
    width = '50%';
    top = '53px';
    modal = false;
    animate = true;
    closeOnExternalClick = false;
}