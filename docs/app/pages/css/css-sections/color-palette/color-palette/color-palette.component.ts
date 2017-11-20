import { ColorService } from './../../../../../../../src/index';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-color-palette',
    templateUrl: './color-palette.component.html'
})
@DocumentationSectionComponent('CssColorPaletteComponent')
export class CssColorPaletteComponent {

    colors = {
        primary: this._colorService.getColor('primary'),
        accent: this._colorService.getColor('accent'),
        secondary: this._colorService.getColor('secondary'),
        alternate1: this._colorService.getColor('alternate1'),
        alternate2: this._colorService.getColor('alternate2'),
        alternate3: this._colorService.getColor('alternate3'),
        vibrant1: this._colorService.getColor('vibrant1'),
        vibrant2: this._colorService.getColor('vibrant2'),
        grey1: this._colorService.getColor('grey1'),
        grey2: this._colorService.getColor('grey2'),
        grey3: this._colorService.getColor('grey3'),
        grey4: this._colorService.getColor('grey4'),
        grey5: this._colorService.getColor('grey5'),
        grey6: this._colorService.getColor('grey6'),
        grey7: this._colorService.getColor('grey7'),
        grey8: this._colorService.getColor('grey8'),
        chart1: this._colorService.getColor('chart1'),
        chart2: this._colorService.getColor('chart2'),
        chart3: this._colorService.getColor('chart3'),
        chart4: this._colorService.getColor('chart4'),
        chart5: this._colorService.getColor('chart5'),
        chart6: this._colorService.getColor('chart6'),
        ok: this._colorService.getColor('ok'),
        warning: this._colorService.getColor('warning'),
        critical: this._colorService.getColor('critical'),
    };

    constructor(private _colorService: ColorService) { }
    
}