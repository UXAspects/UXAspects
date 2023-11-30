import { Component, Inject } from '@angular/core';
import {
    BadgeHorizontalPosition,
    BadgeSize,
    BadgeVerticalPosition,
    ColorService,
} from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DOCUMENTATION_TOKEN, DocumentationType } from '../../../../../tokens/documentation.token';

@Component({
    selector: 'uxd-components-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.less'],
})
@DocumentationSectionComponent('ComponentsBadgeComponent')
export class ComponentsBadgeComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    colorPaletteDocumentationRoute: string;
    colorPaletteFragment: string;

    hideButton: boolean = false;
    badgeContent: string = '18';
    badgeMaxValue: number = null;
    badgeSize: BadgeSize = 'medium';
    badgeOverlap: boolean = true;
    badgeHidden: boolean = false;
    badgeHorizontalPosition: BadgeHorizontalPosition = 'after';
    badgeVerticalPosition: BadgeVerticalPosition = 'above';
    selectedColor: string = 'critical';
    selectedBorderColor: string = null;

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
                importsWithProviders: ['RouterModule.forRoot([])'],
            },
        ],
    };

    constructor(
        @Inject(DOCUMENTATION_TOKEN) private readonly documentationType: DocumentationType,
        private readonly colorService: ColorService
    ) {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );

        this.colorPaletteDocumentationRoute =
            documentationType === DocumentationType.MicroFocus
                ? '/ui-components/styling'
                : '/css/color-palette';

        if (documentationType === DocumentationType.MicroFocus) {
            this.colorPaletteFragment = 'color-palette';
        }
    }
}
