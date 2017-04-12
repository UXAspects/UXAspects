import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { NavigationService } from './services/navigation/navigation.service';

@Component({
    selector: 'uxd-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor(private router: Router,
        private navigation: NavigationService,
        ngZone: NgZone) {
            (<any>window).ngZone = ngZone;
        }

    ngOnInit() {

        // when the route is changed scroll to the top of the page
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            this.navigation.scrollOnNavigationChange(evt);
        });

        // manually perform initial navigation - required in hybrid app
        this.router.initialNavigation();
    }
}
