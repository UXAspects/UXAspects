import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';

import { NavigationService } from './services/navigation/navigation.service';

@Component({
    selector: 'uxd-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private navigation: NavigationService,
        ngZone: NgZone) {
            (<any>window).ngZone = ngZone;
        }

    ngOnInit() {

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(event => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return {
                    event: <NavigationEnd>event,
                    route: route
                };
            })
            .filter(data => data.route.outlet === 'primary')
            .subscribe(data => {
                this.navigation.configureForRoute(data.route);
                this.navigation.scrollOnNavigationChange(data.event.url);
            });

        // manually perform initial navigation - required in hybrid app
        this.router.initialNavigation();
    }
}
