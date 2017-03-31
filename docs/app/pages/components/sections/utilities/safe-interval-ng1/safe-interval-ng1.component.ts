import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-safe-interval-ng1',
    templateUrl: './safe-interval-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSafeIntervalNg1Component')
export class ComponentsSafeIntervalNg1Component {
        
        private jsCode1 = require('./snippets/sample1.js');
        private jsCode2 = require('./snippets/sample2.js');
        private jsCode3 = require('./snippets/sample3.js');

}