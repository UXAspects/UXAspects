import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    uploader: FileUploader = new FileUploader({});
}