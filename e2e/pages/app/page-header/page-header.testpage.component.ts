import { Component } from '@angular/core';
import { Breadcrumb, PageHeaderNavigationItem, PageHeaderIconMenu } from '../../../../dist';

@Component({
    selector: 'page-header-app',
    templateUrl: './page-header.testpage.component.html'
})
export class PageHeaderTestPageComponent {

    condensed: boolean = false;
    autoselect: boolean = false;
    alignment: string = 'center';
    selected: string;

    crumbs: Breadcrumb[] = [{
        title: 'Archive'
    }];

    items: PageHeaderNavigationItem[] = [
        {
            icon: 'hpe-home',
            title: 'Home'
        },
        {
            icon: 'hpe-analytics',
            title: 'Analytics',
            children: [
                {
                    title: 'Bar Charts'
                },
                {
                    title: 'Pie Charts',
                    children: [
                        {
                            title: 'Daily View'
                        },
                        {
                            title: 'Weekly View'
                        },
                        {
                            title: 'Monthly View'
                        }
                    ]
                }
            ]
        }
    ];

    items2: PageHeaderNavigationItem[] = [
        {
            icon: 'hpe-home',
            title: 'Home'
        },
        {
            icon: 'hpe-analytics',
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
            icon: 'hpe-notification',
            badge: 3,
            dropdown: [
                {
                    icon: 'hpe-chat',
                    title: 'You have 16 messages',
                    subtitle: '4 minutes ago',
                    divider: true
                },
                {
                    icon: 'hpe-social-twitter',
                    title: '3 New Followers',
                    subtitle: '12 minutes ago',
                    divider: true
                },
                {
                    icon: 'hpe-cloud',
                    title: 'Server Rebooted',
                    subtitle: '22 minutes ago'
                }
            ]
        },
        {
            icon: 'hpe-actions',
            dropdown: [
                {
                    header: true,
                    title: 'John Doe',
                    divider: true
                },
                {
                    icon: 'hpe-user-settings',
                    title: 'Settings'
                },
                {
                    icon: 'hpe-logout',
                    title: 'Log Out'
                },
                {
                    title: 'Show Tips'
                }
            ]
        }
    ];

}
