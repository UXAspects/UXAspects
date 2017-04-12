import { Component, ViewEncapsulation } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-thumbnail-ng1',
    templateUrl: './thumbnail-ng1.component.html',
    styleUrls: ['./thumbnail-ng1.component.less'],
    encapsulation: ViewEncapsulation.None
})
@DocumentationSectionComponent('ComponentsThumbnailNg1Component')
export class ComponentsThumbnailNg1Component implements ICodePenProvider {
    private htmlCode = require('./snippets/thumbnail.html');
    private cssCode = require('./snippets/thumbnail.css');
    private javascriptCode = require('./snippets/thumbnail.js');
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ThumbnailDemoCtrl as vm'
        },
        css: [require('./snippets/thumbnail-codepen.css')],
        js: [require('./snippets/thumbnail-codepen.js')]
    };
}
