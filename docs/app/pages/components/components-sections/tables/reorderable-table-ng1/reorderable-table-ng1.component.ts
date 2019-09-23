import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { playgroundAdapter } from '../../../../../services/playground/adapters/legacy-playground-adapter';

@Component({
    selector: 'uxd-components-reorderable-table-ng1',
    templateUrl: './reorderable-table-ng1.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('ComponentsReorderableTableNg1Component')
export class ComponentsReorderableTableNg1Component extends BaseDocumentationSection implements IPlaygroundProvider {

    htmlCode = this.snippets.compiled.layoutHtml;
    jsCode = this.snippets.compiled.controllerJs;
    cssCode = this.snippets.compiled.stylesCss;

    tableDataCode = this.snippets.compiled.tableDataHtml;
    controlsCode = this.snippets.compiled.controlsHtml;

    removeRowHtmlCode = this.snippets.compiled.removeRowHtml;
    removeRowJsCode = this.snippets.compiled.removeRowJs;

    playground: IPlayground = playgroundAdapter({
        html: this.snippets.raw.layoutHtml,
        htmlAttributes: {
            'ng-controller': 'ReorderableCtrl as vm'
        },
        js: [this.snippets.raw.controllerJs],
        css: [this.snippets.raw.stylesCss]
    });

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}