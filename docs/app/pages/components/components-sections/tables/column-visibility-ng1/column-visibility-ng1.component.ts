import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-column-visibility',
    templateUrl: './column-visibility-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsColumnVisibilityNg1Component')
export class ComponentsColumnVisibilityNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    columns: any;
    tableData: any[];

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'ColumnVisibilityCtrl as vm'
        },
        js: [this.snippets.raw.controllerJs]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

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