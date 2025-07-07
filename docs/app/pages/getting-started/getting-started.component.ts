import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SnippetComponent } from '../../components/snippet/snippet.component';
import { TextPageLayoutComponent } from '../../components/text-page-layout/text-page-layout.component';
import cliJson from './snippets/cli.txt';
import moduleTs from './snippets/module.ts.txt';

@Component({
  selector: 'uxd-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.less'],
  imports: [
    PageHeaderComponent,
    TextPageLayoutComponent,
    RouterLink,
    AccessibilityModule,
    SnippetComponent,
  ],
})
export class GettingStartedPageComponent {
  moduleTs = moduleTs;
  cliJson = cliJson;
}
