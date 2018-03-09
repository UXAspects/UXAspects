import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { IPlunk } from '../../../../../interfaces/IPlunk';
import { IPlunkProvider } from './../../../../../interfaces/IPlunkProvider';

@Component({
    selector: 'uxd-components-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.less']
})
@DocumentationSectionComponent('ComponentsMediaPlayerComponent')
export class ComponentsMediaPlayerComponent extends BaseDocumentationSection implements IPlunkProvider {

    type: string = 'video';
    mode: string = 'standard';

    videoSource: string = require('../../../../../assets/media/catchingwave.mp4');
    audioSource: string = require('../../../../../assets/media/Ocean-Waves.mp3');

    plunk: IPlunk = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['RadioButtonModule', 'MediaPlayerModule'],
            library: '@ux-aspects/ux-aspects'
        }, {
            imports: ['AccordionModule'],
            forRoot: true,
            library: 'ngx-bootstrap/accordion'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}