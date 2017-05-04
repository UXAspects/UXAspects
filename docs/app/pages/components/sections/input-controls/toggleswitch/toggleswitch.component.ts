import { UsageProvider } from './../../../../../interfaces/UsageProvider';
import { Component } from '@angular/core';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from '../../../../../interfaces/IPlunkProvider';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { Usage } from "../../../../../interfaces/Usage";

@Component({
  selector: 'uxd-components-toggleswitch',
  templateUrl: './toggleswitch.component.html'
})
@DocumentationSectionComponent('ComponentsToggleSwitchComponent')
export class ComponentsToggleSwitchComponent extends BaseDocumentationSection  implements IPlunkProvider, UsageProvider {

  public toggleSwitches: any;
  public toggleSwitchDisable: boolean;

  public plunk: IPlunk = {
      files: {
          'app.component.ts': require('./snippets/app.ts'),
          'app.component.html': require('./snippets/app.html')
      },
      modules: [{
          imports: ['ToggleSwitchModule'],
          library: 'ux-aspects'
      }]
  };

  public usage: Usage = {
      usage: [{
          title: 'Selector',
          content: 'ux-toggleswitch'
      },{
          title: 'Module name',
          content: 'ToggleSwitchModule'
      }],
  };

  constructor() {

    super(
        null, // require.context('!!prismjs-loader?lang=html!./snippets/', false, /\.html$/),
        null, // require.context('!!prismjs-loader?lang=css!./snippets/', false, /\.css$/),
        null, // require.context('!!prismjs-loader?lang=javascript!./snippets/', false, /\.js$/),
        null, // require.context('!!prismjs-loader?lang=typescript!./snippets/', false, /\.ts$/),
        require.context('./snippets/', false, /\.(html|css|js|ts)$/)
    );

    this.toggleSwitches = {
      option1: true,
      option2: false,
      option3: false,
      option4: false
    };

    this.toggleSwitchDisable = false;
  }
}