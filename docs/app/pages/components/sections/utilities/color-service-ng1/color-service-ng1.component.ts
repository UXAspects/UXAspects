import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-color-service-ng1',
    templateUrl: './color-service-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsColorServiceNg1Component')
export class ComponentsColorServiceNg1Component {

    private jsCode = require('./snippets/sample.js');
    
}