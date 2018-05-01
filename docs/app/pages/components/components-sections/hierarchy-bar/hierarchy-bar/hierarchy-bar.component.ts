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
    templateUrl: './hierarchy-bar.component.html'
})
@DocumentationSectionComponent('ComponentsHierarchyBarComponent')
export class ComponentsHierarchyBarComponent extends BaseDocumentationSection implements IPlunkProvider {

    node: HierarchyBarNode = {
        title: chance.name(),
        icon: require('../../../../../assets/img/IconManagerColorized.png'),
        children: [
            {
                title: chance.name(),
                icon: require('../../../../../assets/img/IconManagerColorized.png'),
                children: Observable.create((observer: Observer<HierarchyBarNode[]>) => {

                    // simulate server loading
                    setTimeout(() => {

                        observer.next([
                            {
                                icon: require('../../../../../assets/img/IconUser.png'),
                                title: chance.name(),
                                children: [
                                    {
                                        icon: require('../../../../../assets/img/IconUser.png'),
                                        title: chance.name(),
                                        children: [
                                            {
                                                icon: require('../../../../../assets/img/IconUser.png'),
                                                title: chance.name(),
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]);

                        observer.complete();
                    }, 2000);
                })
            }
        ]
    };

    selected: HierarchyBarNode = this.node.children[0];

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
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