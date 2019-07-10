import { Component } from '@angular/core';

@Component({
    selector: 'uxd-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: ['./getting-started.component.less']
})
export class GettingStartedPageComponent {
    moduleTs = require('!!raw-loader!./snippets/module.ts.txt');
    stylesheetCss = require('!!raw-loader!./snippets/stylesheet.css');
}