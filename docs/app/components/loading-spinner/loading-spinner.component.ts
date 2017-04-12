import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'uxd-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.less']
})

export class LoadingSpinnerComponent {

    visible: boolean;

    constructor(private router: Router) { 

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.visible = true;
            } else if (event instanceof NavigationEnd) {
                this.visible = false;
            }
        });
    }
}