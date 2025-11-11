import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import {
  AccessibilityModule,
  IconModule,
  ProgressBarModule,
  TabsetModule,
} from '@ux-aspects/ux-aspects';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { SnippetComponent } from '../../../../../components/snippet/snippet.component';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
  selector: 'uxd-components-file-upload',
  templateUrl: './file-upload.component.html',
  imports: [
    AccessibilityModule,
    FileUploadModule,
    ProgressBarModule,
    IconModule,
    TabsetModule,
    SnippetComponent,
  ],
})
@DocumentationSectionComponent('ComponentsFileUploadComponent')
export class ComponentsFileUploadComponent
  extends BaseDocumentationSection
  implements IPlaygroundProvider
{
  fileOver: boolean = false;
  uploader: FileUploader = new FileUploader({ url: './' });

  playground: IPlayground = {
    files: {
      'app.component.html': this.snippets.raw.appHtml,
      'app.component.ts': this.snippets.raw.appTs,
    },
    modules: [
      {
        imports: ['FileUploadModule'],
        library: 'ng2-file-upload',
      },
      {
        imports: ['ProgressBarModule'],
        library: '@ux-aspects/ux-aspects',
      },
      {
        imports: ['A11yModule'],
        library: '@angular/cdk/a11y',
      },
    ],
  };

  constructor() {
    const announcer = inject(LiveAnnouncer);

    super(
      import.meta.webpackContext('./snippets/', {
        recursive: false,
        regExp: /\.(html|css|js|ts)$/,
      })
    );

    this.uploader.onCompleteAll = () => announcer.announce('All files have been uploaded.');
  }
}
