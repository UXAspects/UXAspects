import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fileOver: boolean = false;
  uploader: FileUploader = new FileUploader({ url: './' });

  constructor() {
    const announcer = inject(LiveAnnouncer);

    this.uploader.onCompleteAll = () => announcer.announce('All files have been uploaded.');
  }
}
