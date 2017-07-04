import { Component, OnDestroy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { Breadcrumb, PageHeaderIconMenu, PageHeaderIconMenuDropdownItem, HelpCenterService, HelpCenterItem } from '../../../../../../../src/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'uxd-components-help-center',
    templateUrl: './help-center.component.html'
})
@DocumentationSectionComponent('ComponentsHelpCenterComponent')
export class ComponentsHelpCenterComponent extends BaseDocumentationSection implements OnDestroy {

    crumbs: Breadcrumb[] = [{
        title: 'Overview'
    }];

    menus: PageHeaderIconMenu[] = [
        {
            icon: 'hpe-help',
            dropdown: [{
                icon: 'hpe-actions',
                title: 'Click Me'
            },
            {
                icon: 'hpe-action',
                title: 'Click Me Too'
            }]
        }
    ];

    helpCenterItems: HelpCenterItem[] = [
        {
            icon: 'hpe-actions',
            title: 'Click Me',
            select: () => {
                debugger;
            }
        },
        {
            icon: 'hpe-action',
            title: 'Click Me Too',
            select: () => {
                debugger;
            }
        }
    ];

    private _helpCenter$: Subscription;

    constructor(private _helpCenterService: HelpCenterService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        // subscribe to changes to the menu items
        this._helpCenter$ = this._helpCenterService.items.subscribe(items => {

            // update the dropdown list accordingly
            this.menus[0].dropdown = items.map(item => {
                return { icon: item.icon, title: item.title, select: item.select };
            });
        });
    }

    ngOnDestroy(): void {
        this._helpCenter$.unsubscribe();
    }
}