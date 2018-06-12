import { Directive } from '@angular/core';
import { MediaPlayerService } from '../media-player.service';

@Directive({
    selector: '[mediaPlayerBaseExtension]'
})
export class MediaPlayerBaseExtensionDirective {
    constructor(public mediaPlayerService: MediaPlayerService) { }
}