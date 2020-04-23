import { Component } from '@angular/core';
import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition, ColorService } from '@ux-aspects/ux-aspects';
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
    badgeContent: string = '999';
    badgeMaxValue: number = 99;
    badgeSize: BadgeSize = 'small';
    badgeOverlap: boolean = false;
    badgeHidden: boolean = false;
    badgeHorizontalPosition: BadgeHorizontalPosition = 'after';
    badgeVerticalPosition: BadgeVerticalPosition = 'above';
    selectedColor: string  = 'critical';
    selectedBorderColor: string = '';

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
