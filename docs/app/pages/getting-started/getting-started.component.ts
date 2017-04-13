import { Component } from '@angular/core';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-getting-started',
    templateUrl: './getting-started.component.html'
})
export class GettingStartedPageComponent {
    
    private version = this.appConfig.get('version');

    private angular4Ts = require('!!raw-loader!./snippets/angular4.txt');
    private angular4UpgradeTs = require('!!raw-loader!./snippets/angular4-upgrade.txt');
    private angular1DowngradeJs = require('!!raw-loader!./snippets/angular1-downgrade.js');
    private stylesheetHtml = require('!!raw-loader!./snippets/stylesheet.html');

    constructor(private appConfig: AppConfiguration) {}
}