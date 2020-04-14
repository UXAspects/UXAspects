import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition, ColorPickerColor, ColorService } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.less'],
})
@DocumentationSectionComponent('ComponentsBadgeComponent')
export class ComponentsBadgeComponent extends BaseDocumentationSection implements IPlaygroundProvider {
    hideButton: boolean = true;
    isPickerOpen: boolean = false;
    badgeContent: string = '234';
    badgeMaxValue: number = 99;
    badgeSize: BadgeSize = 'medium';
    badgeOverlap: boolean = false;
    badgeHidden: boolean = false;
    badgeHorizontalPosition: BadgeHorizontalPosition = 'after';
    badgeVerticalPosition: BadgeVerticalPosition = 'above';

    colors: ColorPickerColor[][] = [
        [
            new ColorPickerColor('accent', this.colorService.getColor('accent').toHex()),
            new ColorPickerColor('chart4', this.colorService.getColor('chart4').toHex()),
            new ColorPickerColor('chart5', this.colorService.getColor('chart5').toHex()),
            new ColorPickerColor('chart6', this.colorService.getColor('chart6').toHex()),
        ],
        [
            new ColorPickerColor('ok', this.colorService.getColor('ok').toHex()),
            new ColorPickerColor('warning', this.colorService.getColor('warning').toHex()),
            new ColorPickerColor('critical', this.colorService.getColor('critical').toHex()),
        ],
    ];

    selectedColor: ColorPickerColor = this.colors[0][2];

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
        },
        modules: [
            {
                imports: ['BadgeModule'],
                library: '@ux-aspects/ux-aspects',
            },
            {
                imports: ['RouterModule'],
                library: '@angular/router',
                providers: ['RouterModule.forRoot([])'],
            },
        ],
    };

    constructor(private readonly colorService: ColorService) {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }
}
