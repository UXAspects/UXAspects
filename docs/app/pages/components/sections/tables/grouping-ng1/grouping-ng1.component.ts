import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-grouping',
    templateUrl: './grouping-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGroupingNg1Component')
export class ComponentsGroupingNg1Component {
    
    private idsCode = require('./snippets/ids.js');
    private rootCode = require('./snippets/root.js');
    private hierarchyCode = require('./snippets/hierarchy.js');

}