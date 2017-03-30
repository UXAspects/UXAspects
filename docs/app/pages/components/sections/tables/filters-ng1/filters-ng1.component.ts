import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-filters',
    templateUrl: './filters-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsFiltersNg1Component')
export class ComponentsFiltersNg1Component {
    
    private filterContainerCode = require('./snippets/filter-container.html');
    private filterCode = require('./snippets/filter.html');
    private filterOptionsCode = require('./snippets/filter-options.html');

}