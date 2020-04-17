import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NavigationService } from './services/navigation/navigation.service';
import { Breadcrumb, PageHeaderIconMenu, PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'uxd-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    header: string;
    isNavigationVisible: boolean = true;
    backVisible: boolean = false;

    items: PageHeaderNavigationItem[] = [
        {
            title: 'Partition Map',
            routerLink: 'showcase/visualizations/partition-map'
        },
        {
            title: 'Organization Chart',
            routerLink: 'showcase/visualizations/organization-chart'
        },
        {
            title: 'Sankey Chart',
            routerLink: 'showcase/visualizations/sankey-chart'
        },
    ];

    breadcrumbs: Breadcrumb[] = [
        {
            title: 'Showcase',
            routerLink: 'showcase'
        }
    ];

    iconMenus: PageHeaderIconMenu[] = [
        {
            icon: 'notification',
            label: 'Notifications. 3 new items.',
            badge: 3,
            dropdown: [
                {
                    icon: 'chat',
                    title: 'You have 16 messages',
                    subtitle: '4 minutes ago',
                    divider: true
                },
                {
                    icon: 'social-twitter',
                    title: '3 New Followers',
                    subtitle: '12 minutes ago',
                    divider: true
                },
                {
                    icon: 'cloud',
                    title: 'Server Rebooted',
                    subtitle: '22 minutes ago'
                }
            ]
        },
        {
            icon: 'actions',
            label: 'Actions',
            dropdown: [
                {
                    header: true,
                    title: 'John Doe',
                    divider: true
                },
                {
                    icon: 'user-settings',
                    title: 'Settings'
                },
                {
                    icon: 'logout',
                    title: 'Log Out'
                },
                {
                    title: 'Show Tips'
                }
            ]
        }
    ];

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private navigation: NavigationService,
        ngZone: NgZone) {
        (<any>window).ngZone = ngZone;
    }

    ngOnInit() {

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => {
                let route = this.activatedRoute;
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return {
                    event: <NavigationEnd>event,
                    route: route
                };
            }),
            filter(data => data.route.outlet === 'primary')
        ).subscribe((data: any) => {

            if (data.route.data.value.navigation === false) {
                this.isNavigationVisible = false;
                this.header = data.route.data.value.title;
            } else {
                this.isNavigationVisible = true;
            }

            this.navigation.scrollOnNavigationChange(data.event.url);
        });
    }
}
