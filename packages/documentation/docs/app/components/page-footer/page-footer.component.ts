import { Component } from '@angular/core';

import { ILink } from '../../interfaces/ILink';
import { IFooterColumn } from '../../interfaces/IFooterColumn';
import { IFooter } from '../../interfaces/IFooter';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';
import { ILogo } from '../../interfaces/ILogo';

@Component({
    selector: 'uxd-page-footer',
    templateUrl: './page-footer.component.html',
    styleUrls: ['./page-footer.component.less']
})
export class PageFooterComponent {
    
    copyright: string;
    logo: ILogo;
    columns: IFooterColumn[];
    feedback: ILink;
    year: number;
    title: string;

    constructor(private _appConfig: AppConfiguration) {
        // get the footer navigation data
        let footerData: IFooter = this._appConfig.getConfigurationData('footer-navigation');

        // get the current year for footer
        this.year = new Date().getFullYear();

        // extract specific data from the footer
        this.columns = footerData.columns;
        this.logo = footerData.logo;
        this.copyright = footerData.copyright;
        this.feedback = footerData.feedback;
    }
}

