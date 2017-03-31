import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-window-communication-service-ng1',
    templateUrl: './window-communication-service-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsWindowCommunicationServiceNg1Component')
export class ComponentsWindowCommunicationServiceNg1Component {

        private jsCode = require('./snippets/sample.js');

}