import { Component } from '@angular/core';
import { RadioButtonModule, MediaPlayerModule, AccordionModule } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.testpage.component.html',
    styleUrls: ['./media-player.testpage.component.less'],
})
export class MediaPlayerTestPageComponent {
    type: string = 'video';
    mode: string = 'standard';

    videoSource: string = `https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/assets/media/catchingwave.mp4`;
    audioSource: string = `https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/assets/media/Ocean-Waves.mp3`;
    subtitles: string = `https://pages.github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/assets/media/subtitles.vtt`;

}
