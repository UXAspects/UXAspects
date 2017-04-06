import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { NavigationService } from './services/navigation/navigation.service';

@Component({
    selector: 'uxd-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor( @Inject(DOCUMENT) private document: Document,
        private router: Router,
        private navigation: NavigationService,
        private ngZone: NgZone) {

            // make ngzone global
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
