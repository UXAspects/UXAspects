import { Component } from '@angular/core';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-getting-started',
    templateUrl: './getting-started.component.html'
})
export class GettingStartedPageComponent {
    
    version = this.appConfig.get('version');
    angular4Ts = require('!!raw-loader!./snippets/angular4.txt');
    angular4BowerTs = require('!!raw-loader!./snippets/angular4Bower.txt');
    angular4UpgradeTs = require('!!raw-loader!./snippets/angular4-upgrade.txt');
    angular1DowngradeJs = require('!!raw-loader!./snippets/angular1-downgrade.js');
    stylesheetCss = require('!!raw-loader!./snippets/stylesheet.css');
    headerHtml = require('!!raw-loader!./snippets/header.html');
    webpackJs = require('!!raw-loader!./snippets/webpack.js');
    cliJson = require('!!raw-loader!./snippets/cli.txt');
    tsconfig = require('!!raw-loader!./snippets/tsconfig.txt');

    constructor(private appConfig: AppConfiguration) {}
}