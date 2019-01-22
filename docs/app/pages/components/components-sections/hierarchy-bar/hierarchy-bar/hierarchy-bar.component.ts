import { Component } from '@angular/core';
import { HierarchyBarNode } from '@ux-aspects/ux-aspects';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-hierarchy-bar',
    templateUrl: './hierarchy-bar.component.html',
    styleUrls: ['./hierarchy-bar.component.less']
})
@DocumentationSectionComponent('ComponentsHierarchyBarComponent')
export class ComponentsHierarchyBarComponent extends BaseDocumentationSection implements IPlunkProvider {

    /** Get the url for the managericon  asset */
    managerIcon = require('../../../../../assets/img/IconManagerColorized.png');

    /** Get the url for the user icon asset */
    userIcon = require('../../../../../assets/img/IconUser.png');

    /** Define the hierarchy bar mode - either standard or collapsed */
    mode: string = 'standard';

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

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['HierarchyBarModule', 'AccordionModule', 'RadioButtonModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}