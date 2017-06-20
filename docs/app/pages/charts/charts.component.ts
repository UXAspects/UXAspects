import { Component } from '@angular/core';

import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { VersionService, Version } from '../../services/version/version.service';

@Component({
    selector: 'uxd-charts',
    templateUrl: './charts.component.html'
})
export class ChartsPageComponent {

    navigation: IDocumentationPage;
    fullNavigation: IDocumentationPage;

    versionRadioValue: Version;

    version: Version;
    ngVersions = Version;

    constructor(private versionService: VersionService) {
        // get version
        this.versionRadioValue = this.versionService.version.getValue();
        this.versionService.version.subscribe((value: Version) => this.filterNavigation(value));

        // load in the navigation json for this page
        this.fullNavigation = require('../../data/charts-page.json');

        this.filterNavigation(this.versionService.version.getValue());
    }

    filterNavigation(version: Version) {
        if (this.fullNavigation) {
            let categories = this.fullNavigation.categories.map(category => {
                return {
                    link: category.link,
                    title: category.title,
                    sections: category.sections.filter(
                        section => version === Version.Angular ? !section.deprecated : 
                        this.toVersion(section.version) === Version.AngularJS)
                };
            });

            this.navigation = {
                title: this.fullNavigation.title,
                categories: categories
            };
        }
    }

    radioToggled(version: Version) {
        this.versionService.setVersion(version);
    }

    toVersion(version: string): Version {
        if (version) {
            return version.toLowerCase() === 'angularjs' ? Version.AngularJS : Version.Angular;
        }
    }


}