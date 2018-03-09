import { Input, Component, Inject } from '@angular/core';

import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';
import { EditExampleService } from '../../services/edit-example/edit-example.service';
import { ICodePen } from '../../interfaces/ICodePen';
import { ICodePenTemplate } from '../../interfaces/ICodePenTemplate';
import { IAppConfiguration } from '../../interfaces/IAppConfiguration';
import { IPlunk } from '../../interfaces/IPlunk';

@Component({
    selector: 'uxd-edit-example-link',
    templateUrl: './edit-example-link.component.html',
    styleUrls: ['./edit-example-link.component.less'],
    host: {
        '[class.enabled]': 'isLinkEnabled()'
    }
})
export class EditExampleLinkComponent {

    @Input() title: string;
    @Input() content: ICodePen | IPlunk;
    @Input() type: 'codepen' | 'plunker';
    @Input() version: 'Angular' | 'AngularJS' = 'Angular';

    constructor(private editExampleService: EditExampleService) {}

    linkClick(event: MouseEvent) {
        let target = event.target as HTMLElement;
        target.blur();
        this.editExampleService.launchEditor(this.title, this.content, this.type);
    }

    isLinkEnabled() {
        // Present 'Edit in CodePen' link if any of the main codepen properties are defined
        // return this.codepen && (this.codepen.html || this.codepen.css || this.codepen.js || this.codepen.ts);
        return this.content;
    }

}
