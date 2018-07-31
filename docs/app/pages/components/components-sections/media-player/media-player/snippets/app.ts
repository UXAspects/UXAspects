import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    type: string = 'video';
    mode: string = 'standard';

    videoSource: string = `${uxdAssetsUrl}/media/catchingwave.mp4`;
    audioSource: string = `${uxdAssetsUrl}/media/Ocean-Waves.mp3`;
    subtitles: string = `${uxdAssetsUrl}/media/subtitles.vtt`;

}