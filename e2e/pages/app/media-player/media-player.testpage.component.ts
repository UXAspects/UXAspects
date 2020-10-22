import { Component } from '@angular/core';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.testpage.component.html',
    styleUrls: ['./media-player.testpage.component.less'],
})
export class MediaPlayerTestPageComponent {
    type: string = 'video';
    mode: string = 'standard';

    videoSource: string =  'https://uxaspects.github.io/UXAspects/assets/media/catchingwave.mp4';
    subtitles: string =  'https://uxaspects.github.io/UXAspects/assets/media/subtitles.vtt';

}
