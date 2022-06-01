import { Component } from '@angular/core';
import { Breadcrumb, PageHeaderIconMenu, PageHeaderNavigationItem } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-page-header',
    templateUrl: './page-header.component.html'
})
@DocumentationSectionComponent('ComponentsPageHeaderComponent')
export class ComponentsPageHeaderComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs
        },
        modules: [
            {
                imports: ['PageHeaderModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['RouterModule'],
                library: '@angular/router',
                providers: ['RouterModule.forRoot([])']
            },
            {
                imports: ['BsDropdownModule'],
                library: 'ngx-bootstrap/dropdown',
                providers: ['BsDropdownModule.forRoot()']
            }
        ]
    };

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
                    id: 'bar-charts-id',
                },
                {
                    title: 'Pie Charts',
                    id: 'pie-charts-id',
                    children: [
                        {
                            title: 'Daily View',
                            id: 'daily-id',
                        },
                        {
                            title: 'Weekly View',
                            id: 'weekly-id',
                        },
                        {
                            title: 'Monthly View',
                            id: 'monthly-id',
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

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
