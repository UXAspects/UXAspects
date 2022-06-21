import { Component, ViewChild } from '@angular/core';
import { ColorPickerColor, ColorService, MenuTriggerDirective } from '@ux-aspects/ux-aspects';
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
export class ComponentsColorPickerComponent extends BaseDocumentationSection implements IPlaygroundProvider{

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

    @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

    colors: ColorPickerColor[][];
    selected: ColorPickerColor;
    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showTooltips = false;
    showInput = false;

    _colorNames = [
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

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.colors = this._colorNames.map(row =>
            row.map(colorName => new ColorPickerColor(colorName, colorService.resolve(colorName))));

        this.selected = this.colors[0][0];
    }

    close(): void {
        this.menuTrigger?.closeMenu();
    }

    onColorPickerSelectedChange(): void {
        if (!this.showInput) {
            this.close();
        }
    }
}
