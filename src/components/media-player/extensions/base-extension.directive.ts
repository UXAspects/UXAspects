import { Directive, Host } from '@angular/core';
import { MediaPlayerComponent } from '../media-player.component';

@Directive({ 
    selector: '[media-player-base-extension]' 
})
export class MediaPlayerBaseExtensionDirective {
    constructor(@Host() public mediaPlayerComponent: MediaPlayerComponent) { }
}