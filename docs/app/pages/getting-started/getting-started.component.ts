import { Component } from '@angular/core';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-getting-started',
    templateUrl: './getting-started.component.html'
})
export class GettingStartedPageComponent {
    
    private version = this.appConfig.get('version');

    private angular4Ts = require('!!prismjs-loader?lang=javascript!./snippets/angular4.txt');
    private angular4UpgradeTs = require('!!prismjs-loader?lang=javascript!./snippets/angular4-upgrade.txt');
    private angular1DowngradeJs = require('!!prismjs-loader?lang=javascript!./snippets/angular1-downgrade.js');
    private stylesheetHtml = require('!!prismjs-loader?lang=html!./snippets/stylesheet.html');

    constructor(private appConfig: AppConfiguration) {}
}