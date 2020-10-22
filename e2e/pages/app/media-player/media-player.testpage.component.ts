import { Component } from '@angular/core';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.testpage.component.html',
    styleUrls: ['./media-player.testpage.component.less'],
})
export class MediaPlayerTestPageComponent {
    type: string = 'video';
    mode: string = 'standard';

    videoSource: string =  'data:video/mp4;base64,aHR0cHM6Ly9wYWdlcy5naXRodWIuaG91c3Rvbi5zb2Z0d2FyZWdycC5uZXQvY2FmL3V4LWFzcGVjdHMtbWljcm8tZm9jdXMvYXNzZXRzL21lZGlhL2NhdGNoaW5nd2F2ZS5tcDQ=';
    subtitles: string =  'data:video/mp4;base64,/+aHR0cHM6Ly9wYWdlcy5naXRodWIuaG91c3Rvbi5zb2Z0d2FyZWdycC5uZXQvY2FmL3V4LWFzcGVjdHMtbWljcm8tZm9jdXMvMDA4NDQyNDc3MzAxM2ZhNTdjNTI4MzJiZjE0NWUxZTQudnR0';

}
