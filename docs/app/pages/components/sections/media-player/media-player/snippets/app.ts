import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})
export class AppComponent {

    type: string = 'video';
    mode: string = 'standard';

    videoSource: string = `${uxdAssetsUrl}/media/catchingwave.mp4`;
    audioSource: string = `${uxdAssetsUrl}/media/Ocean-Waves.mp3`;

}