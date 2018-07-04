import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-multiple-zones',
    templateUrl: './multiple-zones.component.html'
})
@DocumentationSectionComponent('ComponentsMultipleZonesComponent')
export class ComponentsMultipleZonesComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appComponentHtml,
            'app.component.ts': this.snippets.raw.appComponentTs,
            'app.component.css': this.snippets.raw.appComponentCss,
            'filter/filter.component.ts': this.snippets.raw.filterComponentTs,
            'filter/filter.component.html': this.snippets.raw.filterComponentHtml,
            'inspector/inspector.component.html': this.snippets.raw.inspectorComponentHtml,
            'inspector/inspector.component.ts': this.snippets.raw.inspectorComponentTs,
            'inspector/inspector.component.css': this.snippets.raw.inspectorComponentCss,
            'list-view/list-view.component.ts': this.snippets.raw.listViewComponentTs,
            'list-view/list-view.component.html': this.snippets.raw.listViewComponentHtml,
            'toolbar/toolbar.component.html': this.snippets.raw.toolbarComponentHtml,
            'toolbar/toolbar.component.ts': this.snippets.raw.toolbarComponentTs,
            'toolbar/toolbar.component.css': this.snippets.raw.toolbarComponentCss,
        },
        modules: [
            {
                imports: ['CheckboxModule', 'PopoverModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['FilterComponent'],
                library: './filter/filter.component',
                declaration: true
            },
            {
                imports: ['ListViewComponent'],
                library: './list-view/list-view.component',
                declaration: true
            },
            {
                imports: ['ZoneInspectorComponent'],
                library: './inspector/inspector.component',
                declaration: true
            },
            {
                imports: ['ToolbarComponent'],
                library: './toolbar/toolbar.component',
                declaration: true
            }
        ]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
