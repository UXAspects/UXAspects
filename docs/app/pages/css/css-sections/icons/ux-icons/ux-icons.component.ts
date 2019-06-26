import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { DocumentationType, DOCUMENTATION_TOKEN } from '../../../../../services/playground/tokens/documentation.token';
import { IIcon, IIcons } from './../../../../../interfaces/IIcons';

@Component({
    selector: 'uxd-css-icons-ux-icons',
    templateUrl: './ux-icons.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('CssUxIconsComponent')
export class CssUxIconsComponent {

    /** Store the active icons set */
    iconset: Iconset = 'ux-icons';

    /** Store the list of available iconsets */
    iconsets: ReadonlyArray<Iconset> = ['ux-icons', 'hpe-icons'];

    /** Store the hpe-icon set */
    uxIcons: ReadonlyArray<IIcon> = require<IIcons>('../../../../../data/ux-icons.json').icons;

    /** Store the hpe-icon set */
    hpeIcons: ReadonlyArray<IIcon> = require<IIcons>('../../../../../data/iconset.json').icons;

    /** Store the filtered icons to display */
    icons: ReadonlyArray<IIcon> = this.getIconset();

    /** Store the current search query */
    query: string;

    get isKeppel(): boolean {
        return this._documentationType === DocumentationType.Keppel;
    }

    constructor(@Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType) { }

    /** Get the icon class based on the active iconset */
    get iconClass(): string {
        return this.iconset === 'ux-icons' ? 'ux-icon' : 'hpe-icon';
    }

    /** Filter icons by search query */
    search(): void {
        this.icons = this.getIconset().filter(icon => !this.query || icon.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }

    /** Get the current active iconset */
    private getIconset(): ReadonlyArray<IIcon> {
        return this.iconset === 'ux-icons' ? this.uxIcons : this.hpeIcons;
    }
}

export type Iconset = 'ux-icons' | 'hpe-icons';