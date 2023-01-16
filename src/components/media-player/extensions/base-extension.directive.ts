import { Directive, inject } from '@angular/core';
import { MediaPlayerService } from '../media-player.service';

@Directive({
    selector: '[mediaPlayerBaseExtension]'
})
export class MediaPlayerBaseExtensionDirective {
    readonly mediaPlayerService = inject(MediaPlayerService);
}
