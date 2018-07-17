import { Component } from '@angular/core';
import 'chance';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { ICodePen } from '../../../../../interfaces/ICodePen';
import { ICodePenProvider } from '../../../../../interfaces/ICodePenProvider';

@Component({
    selector: 'uxd-components-grid-ng1',
    templateUrl: './grid-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsGridNg1Component')
export class ComponentsGridNg1Component extends BaseDocumentationSection implements ICodePenProvider {

    codepen: ICodePen = {
        html: this.snippets.raw.appHtml,
        htmlAttributes: {
            'ng-controller': 'GridDemoCtrl as vm'
        },
        js: [this.snippets.raw.appJs]
    };

    source = [{
        checked: false,
        name: chance.name(),
        age: 46,
        city: 'London',
        active: true
    }, {
        checked: false,
        name: chance.name(),
        age: 60,
        city: 'Berlin',
        active: false
    }, {
        checked: false,
        name: chance.name(),
        age: 57,
        city: 'Paris',
        active: false
    }, {
        checked: false,
        name: chance.name(),
        age: 28,
        city: 'California',
        active: false
    }, {
        checked: false,
        name: chance.name(),
        age: 31,
        city: 'Miami',
        active: true
    }];

    columns = [{
        title: '',
        template: '<checkbox style="margin-bottom: 0" ng-model="checked"></checkbox>',
        width: '40px'
    }, {
        title: 'Name',
        template: '<span ng-bind="::name"></span>',
    }, {
        title: 'Age',
        template: '<span ng-bind="::age"></span>',
    }, {
        title: 'City',
        template: '<span ng-bind="::city"></span>',
    }, {
        title: 'Active',
        template: '<i class="hpe-icon hpe-active" ng-show="::active"></i>',
    }];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}