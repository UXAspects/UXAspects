import { ColorService } from './../../../../../../../src/index';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-color-palette',
    templateUrl: './color-palette.component.html'
})
@DocumentationSectionComponent('CssColorPaletteComponent')
export class CssColorPaletteComponent {

    colors: object;

    constructor(private colorService: ColorService) {

        this.colors = {
            primary: colorService.getColor('primary'),
            accent: colorService.getColor('accent'),
            secondary: colorService.getColor('secondary'),
            alternate1: colorService.getColor('alternate1'),
            alternate2: colorService.getColor('alternate2'),
            alternate3: colorService.getColor('alternate3'),
            vibrant1: colorService.getColor('vibrant1'),
            vibrant2: colorService.getColor('vibrant2'),
            grey1: colorService.getColor('grey1'),
            grey2: colorService.getColor('grey2'),
            grey3: colorService.getColor('grey3'),
            grey4: colorService.getColor('grey4'),
            grey5: colorService.getColor('grey5'),
            grey6: colorService.getColor('grey6'),
            grey7: colorService.getColor('grey7'),
            grey8: colorService.getColor('grey8'),
            chart1: colorService.getColor('chart1'),
            chart2: colorService.getColor('chart2'),
            chart3: colorService.getColor('chart3'),
            chart4: colorService.getColor('chart4'),
            chart5: colorService.getColor('chart5'),
            chart6: colorService.getColor('chart6'),
            ok: colorService.getColor('ok'),
            warning: colorService.getColor('warning'),
            critical: colorService.getColor('critical'),
        };
    }
    
}