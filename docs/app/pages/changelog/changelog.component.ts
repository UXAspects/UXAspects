import { Component } from '@angular/core';
import { IChangeLog } from '../../interfaces/IChangeLog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'uxd-changelog-page',
    templateUrl: './changelog.component.html',
    styleUrls: ['./changelog.component.less']
})
export class ChangeLogPageComponent {

    private logs: IChangeLog[];

    constructor(private domSanitizer: DomSanitizer) {

        this.logs = [
            {
                version: '1.0.0',
                date: 'April 12th 2017',
                content: require('./logs/release-v1.0.0.md')
            }
        ];

        // santize blog posts
        this.logs.forEach(log => {
            log.content = domSanitizer.bypassSecurityTrustHtml(log.content) as string;
        });

    }
}