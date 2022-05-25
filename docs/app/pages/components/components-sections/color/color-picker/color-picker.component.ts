import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.less']
})
@DocumentationSectionComponent('ComponentsColorPickerComponent')
export class ComponentsColorPickerComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['ColorPickerModule, MenuModule'],
                library: '@ux-aspects/ux-aspects'
            }
        ]
    };

    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showTooltips = false;
    showInput = false;

    colorNames = [
        [
            'Primary',
            'Accent',
            'Secondary',
            'Alternate1',
            'Alternate2',
            'Alternate3',
            'Vibrant1',
            'Vibrant2'
        ],
        ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8']
    ];

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
