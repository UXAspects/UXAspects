import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-dynamic-filters',
    templateUrl: './dynamic-filters-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsDynamicFiltersNg1Component')
export class ComponentsDynamicFiltersNg1Component {
    
    private filterContainerCode = require('./snippets/filter-container.html');
    private filterControllerCode = require('./snippets/filter-container.js');
    private filterOptionsCode = require('./snippets/filter-options.js');
    private filterCode = require('./snippets/filter.html');

}