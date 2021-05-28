import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { DocumentationType, DOCUMENTATION_TOKEN } from '../../../../../services/playground/tokens/documentation.token';
import { IIcon, IIcons } from '../../../../../interfaces/IIcons';

@Component({
    selector: 'uxd-css-icons-ux-icons',
    templateUrl: './ux-icons.component.html',
    styleUrls: ['./ux-icons.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('CssUxIconsComponent')
export class CssUxIconsComponent {

    /** Store the icon set */
    icons: ReadonlyArray<IIcon> = require<IIcons>('../../../../../data/ux-icons.json').icons;

    /** Store the filtered icons to display */
    filteredIcons: ReadonlyArray<IIcon> = this.icons;

    /** Store the current search query */
    query: string;

    iconSetClass: string = 'ux-icon';

    uxIconComponentRoute: string;

    size: string = '24px';

    get isKeppel(): boolean {
        return this._documentationType === DocumentationType.Keppel;
    }

    constructor(@Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType) {
        this.uxIconComponentRoute = _documentationType === DocumentationType.MicroFocus ? '/ui-components/styling' : '/components/icons';
    }

    /** Filter icons by search query */
    search(): void {
        this.filteredIcons = this.icons.filter(icon => !this.query || icon.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }
}
