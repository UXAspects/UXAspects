import { Component } from '@angular/core';

import { ILink } from '../../interfaces/ILink';
import { IFooterColumn } from '../../interfaces/IFooterColumn';
import { IFooter } from '../../interfaces/IFooter';

@Component({
    selector: 'uxd-page-footer',
    templateUrl: './page-footer.component.html',
    styleUrls: ['./page-footer.component.less']
})
export class PageFooterComponent {
    
    copyright: string;
    logo: string;
    columns: IFooterColumn[];
    feedback: ILink;
    year: number;

    constructor() {
        // get the footer navigation data
        let footerData: IFooter = require('../../data/footer-navigation.json');

        // get the current year for footer
        this.year = new Date().getFullYear();

        // extract specific data from the footer
        this.columns = footerData.columns;
        this.logo = footerData.logo;
        this.copyright = footerData.copyright;
        this.feedback = footerData.feedback;
    }
}

