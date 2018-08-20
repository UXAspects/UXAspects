import { Component } from '@angular/core';
import { ColorPickerItem } from '../../../../../../../src/components/color-picker/color-picker.component';
import { ColorService } from '../../../../../../../src/services/color';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-color-picker',
    templateUrl: './color-picker.component.html'
    // styleUrls: ['./color-picker.component.less']
})
@DocumentationSectionComponent('ComponentsColorPickerComponent')
export class ComponentsColorPickerComponent extends BaseDocumentationSection {

    colors: ColorPickerItem[];

    selected: string;

    private _colorNames = [
        'Primary',
        'Accent',
        'Secondary',
        'Alternate1',
        'Alternate2',
        'Alternate3',
        'Vibrant1',
        'Vibrant2',
        'Grey1',
        'Grey2',
        'Grey3',
        'Grey4',
        'Grey5',
        'Grey6',
        'Grey7',
        'Grey8',
    ];

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.colors = this._colorNames.map((colorName) => new ColorPickerItem(colorName, colorService.resolve(colorName)));

        this.selected = this.colors[0].color;
    }
}