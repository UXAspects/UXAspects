import { Component } from '@angular/core';
import audioSource from '../../../../../../assets/media/Ocean-Waves.mp3';
import videoSource from '../../../../../../assets/media/catchingwave.mp4';
import subtitles from '../../../../../../assets/media/subtitles.vtt';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';

@Component({
    selector: 'uxd-components-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.less'],
})
@DocumentationSectionComponent('ComponentsMediaPlayerComponent')
export class ComponentsMediaPlayerComponent
    extends BaseDocumentationSection
    implements IPlaygroundProvider
{
    type: string = 'video';
    mode: string = 'standard';

    videoSource: string = videoSource;
    audioSource: string = audioSource;
    subtitles: string = subtitles;

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss,
        },
        modules: [
            {
                imports: ['RadioButtonModule', 'MediaPlayerModule', 'AccordionModule'],
                library: '@ux-aspects/ux-aspects',
            },
        ],
    };

    constructor() {
        super(
            import.meta.webpackContext('./snippets/', {
                recursive: false,
                regExp: /\.(html|css|js|ts)$/,
            })
        );
    }
}
