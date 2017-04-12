import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-search-history-ng1',
    templateUrl: './search-history-ng1.component.html',
    styleUrls: ['./search-history-ng1.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsSearchHistoryNg1Component')
export class ComponentsSearchHistoryNg1Component implements ICodePenProvider {

    private layoutHtml = require('./snippets/layout.html');
    private modalLayoutHtml = require('./snippets/modalLayout.html');
    private stylesCss = require('./snippets/styles.css');
    private controllerJs = require('./snippets/controller.js');
    private modalControllerJs = require('./snippets/modalController.js');

    public codepen: ICodePen = {
        html: this.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'SearchHistoryDemoCtrl as vm'
        },
        htmlTemplates: [{
            id: 'modalLayout.html',
            content: this.modalLayoutHtml
        }],
        css: [this.stylesCss],
        js: [this.controllerJs, this.modalControllerJs]
    };

}
