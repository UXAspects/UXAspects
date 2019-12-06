import { Component } from '@angular/core';
import { HierarchyBarNode } from '@ux-aspects/ux-aspects';
import { Chance } from 'chance';
import { Observable, Observer } from 'rxjs';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

const chance = new Chance();

@Component({
    selector: 'uxd-components-hierarchy-bar',
    templateUrl: './hierarchy-bar.component.html',
    styleUrls: ['./hierarchy-bar.component.less']
})
@DocumentationSectionComponent('ComponentsHierarchyBarComponent')
export class ComponentsHierarchyBarComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    /** Get the url for the managericon  asset */
    managerIcon = require('../../../../../assets/img/IconManagerColorized.png');

    /** Get the url for the user icon asset */
    userIcon = require('../../../../../assets/img/IconUser.png');

    /** Define the hierarchy bar mode - either standard or collapsed or dropdown*/
    mode: string = 'standard';

    /** Define the hierarchy bar is readonly */
    readonly: boolean = false;

    /** Define the nodes to display */
    node: HierarchyBarNode = {
        title: chance.name(),
        icon: this.managerIcon,
        children: [
            {
                title: chance.name(),
                icon: this.managerIcon,
                children: Observable.create((observer: Observer<HierarchyBarNode[]>) => {

                    // simulate server loading
                    setTimeout(() => {

                        observer.next([
                            {
                                icon: this.userIcon,
                                title: chance.name(),
                                children: [
                                    {
                                        icon: this.userIcon,
                                        title: chance.name(),
                                        children: [
                                            {
                                                icon: this.userIcon,
                                                title: chance.name(),
                                            },
                                            {
                                                title: chance.name(),
                                                icon: this.userIcon,
                                            },
                                            {
                                                title: chance.name(),
                                                icon: this.userIcon,
                                            }
                                        ]
                                    },
                                    {
                                        title: chance.name(),
                                        icon: this.userIcon,
                                    },
                                    {
                                        title: chance.name(),
                                        icon: this.userIcon,
                                    }
                                ]
                            },
                            {
                                title: chance.name(),
                                icon: this.userIcon,
                            }
                        ]);

                        observer.complete();
                    }, 2000);
                })
            },
            {
                title: chance.name(),
                icon: this.managerIcon,
                children: [
                    {
                        title: chance.name(),
                        icon: this.userIcon,
                    },
                    {
                        title: chance.name(),
                        icon: this.userIcon,
                    }
                ]
            }
        ]
    };

    selected: HierarchyBarNode = this.node.children[0];

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['HierarchyBarModule', 'RadioButtonModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}