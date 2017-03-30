import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';
import { ICodePen } from '../../../../../interfaces/ICodePen';

@Component({
    selector: 'uxd-components-column-visibility',
    templateUrl: './column-visibility-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsColumnVisibilityNg1Component')
export class ComponentsColumnVisibilityNg1Component implements ICodePenProvider {

    private htmlCode = require('./snippets/layout.html');
    private controllerCode = require('./snippets/controller.js');

    private columns: any;
    private tableData: any[];

    public codepen: ICodePen = {
        html: this.htmlCode,
        htmlAttributes: {
            'ng-controller': 'ColumnVisibilityCtrl as vm'
        },
        js: [this.controllerCode]
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