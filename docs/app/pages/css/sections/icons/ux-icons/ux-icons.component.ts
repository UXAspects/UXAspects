import { IIcons, IIcon } from './../../../../../interfaces/IIcons';
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-css-icons-ux-icons',
    templateUrl: './ux-icons.component.html'
})
@DocumentationSectionComponent('CssUxIconsComponent')
export class CssUxIconsComponent {

    private class: string;
    private name: string;
    private iconset: IIcons;
    private iconlist: IIcon[]; 
    private query: string;

    constructor() {

        this.iconset = require('../../../../../data/iconset.json');
        this.iconlist = this.iconset.icons;

    }

    search(query: string) {
        this.query = query;
        this.iconlist = this.iconset.icons.filter(icon => !this.query || icon.name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    }
}