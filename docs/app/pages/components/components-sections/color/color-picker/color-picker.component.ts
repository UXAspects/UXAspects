import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ColorPickerColor } from '../../../../../../../src/components/color-picker/color-picker.component';
import { ColorService } from '../../../../../../../src/services/color';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.less']
})
@DocumentationSectionComponent('ComponentsColorPickerComponent')
export class ComponentsColorPickerComponent extends BaseDocumentationSection implements IPlunkProvider {

    plunk: IPlunk = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['ColorPickerModule', 'ColorServiceModule'],
                library: '@ux-aspects/ux-aspects'
            },
            {
                imports: ['BsDropdownModule'],
                forRoot: true,
                library: 'ngx-bootstrap/dropdown'
            }
        ]
    };

    colors: ColorPickerColor[][];
    selected: ColorPickerColor;
    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showTooltips = false;
    showInput = false;

    isPickerOpen = true;

    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
    @ViewChild('customize') customize: ElementRef;

    private _colorNames = [
        ['Primary', 'Accent', 'Secondary', 'Alternate1', 'Alternate2', 'Alternate3', 'Vibrant1',
            'Vibrant2'],
        ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8']
    ];

    constructor(colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));

        this.colors = this._colorNames.map(row =>
            row.map(colorName => new ColorPickerColor(colorName, colorService.resolve(colorName))));

        this.selected = this.colors[0][0];
    }

    colorPickerSelectedChange(): void {
        if (!this.showInput) {
            this.isPickerOpen = false;
        }
    }

    @HostListener('document:click', ['$event.target'])
    private clickHandler(target: Node): void {
        // Close on outside click
        if (
            !this.toggleButton.nativeElement.contains(target) &&
            !this.dropdownMenu.nativeElement.contains(target) &&
            !this.customize.nativeElement.contains(target)
        ) {
            this.isPickerOpen = false;
        }
    }
}