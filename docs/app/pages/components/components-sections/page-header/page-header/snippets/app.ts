import { Component } from '@angular/core';
import { Breadcrumb, PageHeaderIconMenu, PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    condensed: boolean = false;

    crumbs: Breadcrumb[] = [
        {
            title: 'Archive',
            onClick: () => { }
        },
        {
            title: '2017',
            onClick: () => { }
        }
    ];

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

}