import { Component } from '@angular/core';
import { Breadcrumb, PageHeaderIconMenu, PageHeaderNavigationAlignment, PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'page-header-app',
    templateUrl: './page-header.testpage.component.html'
})
export class PageHeaderTestPageComponent {

    condensed: boolean = false;
    autoselect: boolean = false;
    alignment: PageHeaderNavigationAlignment = 'center';
    selected: string;

    crumbs: Breadcrumb[] = [
        {
            title: 'Home',
            routerLink: 'home'
        },
        {
            title: 'Archive',
            onClick: () => {}
        }
    ];

    items: PageHeaderNavigationItem[] = [
        {
            icon: 'home',
            title: 'Home',
            id: 'home-id'
        },
        {
            icon: 'analytics',
            title: 'Analytics',
            id: 'analytics-id',
            children: [
                {
                    title: 'Bar Charts',
                    id: 'bar-charts-id'
                },
                {
                    title: 'Pie Charts',
                    id: 'pie-charts-id',
                    children: [
                        {
                            title: 'Daily View',
                            id: 'daily-view-id'
                        },
                        {
                            title: 'Weekly View',
                            id: 'weekly-view-id'
                        },
                        {
                            title: 'Monthly View',
                            id: 'monthly-view-id'
                        }
                    ]
                }
            ]
        }
    ];

    items2: PageHeaderNavigationItem[] = [
        {
            icon: 'home',
            title: 'Home'
        },
        {
            icon: 'analytics',
            title: 'Analytics',
            children: [
                {
                    title: 'Daily View',
                    select: () => this.selected = 'Daily View'
                },
                {
                    title: 'Weekly View',
                    select: () => this.selected = 'Weekly View'
                },
                {
                    title: 'Monthly View',
                    select: () => this.selected = 'Monthly View'
                }
            ]
        }
    ];

    iconMenus: PageHeaderIconMenu[] = [
        {
            icon: 'notification',
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

}
