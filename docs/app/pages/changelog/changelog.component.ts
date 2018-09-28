import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IChangeLog } from '../../interfaces/IChangeLog';

@Component({
    selector: 'uxd-changelog-page',
    templateUrl: './changelog.component.html',
    styleUrls: ['./changelog.component.less']
})
export class ChangeLogPageComponent {

    logs: IChangeLog[];

    constructor(domSanitizer: DomSanitizer) {

        this.logs = [
            {
                version: '1.6.4',
                date: 'September 28th 2018',
                content: require('./logs/release-v1.6.4.md')
            },
            {
                version: '1.6.3',
                date: 'September 13th 2018',
                content: require('./logs/release-v1.6.3.md')
            },
            {
                version: '1.6.2',
                date: 'August 30th 2018',
                content: require('./logs/release-v1.6.2.md')
            },
            {
                version: '1.6.1',
                date: 'August 16th 2018',
                content: require('./logs/release-v1.6.1.md')
            },
            {
                version: '1.6.0',
                date: 'August 2nd 2018',
                content: require('./logs/release-v1.6.0.md')
            },
            {
                version: '1.5.17',
                date: 'July 19th 2018',
                content: require('./logs/release-v1.5.17.md')
            },
            {
                version: '1.5.16',
                date: 'July 5th 2018',
                content: require('./logs/release-v1.5.16.md')
            },
            {
                version: '1.5.15',
                date: 'June 20th 2018',
                content: require('./logs/release-v1.5.15.md')
            },
            {
                version: '1.5.14',
                date: 'June 7th 2018',
                content: require('./logs/release-v1.5.14.md')
            },
            {
                version: '1.5.13',
                date: 'May 25th 2018',
                content: require('./logs/release-v1.5.13.md')
            },
            {
                version: '1.5.12',
                date: 'May 10th 2018',
                content: require('./logs/release-v1.5.12.md')
            },
            {
                version: '1.5.11',
                date: 'April 30th 2018',
                content: require('./logs/release-v1.5.11.md')
            },
            {
                version: '1.5.10',
                date: 'April 25th 2018',
                content: require('./logs/release-v1.5.10.md')
            },
            {
                version: '1.5.9',
                date: 'April 12th 2018',
                content: require('./logs/release-v1.5.9.md')
            },
            {
                version: '1.5.8',
                date: 'March 29th 2018',
                content: require('./logs/release-v1.5.8.md')
            },
            {
                version: '1.5.7',
                date: 'March 15th 2018',
                content: require('./logs/release-v1.5.7.md')
            },
            {
                version: '1.5.6',
                date: 'February 28th 2018',
                content: require('./logs/release-v1.5.6.md')
            },
            {
                version: '1.5.5',
                date: 'February 14th 2018',
                content: require('./logs/release-v1.5.5.md')
            },
            {
                version: '1.5.4',
                date: 'January 31st 2018',
                content: require('./logs/release-v1.5.4.md')
            },
            {
                version: '1.5.3',
                date: 'January 17th 2018',
                content: require('./logs/release-v1.5.3.md')
            },
            {
                version: '1.5.2',
                date: 'December 20th 2017',
                content: require('./logs/release-v1.5.2.md')
            },
            {
                version: '1.5.1',
                date: 'December 7th 2017',
                content: require('./logs/release-v1.5.1.md')
            },
            {
                version: '1.5.0',
                date: 'November 23rd 2017',
                content: require('./logs/release-v1.5.0.md')
            },
            {
                version: '1.4.2',
                date: 'November 9th 2017',
                content: require('./logs/release-v1.4.2.md')
            },
            {
                version: '1.4.1',
                date: 'October 25th 2017',
                content: require('./logs/release-v1.4.1.md')
            },
            {
                version: '1.4.0',
                date: 'October 11th 2017',
                content: require('./logs/release-v1.4.0.md')
            },
            {
                version: '1.3.6',
                date: 'September 26th 2017',
                content: require('./logs/release-v1.3.6.md')
            },
            {
                version: '1.3.5',
                date: 'September 14th 2017',
                content: require('./logs/release-v1.3.5.md')
            },
            {
                version: '1.3.3',
                date: 'August 15th 2017',
                content: require('./logs/release-v1.3.3.md')
            },
            {
                version: '1.3.2',
                date: 'August 1st 2017',
                content: require('./logs/release-v1.3.2.md')
            },
            {
                version: '1.3.1',
                date: 'July 18th 2017',
                content: require('./logs/release-v1.3.1.md')
            },
            {
                version: '1.3.0',
                date: 'July 4th 2017',
                content: require('./logs/release-v1.3.0.md')
            },
            {
                version: '1.2.2',
                date: 'June 20th 2017',
                content: require('./logs/release-v1.2.2.md')
            },
            {
                version: '1.2.0',
                date: 'June 6th 2017',
                content: require('./logs/release-v1.2.0.md')
            },
            {
                version: '1.2.0-beta.1',
                date: 'May 24th 2017',
                content: require('./logs/release-v1.2.0-beta.1.md')
            },
            {
                version: '1.1.0',
                date: 'May 9th 2017',
                content: require('./logs/release-v1.1.0.md')
            },
            {
                version: '1.1.0-beta.1',
                date: 'April 25th 2017',
                content: require('./logs/release-v1.1.0-beta.1.md')
            },
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