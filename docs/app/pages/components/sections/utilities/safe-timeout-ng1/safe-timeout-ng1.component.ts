import { Component, ChangeDetectionStrategy} from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-safe-timeout-ng1',
    templateUrl: './safe-timeout-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSafeTimeoutNg1Component')
export class ComponentsSafeTimeoutNg1Component {

    private jsCode1 = require('./snippets/sample1.js');
    private jsCode2 = require('./snippets/sample2.js');
    private jsCode3 = require('./snippets/sample3.js');
    
}