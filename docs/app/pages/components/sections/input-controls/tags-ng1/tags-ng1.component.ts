import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-tags-ng1',
    templateUrl: './tags-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsTagsNg1Component')
export class ComponentsTagsNg1Component implements ICodePenProvider {

    private sampleHtml = require('./snippets/sample.html');
    private sampleJs = require('./snippets/sample.js');
    private autocompleteHtml = require('./snippets/autocomplete.html');
    private autocompleteJs = require('./snippets/autocomplete.js');
    private customHtml = require('./snippets/custom.html');
    private customJs = require('./snippets/custom.js');

    private codepenHtml = require('./snippets/codepen.html');
    private codepenJs = require('./snippets/codepen.js');

    public codepen: ICodePen = {
        html: this.codepenHtml,
        htmlAttributes: {
            'ng-controller': 'TagsCtrl as vm'
        },
        js: [this.codepenJs]
    };

}