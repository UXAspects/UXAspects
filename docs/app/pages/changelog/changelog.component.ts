import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EboxModule } from '@ux-aspects/ux-aspects';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { IChangeLog } from '../../interfaces/IChangeLog';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
  selector: 'uxd-changelog-page',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.less'],
  imports: [PageHeaderComponent, NgFor, EboxModule],
})
export class ChangeLogPageComponent implements OnInit {
  logs: IChangeLog[];

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly appConfig: AppConfiguration
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async ngOnInit(): Promise<void> {
    this.logs = [
      {
        version: '11.0.0',
        date: 'November 21st 2024',
        content: require('./logs/release-v11.0.0.md'),
      },
      {
        version: '10.1.0',
        date: 'August 1st 2024',
        content: require('./logs/release-v10.1.0.md'),
      },
      {
        version: '10.0.0',
        date: 'June 6th 2024',
        content: require('./logs/release-v10.0.0.md'),
      },
      {
        version: '9.2.0',
        date: 'February 28th 2024',
        content: require('./logs/release-v9.2.0.md'),
      },
      {
        version: '9.1.0',
        date: 'February 1st 2024',
        content: require('./logs/release-v9.1.0.md'),
      },
      {
        version: '9.0.0',
        date: 'December 7th 2023',
        content: require('./logs/release-v9.0.0.md'),
      },
      {
        version: '8.1.0',
        date: 'August 3rd 2023',
        content: require('./logs/release-v8.1.0.md'),
      },
      {
        version: '8.0.0',
        date: 'June 22nd 2023',
        content: require('./logs/release-v8.0.0.md'),
      },
      {
        version: '7.6.0',
        date: 'May 11th 2023',
        content: require('./logs/release-v7.6.0.md'),
      },
      {
        version: '7.5.0',
        date: 'April 27th 2023',
        content: require('./logs/release-v7.5.0.md'),
      },
      {
        version: '7.3.0',
        date: 'February 30th 2023',
        content: require('./logs/release-v7.3.0.md'),
      },
      {
        version: '7.1.0',
        date: 'February 2nd 2023',
        content: require('./logs/release-v7.1.0.md'),
      },
      {
        version: '7.0.0',
        date: 'January 19th 2023',
        content: require('./logs/release-v7.0.0.md'),
      },
      {
        version: '6.9.0',
        date: 'December 8th 2022',
        content: require('./logs/release-v6.9.0.md'),
      },
      {
        version: '6.8.0',
        date: 'November 10th 2022',
        content: require('./logs/release-v6.8.0.md'),
      },
      {
        version: '6.7.0',
        date: 'October 27th 2022',
        content: require('./logs/release-v6.7.0.md'),
      },
      {
        version: '6.6.0',
        date: 'October 13th 2022',
        content: require('./logs/release-v6.6.0.md'),
      },
      {
        version: '6.5.0',
        date: 'September 29th 2022',
        content: require('./logs/release-v6.5.0.md'),
      },
      {
        version: '6.4.0',
        date: 'September 15th 2022',
        content: require('./logs/release-v6.4.0.md'),
      },
      {
        version: '6.3.0',
        date: 'September 1st 2022',
        content: require('./logs/release-v6.3.0.md'),
      },
      {
        version: '6.1.0',
        date: 'July 21st 2022',
        content: require('./logs/release-v6.1.0.md'),
      },
      {
        version: '6.0.0',
        date: 'July 7th 2022',
        content: require('./logs/release-v6.0.0.md'),
      },
      {
        version: '5.11.0',
        date: 'June 9th 2022',
        content: require('./logs/release-v5.11.0.md'),
      },
      {
        version: '5.10.0',
        date: 'May 26th 2022',
        content: require('./logs/release-v5.10.0.md'),
      },
      {
        version: '5.9.0',
        date: 'May 12th 2022',
        content: require('./logs/release-v5.9.0.md'),
      },
      {
        version: '5.8.0',
        date: 'April 28th 2022',
        content: require('./logs/release-v5.8.0.md'),
      },
      {
        version: '5.7.0',
        date: 'April 13th 2022',
        content: require('./logs/release-v5.7.0.md'),
      },
      {
        version: '5.6.0',
        date: 'March 30th 2022',
        content: require('./logs/release-v5.6.0.md'),
      },
      {
        version: '5.5.0',
        date: 'March 18th 2022',
        content: require('./logs/release-v5.5.0.md'),
      },
      {
        version: '5.4.0',
        date: 'March 3rd 2022',
        content: require('./logs/release-v5.4.0.md'),
      },
      {
        version: '5.3.0',
        date: 'February 17th 2022',
        content: require('./logs/release-v5.3.0.md'),
      },
      {
        version: '5.2.0',
        date: 'February 3rd 2022',
        content: require('./logs/release-v5.2.0.md'),
      },
      {
        version: '5.1.0',
        date: 'January 20th 2022',
        content: require('./logs/release-v5.1.0.md'),
      },
      {
        version: '5.0.0',
        date: 'January 6th 2022',
        content: require('./logs/release-v5.0.0.md'),
      },
      {
        version: '4.9.0',
        date: 'October 28th 2021',
        content: require('./logs/release-v4.9.0.md'),
      },
      {
        version: '4.8.0',
        date: 'October 14th 2021',
        content: require('./logs/release-v4.8.0.md'),
      },
      {
        version: '4.7.0',
        date: 'September 30th 2021',
        content: require('./logs/release-v4.7.0.md'),
      },
      {
        version: '4.6.0',
        date: 'September 16th 2021',
        content: require('./logs/release-v4.6.0.md'),
      },
      {
        version: '4.5.0',
        date: 'September 2nd 2021',
        content: require('./logs/release-v4.5.0.md'),
      },
      {
        version: '4.4.0',
        date: 'August 19th 2021',
        content: require('./logs/release-v4.4.0.md'),
      },
      {
        version: '4.3.0',
        date: 'August 5th 2021',
        content: require('./logs/release-v4.3.0.md'),
      },
      {
        version: '4.2.0',
        date: 'July 22nd 2021',
        content: require('./logs/release-v4.2.0.md'),
      },
      {
        version: '4.1.0',
        date: 'June 8th 2021',
        content: require('./logs/release-v4.1.0.md'),
      },
      {
        version: '4.0.0',
        date: 'June 24th 2021',
        content: require('./logs/release-v4.0.0.md'),
      },
      {
        version: '3.10.0',
        date: 'May 27th 2021',
        content: require('./logs/release-v3.10.0.md'),
      },
      {
        version: '3.9.0',
        date: 'May 13th 2021',
        content: require('./logs/release-v3.9.0.md'),
      },
      {
        version: '3.8.1',
        date: 'April 29th 2021',
        content: require('./logs/release-v3.8.1.md'),
      },
      {
        version: '3.7.0',
        date: 'April 15th 2021',
        content: require('./logs/release-v3.7.0.md'),
      },
      {
        version: '3.6.0',
        date: 'April 1st 2021',
        content: require('./logs/release-v3.6.0.md'),
      },
      {
        version: '3.5.0',
        date: 'March 18th 2021',
        content: require('./logs/release-v3.5.0.md'),
      },
      {
        version: '3.4.0',
        date: 'March 4th 2021',
        content: require('./logs/release-v3.4.0.md'),
      },
      {
        version: '3.3.0',
        date: 'February 19th 2021',
        content: require('./logs/release-v3.3.0.md'),
      },
      {
        version: '3.2.1',
        date: 'February 8th 2021',
        content: require('./logs/release-v3.2.1.md'),
      },
      {
        version: '3.2.0',
        date: 'February 4th 2021',
        content: require('./logs/release-v3.2.0.md'),
      },
      {
        version: '3.1.0',
        date: 'January 21st 2021',
        content: require('./logs/release-v3.1.0.md'),
      },
      {
        version: '3.0.0',
        date: 'January 7th 2021',
        content: require('./logs/release-v3.0.0.md'),
      },
      {
        version: '2.1.9',
        date: 'November 26th 2020',
        content: require('./logs/release-v2.1.9.md'),
      },
      {
        version: '2.1.8',
        date: 'November 12th 2020',
        content: require('./logs/release-v2.1.8.md'),
      },
      {
        version: '2.1.7',
        date: 'October 29th 2020',
        content: require('./logs/release-v2.1.7.md'),
      },
      {
        version: '2.1.6',
        date: 'October 15th 2020',
        content: require('./logs/release-v2.1.6.md'),
      },
      {
        version: '2.1.5',
        date: 'October 1st 2020',
        content: require('./logs/release-v2.1.5.md'),
      },
      {
        version: '2.1.4',
        date: 'September 17th 2020',
        content: require('./logs/release-v2.1.4.md'),
      },
      {
        version: '2.1.3',
        date: 'September 3rd 2020',
        content: require('./logs/release-v2.1.3.md'),
      },
      {
        version: '2.1.2',
        date: 'August 20th 2020',
        content: require('./logs/release-v2.1.2.md'),
      },
      {
        version: '2.1.1',
        date: 'August 6th 2020',
        content: require('./logs/release-v2.1.1.md'),
      },
      {
        version: '2.1.0',
        date: 'July 24th 2020',
        content: require('./logs/release-v2.1.0.md'),
      },
      {
        version: '2.0.6',
        date: 'July 9th 2020',
        content: require('./logs/release-v2.0.6.md'),
      },
      {
        version: '2.0.5',
        date: 'June 26th 2020',
        content: require('./logs/release-v2.0.5.md'),
      },
      {
        version: '2.0.4',
        date: 'June 11th 2020',
        content: require('./logs/release-v2.0.4.md'),
      },
      {
        version: '2.0.3',
        date: 'May 28th 2020',
        content: require('./logs/release-v2.0.3.md'),
      },
      {
        version: '2.0.2',
        date: 'May 18th 2020',
        content: require('./logs/release-v2.0.2.md'),
      },
      {
        version: '2.0.1',
        date: 'April 30th 2020',
        content: require('./logs/release-v2.0.1.md'),
      },
      {
        version: '2.0.0',
        date: 'April 17th 2020',
        content: require('./logs/release-v2.0.0.md'),
      },
      {
        version: '1.8.18',
        date: 'April 16th 2020',
        content: require('./logs/release-v1.8.18.md'),
      },
      {
        version: '1.8.17',
        date: 'April 2nd 2020',
        content: require('./logs/release-v1.8.17.md'),
      },
      {
        version: '1.8.16',
        date: 'March 19th 2020',
        content: require('./logs/release-v1.8.16.md'),
      },
      {
        version: '1.8.15',
        date: 'March 5th 2020',
        content: require('./logs/release-v1.8.15.md'),
      },
      {
        version: '1.8.14',
        date: 'February 20th 2020',
        content: require('./logs/release-v1.8.14.md'),
      },
      {
        version: '1.8.13',
        date: 'February 5th 2020',
        content: require('./logs/release-v1.8.13.md'),
      },
      {
        version: '1.8.12',
        date: 'January 23rd 2020',
        content: require('./logs/release-v1.8.12.md'),
      },
      {
        version: '1.8.11',
        date: 'December 19th 2019',
        content: require('./logs/release-v1.8.11.md'),
      },
      {
        version: '1.8.10',
        date: 'December 5th 2019',
        content: require('./logs/release-v1.8.10.md'),
      },
      {
        version: '1.8.9',
        date: 'November 21st 2019',
        content: require('./logs/release-v1.8.9.md'),
      },
      {
        version: '1.8.8',
        date: 'October 31st 2019',
        content: require('./logs/release-v1.8.8.md'),
      },
      {
        version: '1.8.7',
        date: 'October 17th 2019',
        content: require('./logs/release-v1.8.7.md'),
      },
      {
        version: '1.8.6',
        date: 'October 2nd 2019',
        content: require('./logs/release-v1.8.6.md'),
      },
      {
        version: '1.8.5',
        date: 'September 19th 2019',
        content: require('./logs/release-v1.8.5.md'),
      },
      {
        version: '1.8.4',
        date: 'September 5th 2019',
        content: require('./logs/release-v1.8.4.md'),
      },
      {
        version: '1.8.3',
        date: 'August 22nd 2019',
        content: require('./logs/release-v1.8.3.md'),
      },
      {
        version: '1.8.2',
        date: 'August 8th 2019',
        content: require('./logs/release-v1.8.2.md'),
      },
      {
        version: '1.8.1',
        date: 'July 25th 2019',
        content: require('./logs/release-v1.8.1.md'),
      },
      {
        version: '1.8.0',
        date: 'July 11th 2019',
        content: require('./logs/release-v1.8.0.md'),
      },
      {
        version: '1.7.16',
        date: 'June 26th 2019',
        content: require('./logs/release-v1.7.16.md'),
      },
      {
        version: '1.7.15',
        date: 'June 13th 2019',
        content: require('./logs/release-v1.7.15.md'),
      },
      {
        version: '1.7.14',
        date: 'May 30th 2019',
        content: require('./logs/release-v1.7.14.md'),
      },
      {
        version: '1.7.13',
        date: 'May 16th 2019',
        content: require('./logs/release-v1.7.13.md'),
      },
      {
        version: '1.7.12',
        date: 'May 2nd 2019',
        content: require('./logs/release-v1.7.12.md'),
      },
      {
        version: '1.7.11',
        date: 'April 18th 2019',
        content: require('./logs/release-v1.7.11.md'),
      },
      {
        version: '1.7.10',
        date: 'April 4th 2019',
        content: require('./logs/release-v1.7.10.md'),
      },
      {
        version: '1.7.9',
        date: 'March 28th 2019',
        content: require('./logs/release-v1.7.9.md'),
      },
      {
        version: '1.7.8',
        date: 'March 21st 2019',
        content: require('./logs/release-v1.7.8.md'),
      },
      {
        version: '1.7.7',
        date: 'March 7th 2019',
        content: require('./logs/release-v1.7.7.md'),
      },
      {
        version: '1.7.6',
        date: 'February 21st 2019',
        content: require('./logs/release-v1.7.6.md'),
      },
      {
        version: '1.7.5',
        date: 'February 7th 2019',
        content: require('./logs/release-v1.7.5.md'),
      },
      {
        version: '1.7.4',
        date: 'January 24th 2019',
        content: require('./logs/release-v1.7.4.md'),
      },
      {
        version: '1.7.3',
        date: 'January 10th 2019',
        content: require('./logs/release-v1.7.3.md'),
      },
      {
        version: '1.7.2',
        date: 'December 18th 2018',
        content: require('./logs/release-v1.7.2.md'),
      },
      {
        version: '1.7.1',
        date: 'December 13th 2018',
        content: require('./logs/release-v1.7.1.md'),
      },
      {
        version: '1.7.0',
        date: 'November 29th 2018',
        content: require('./logs/release-v1.7.0.md'),
      },
      {
        version: '1.6.8',
        date: 'November 8th 2018',
        content: require('./logs/release-v1.6.8.md'),
      },
      {
        version: '1.6.7',
        date: 'October 25th 2018',
        content: require('./logs/release-v1.6.7.md'),
      },
      {
        version: '1.6.5',
        date: 'October 11th 2018',
        content: require('./logs/release-v1.6.5.md'),
      },
      {
        version: '1.6.4',
        date: 'September 28th 2018',
        content: require('./logs/release-v1.6.4.md'),
      },
      {
        version: '1.6.3',
        date: 'September 13th 2018',
        content: require('./logs/release-v1.6.3.md'),
      },
      {
        version: '1.6.2',
        date: 'August 30th 2018',
        content: require('./logs/release-v1.6.2.md'),
      },
      {
        version: '1.6.1',
        date: 'August 16th 2018',
        content: require('./logs/release-v1.6.1.md'),
      },
      {
        version: '1.6.0',
        date: 'August 2nd 2018',
        content: require('./logs/release-v1.6.0.md'),
      },
      {
        version: '1.5.17',
        date: 'July 19th 2018',
        content: require('./logs/release-v1.5.17.md'),
      },
      {
        version: '1.5.16',
        date: 'July 5th 2018',
        content: require('./logs/release-v1.5.16.md'),
      },
      {
        version: '1.5.15',
        date: 'June 20th 2018',
        content: require('./logs/release-v1.5.15.md'),
      },
      {
        version: '1.5.14',
        date: 'June 7th 2018',
        content: require('./logs/release-v1.5.14.md'),
      },
      {
        version: '1.5.13',
        date: 'May 25th 2018',
        content: require('./logs/release-v1.5.13.md'),
      },
      {
        version: '1.5.12',
        date: 'May 10th 2018',
        content: require('./logs/release-v1.5.12.md'),
      },
      {
        version: '1.5.11',
        date: 'April 30th 2018',
        content: require('./logs/release-v1.5.11.md'),
      },
      {
        version: '1.5.10',
        date: 'April 25th 2018',
        content: require('./logs/release-v1.5.10.md'),
      },
      {
        version: '1.5.9',
        date: 'April 12th 2018',
        content: require('./logs/release-v1.5.9.md'),
      },
      {
        version: '1.5.8',
        date: 'March 29th 2018',
        content: require('./logs/release-v1.5.8.md'),
      },
      {
        version: '1.5.7',
        date: 'March 15th 2018',
        content: require('./logs/release-v1.5.7.md'),
      },
      {
        version: '1.5.6',
        date: 'February 28th 2018',
        content: require('./logs/release-v1.5.6.md'),
      },
      {
        version: '1.5.5',
        date: 'February 14th 2018',
        content: require('./logs/release-v1.5.5.md'),
      },
      {
        version: '1.5.4',
        date: 'January 31st 2018',
        content: require('./logs/release-v1.5.4.md'),
      },
      {
        version: '1.5.3',
        date: 'January 17th 2018',
        content: require('./logs/release-v1.5.3.md'),
      },
      {
        version: '1.5.2',
        date: 'December 20th 2017',
        content: require('./logs/release-v1.5.2.md'),
      },
      {
        version: '1.5.1',
        date: 'December 7th 2017',
        content: require('./logs/release-v1.5.1.md'),
      },
      {
        version: '1.5.0',
        date: 'November 23rd 2017',
        content: require('./logs/release-v1.5.0.md'),
      },
      {
        version: '1.4.2',
        date: 'November 9th 2017',
        content: require('./logs/release-v1.4.2.md'),
      },
      {
        version: '1.4.1',
        date: 'October 25th 2017',
        content: require('./logs/release-v1.4.1.md'),
      },
      {
        version: '1.4.0',
        date: 'October 11th 2017',
        content: require('./logs/release-v1.4.0.md'),
      },
      {
        version: '1.3.6',
        date: 'September 26th 2017',
        content: require('./logs/release-v1.3.6.md'),
      },
      {
        version: '1.3.5',
        date: 'September 14th 2017',
        content: require('./logs/release-v1.3.5.md'),
      },
      {
        version: '1.3.3',
        date: 'August 15th 2017',
        content: require('./logs/release-v1.3.3.md'),
      },
      {
        version: '1.3.2',
        date: 'August 1st 2017',
        content: require('./logs/release-v1.3.2.md'),
      },
      {
        version: '1.3.1',
        date: 'July 18th 2017',
        content: require('./logs/release-v1.3.1.md'),
      },
      {
        version: '1.3.0',
        date: 'July 4th 2017',
        content: require('./logs/release-v1.3.0.md'),
      },
      {
        version: '1.2.2',
        date: 'June 20th 2017',
        content: require('./logs/release-v1.2.2.md'),
      },
      {
        version: '1.2.0',
        date: 'June 6th 2017',
        content: require('./logs/release-v1.2.0.md'),
      },
      {
        version: '1.2.0-beta.1',
        date: 'May 24th 2017',
        content: require('./logs/release-v1.2.0-beta.1.md'),
      },
      {
        version: '1.1.0',
        date: 'May 9th 2017',
        content: require('./logs/release-v1.1.0.md'),
      },
      {
        version: '1.1.0-beta.1',
        date: 'April 25th 2017',
        content: require('./logs/release-v1.1.0-beta.1.md'),
      },
      {
        version: '1.0.0',
        date: 'April 12th 2017',
        content: require('./logs/release-v1.0.0.md'),
      },
    ];

    this.logs.forEach(log => {
      const markdown = log.content.replace(/{{baseUrl}}/g, this.appConfig.baseUrl);
      log.content = this.domSanitizer.bypassSecurityTrustHtml(markdown) as string;
    });
  }
}
