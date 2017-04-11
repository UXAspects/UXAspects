import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';

@Component({
    selector: 'uxd-components-column-visibility',
    templateUrl: './column-visibility-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsColumnVisibilityNg1Component')
export class ComponentsColumnVisibilityNg1Component implements ICodePenProvider {

    private columns: any;
    private tableData: any[];

    private htmlCode = require('!!file-loader?name=[path][name].[ext]./snippets/layout.html');
    private jsCode = require('!!file-loader?name=[path][name].[ext]./snippets/controller.js');

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ColumnVisibilityCtrl as vm'
        },
        js: [this.jsCode],
        lazy: true
    };

    constructor() {

        let chance = require('chance').Chance();

        this.columns = {
            id: true,
            data: true,
            user: true,
            value: true
        };

        this.tableData = [{
            data: 156,
            user: chance.name(),
            value: 40
        }, {
            data: 226,
            user: chance.name(),
            value: -20
        }, {
            data: 52,
            user: chance.name(),
            value: 26
        }, {
            data: 461,
            user: chance.name(),
            value: -23
        }, {
            data: 119,
            user: chance.name(),
            value: 16
        }];
    }

}