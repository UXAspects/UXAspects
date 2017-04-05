import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-ui-router-ng1',
    templateUrl: './ui-router-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsUiRouterNg1Component')
export class ComponentsUiRouterNg1Component {

    private htmlCode1 = require('./snippets/sample1.html');
    private htmlCode2 = require('./snippets/sample2.html');
    private jsCode = require('./snippets/sample3.js');

}