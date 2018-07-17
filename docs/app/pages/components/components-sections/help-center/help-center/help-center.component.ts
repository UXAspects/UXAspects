import { Component, OnDestroy } from '@angular/core';
import 'chance';
import { Subscription } from 'rxjs/Subscription';
import { Breadcrumb, HelpCenterItem, HelpCenterService, PageHeaderIconMenu } from '../../../../../../../src/index';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-help-center',
    templateUrl: './help-center.component.html',
    styleUrls: ['./help-center.component.less']
})
@DocumentationSectionComponent('ComponentsHelpCenterComponent')
export class ComponentsHelpCenterComponent extends BaseDocumentationSection implements OnDestroy, IPlunkProvider {

    repositories: HelpCenterTableData[] = [];
    loading: boolean = false;
    crumbs: Breadcrumb[] = [{ title: 'Overview' }];
    menus: PageHeaderIconMenu[] = [
        {
            icon: 'hpe-help',
            label: 'Help Menu',
            dropdown: []
        }
    ];

    refreshHelpCenterItem: HelpCenterItem = {
        icon: 'hpe-refresh',
        title: 'Refresh Repositories',
        select: this.loadData.bind(this)
    };

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [
            {
                imports: ['HelpCenterModule', 'PageHeaderModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    private _helpCenter$: Subscription;

    constructor(private _helpCenterService: HelpCenterService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // update the menu items when new ones are added
        this._helpCenter$ = this._helpCenterService.items.subscribe(items => this.menus[0].dropdown = items);

        // load table data
        this.loadData();
    }

    loadData(): void {

        this.repositories = [];
        this.loading = true;

        let types = ['File System', 'Exchange', 'Other'];

        // add delay to simulate loading
        setTimeout(() => {

            // generate some sample data
            for (let idx = 0; idx < 5; idx++) {
                this.repositories.push({
                    name: `Repository ${chance.integer({ min: 1, max: 100 })}`,
                    type: types[chance.integer({ min: 0, max: 2 })],
                    items: chance.integer({ min: 0, max: 1000000 }),
                    location: chance.country({ full: true }),
                    size: chance.floating({ fixed: 1, min: 1, max: 20 })
                });
            }

            this.loading = false;
        }, 2000);
    }

    ngOnDestroy(): void {
        this._helpCenter$.unsubscribe();
    }
}

interface HelpCenterTableData {
    name: string;
    type: string;
    location: string;
    items: number;
    size: number;
}