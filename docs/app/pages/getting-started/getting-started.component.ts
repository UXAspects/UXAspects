import { Component } from '@angular/core';
import cliJson from './snippets/cli.txt';
import moduleTs from './snippets/module.ts.txt';

@Component({
  selector: 'uxd-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.less'],
  standalone: false,
})
export class GettingStartedPageComponent {
  moduleTs = moduleTs;
  cliJson = cliJson;
}
