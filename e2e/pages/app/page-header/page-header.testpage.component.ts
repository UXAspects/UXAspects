import { Component } from '@angular/core';
import { Breadcrumb, PageHeaderIconMenu, PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';

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
            icon: 'home',
            title: 'Home'
        },
        {
            icon: 'analytics',
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
