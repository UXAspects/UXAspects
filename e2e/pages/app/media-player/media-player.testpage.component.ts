import { Component } from '@angular/core';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.testpage.component.html',
    styleUrls: ['./media-player.testpage.component.less'],
})
export class MediaPlayerTestPageComponent {
    type: string = 'video';
    mode: string = 'standard';

    videoSource: string =  'data:video/mp4;base64,aHR0cHM6Ly91eGFzcGVjdHMuZ2l0aHViLmlvL1VYQXNwZWN0cy9hc3NldHMvbWVkaWEvY2F0Y2hpbmd3YXZlLm1wNA==';
}
