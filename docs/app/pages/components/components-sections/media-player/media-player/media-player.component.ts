import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.less']
})
@DocumentationSectionComponent('ComponentsMediaPlayerComponent')
export class ComponentsMediaPlayerComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    type: string = 'video';
    mode: string = 'standard';
    filename: string = '';

    videoSource: string = require('../../../../../assets/media/catchingwave.mp4');
    audioSource: string = require('../../../../../assets/media/Ocean-Waves.mp3');
    subtitles: string = require('!!file-loader!../../../../../assets/media/subtitles.vtt');

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['RadioButtonModule', 'MediaPlayerModule', 'AccordionModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}
