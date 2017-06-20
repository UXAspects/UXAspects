import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-focus-if',
    templateUrl: './focus-if.component.html',
    styleUrls: ['./focus-if.component.less'],
    host: {
        '(document:click)': 'focused = false'
    }
})
@DocumentationSectionComponent('ComponentsFocusIfComponent')
export class ComponentsFocusIfComponent extends BaseDocumentationSection implements IPlunkProvider {

    focused = false;

    plunk: IPlunk = {
        files: {
            'app.component.ts': require('./snippets/app.ts'),
            'app.component.html': require('./snippets/app.html'),
            'app.component.less': require('./snippets/app.less')
        },
        modules: [{
          imports: ['FocusIfModule'],
          library: 'ux-aspects'
      }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|less|js|ts)$/));
    }
    
}