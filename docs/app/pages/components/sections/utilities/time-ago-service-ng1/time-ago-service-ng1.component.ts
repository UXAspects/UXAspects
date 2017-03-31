import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-time-ago-service-ng1',
    templateUrl: './time-ago-service-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsTimeAgoServiceNg1Component')
export class ComponentsTimeAgoServiceNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/sample.html');
    private jsCode = require('./snippets/sample.js');
    private snippet1 = require('./snippets/snippet1.js');
    private snippet2 = require('./snippets/snippet2.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'TimeAgoCtrl as vm'
        },
        js: [this.jsCode]
    };

}
