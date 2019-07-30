import {ChangeDetectionStrategy, Component, ElementRef, Inject, Renderer2} from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { DocumentationType, DOCUMENTATION_TOKEN } from '../../../../../services/playground/tokens/documentation.token';
import { IIcon, IIcons } from './../../../../../interfaces/IIcons';

@Component({
    selector: 'uxd-css-icons-ux-icons',
    templateUrl: './ux-icons.component.html',
    styleUrls: ['./ux-icons.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DocumentationSectionComponent('CssUxIconsComponent')
export class CssUxIconsComponent {

    public copied: boolean = false;

    /** Store the active icons set */
    iconset: Iconset = 'ux-icons';

    /** Store the list of available iconsets */
    iconsets: ReadonlyArray<Iconset> = ['ux-icons', 'hpe-icons', 'ux-icon'];

    /** Store the hpe-icon set */
    uxIcons: ReadonlyArray<IIcon> = require<IIcons>('../../../../../data/ux-icons.json').icons;

    /** Store the hpe-icon set */
    hpeIcons: ReadonlyArray<IIcon> = require<IIcons>('../../../../../data/hpe-icons.json').icons;

    /** Store the filtered icons to display */
    icons: ReadonlyArray<IIcon> = this.getIconset();

    /** Store the current search query */
    query: string;

    iconClass: string = 'ux-icon';

    get isKeppel(): boolean {
        return this._documentationType === DocumentationType.Keppel;
    }

    constructor(@Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType) { }

    trackByFn(index: number, icon: IIcon): string {
        return icon.name;
    }

    updateIconset(value: string): void {
        this.iconClass = value === 'ux-icons' || value === 'ux-icon' ? 'ux-icon' : 'hpe-icon';
    }

    /** Filter icons by search query */
    search(): void {
        this.icons = this.getIconset().filter(icon => !this.query || icon.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }

    /** Get the current active iconset */
    private getIconset(): ReadonlyArray<IIcon> {
        return this.iconset === 'ux-icons' || this.iconset === 'ux-icon' ? this.uxIcons : this.hpeIcons;
    }

}

export type Iconset = 'ux-icons' | 'hpe-icons' | 'ux-icon';