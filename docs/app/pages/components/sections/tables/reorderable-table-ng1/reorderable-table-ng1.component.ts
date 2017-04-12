import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-reorderable-table',
    templateUrl: './reorderable-table-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsReorderableTableNg1Component')
export class ComponentsReorderableTableNg1Component implements ICodePenProvider {
    
    private htmlCode = require('./snippets/layout.html');
    private jsCode = require('./snippets/controller.js');
    private cssCode =  require('./snippets/styles.css');

    private tableDataCode =  require('./snippets/table-data.html');
    private controlsCode =  require('./snippets/controls.html');

    private removeRowHtmlCode = require('./snippets/remove-row.html');
    private removeRowJsCode = require('./snippets/remove-row.js');
    
    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ReorderableCtrl as vm'
        },
        js: [this.jsCode],
        css: [this.cssCode]
    };
}