import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  type: string = 'video';
  mode: string = 'standard';

  videoSource: string = 'https://uxaspects.github.io/UXAspects/assets/media/catchingwave.mp4';
  audioSource: string = 'https://uxaspects.github.io/UXAspects/assets/media/Ocean-Waves.mp3';
  subtitles: string = 'https://uxaspects.github.io/UXAspects/assets/media/subtitles.vtt';
}
