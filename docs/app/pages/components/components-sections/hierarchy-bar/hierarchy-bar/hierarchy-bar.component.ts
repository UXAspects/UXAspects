import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { HierarchyBarNode } from '../../../../../../../src/components/hierarchy-bar';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { IPlunk } from '../../../../../interfaces/IPlunk';

@Component({
    selector: 'uxd-components-hierarchy-bar',
    templateUrl: './hierarchy-bar.component.html',
    styleUrls: ['./hierarchy-bar.component.less']
})
@DocumentationSectionComponent('ComponentsHierarchyBarComponent')
export class ComponentsHierarchyBarComponent extends BaseDocumentationSection implements IPlunkProvider {

    managerIcon = require('../../../../../assets/img/IconManagerColorized.png');
    userIcon = require('../../../../../assets/img/IconUser.png');
    
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
                imports: ['HierarchyBarModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}