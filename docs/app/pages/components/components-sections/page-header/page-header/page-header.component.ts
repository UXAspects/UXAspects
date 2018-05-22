import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { Breadcrumb } from '../../../../../../../src/components/breadcrumbs/index';
import { PageHeaderNavigationItem, PageHeaderIconMenu } from '../../../../../../../src/index';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-page-header',
    templateUrl: './page-header.component.html'
})
@DocumentationSectionComponent('ComponentsPageHeaderComponent')
export class ComponentsPageHeaderComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [{
            imports: ['PageHeaderModule'],
            library: '@ux-aspects/ux-aspects'
        },
        {
            library: 'ngx-bootstrap/dropdown',
            imports: ['BsDropdownModule'],
            providers: ['BsDropdownModule.forRoot()']
        }]
    };


    condensed: boolean = false;

    crumbs: Breadcrumb[] = [
        {
            title: 'Archive',
            onClick: () => {}
        },
        {
            title: '2017',
            onClick: () => {}
        }
    ];

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

    iconMenus: PageHeaderIconMenu[] = [
        {
            icon: 'hpe-notification',
            label: 'Notifications. 3 new items.',
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
            label: 'Actions',
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

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}