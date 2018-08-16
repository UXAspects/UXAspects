/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AudioService } from '../../services/audio/index';
import { MediaPlayerService } from './media-player.service';
export class MediaPlayerComponent {
    /**
     * @param {?} mediaPlayerService
     * @param {?} _audioService
     * @param {?} _elementRef
     */
    constructor(mediaPlayerService, _audioService, _elementRef) {
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        this.focused = false;
        this.crossorigin = 'use-credentials';
        this._onDestroy = new Subject();
        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(tap(() => this.hovering = true), debounceTime(2000), takeUntil(this._onDestroy)).subscribe(() => this.hovering = false);
    }
    /**
     * @return {?}
     */
    get source() {
        return this.mediaPlayerService.source;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set source(value) {
        this.mediaPlayerService.source = value;
    }
    /**
     * @return {?}
     */
    get type() {
        return this.mediaPlayerService.type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this.mediaPlayerService.type = value;
    }
    /**
     * @return {?}
     */
    get quietMode() {
        return this.mediaPlayerService.quietMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set quietMode(value) {
        this.mediaPlayerService.quietMode = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this.mediaPlayerService.playingEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.playing.next(true));
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.playing.next(false));
        this.mediaPlayerService.mediaClickEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.togglePlay());
        this.mediaPlayerService.loadedMetadataEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.loaded = true);
        // initially hide all text tracks
        this.mediaPlayerService.hideSubtitleTracks();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
MediaPlayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player',
                template: "<div class=\"player-container\"\n     tabindex=\"0\"\n     aria-label=\"Media Player\"\n     i18n-aria-label\n     [cdkTrapFocus]=\"mediaPlayerService.fullscreen\">\n\n    <div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n        <video class=\"video-player\"\n            #player\n            tabindex=\"-1\"\n            [src]=\"source\"\n            [crossOrigin]=\"crossorigin\"\n            (abort)=\"mediaPlayerService.abortEvent.next()\"\n            (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n            (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n            (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n            (ended)=\"mediaPlayerService.endedEvent.next()\"\n            (error)=\"mediaPlayerService.errorEvent.next($event)\"\n            (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n            (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n            (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n            (pause)=\"mediaPlayerService.pauseEvent.next()\"\n            (play)=\"mediaPlayerService.playEvent.next()\"\n            (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n            (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n            (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n            (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n            (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n            (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n            (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n            (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n            (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n            (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n\n            <ng-content select=\"track\"></ng-content>\n        </video>\n\n        <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n            <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n                <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n                <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n            </svg>\n        </div>\n\n    </div>\n\n    <div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n        <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n            <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                <g transform=\"translate(-98.000000, -458.000000)\">\n                    <g transform=\"translate(98.000000, 458.000000)\">\n                        <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                        <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                        <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                        <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                            stroke=\"#60798D\"></path>\n                        <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                        <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                    </g>\n                </g>\n            </g>\n        </svg>\n\n        <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n        <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n        <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n        <audio #player\n            [src]=\"source\"\n            (abort)=\"mediaPlayerService.abortEvent.next()\"\n            (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n            (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n            (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n            (ended)=\"mediaPlayerService.endedEvent.next()\"\n            (error)=\"mediaPlayerService.errorEvent.next($event)\"\n            (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n            (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n            (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n            (pause)=\"mediaPlayerService.pauseEvent.next()\"\n            (play)=\"mediaPlayerService.playEvent.next()\"\n            (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n            (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n            (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n            (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n            (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n            (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n            (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n            (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n            (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n            (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n        </audio>\n    </div>\n\n    <div class=\"control-bar\"\n        (uxFocusWithin)=\"focused = true\"\n        (uxBlurWithin)=\"focused = false\">\n\n        <ux-media-player-timeline></ux-media-player-timeline>\n        <ux-media-player-controls>\n            <ng-content select=\"[uxMediaPlayerCustomControl]\"></ng-content>\n        </ux-media-player-controls>\n    </div>\n</div>",
                providers: [MediaPlayerService],
                host: {
                    '(keydown.Space)': 'mediaPlayerService.togglePlay(); $event.preventDefault()',
                    '[class.standard]': '!mediaPlayerService.fullscreen',
                    '[class.fullscreen]': 'mediaPlayerService.fullscreen',
                    '[class.quiet]': 'quietMode && type === "video" || mediaPlayerService.fullscreen',
                    '[class.hover]': 'hovering || focused',
                    '[class.video]': 'type === "video"',
                    '[class.audio]': 'type === "audio"',
                    '(mouseenter)': 'hovering = true',
                    '(mouseleave)': 'hovering = false',
                    '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange()',
                    '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange()',
                    '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange()'
                }
            }] }
];
/** @nocollapse */
MediaPlayerComponent.ctorParameters = () => [
    { type: MediaPlayerService },
    { type: AudioService },
    { type: ElementRef }
];
MediaPlayerComponent.propDecorators = {
    _playerRef: [{ type: ViewChild, args: ['player',] }],
    crossorigin: [{ type: Input }],
    source: [{ type: Input }],
    type: [{ type: Input }],
    quietMode: [{ type: Input }]
};
function MediaPlayerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MediaPlayerComponent.prototype._playerRef;
    /** @type {?} */
    MediaPlayerComponent.prototype.hovering;
    /** @type {?} */
    MediaPlayerComponent.prototype.focused;
    /** @type {?} */
    MediaPlayerComponent.prototype.audioMetadata;
    /** @type {?} */
    MediaPlayerComponent.prototype.crossorigin;
    /** @type {?} */
    MediaPlayerComponent.prototype._onDestroy;
    /** @type {?} */
    MediaPlayerComponent.prototype.mediaPlayerService;
    /** @type {?} */
    MediaPlayerComponent.prototype._audioService;
    /** @type {?} */
    MediaPlayerComponent.prototype._elementRef;
}
/**
 * @record
 */
export function MediaPlayerBuffer() { }
function MediaPlayerBuffer_tsickle_Closure_declarations() {
    /** @type {?} */
    MediaPlayerBuffer.prototype.start;
    /** @type {?} */
    MediaPlayerBuffer.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQWlCLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBcUI1RCxNQUFNOzs7Ozs7SUF1Q0YsWUFBbUIsa0JBQXNDLEVBQVUsYUFBMkIsRUFBVSxXQUF1QjtRQUE1Ryx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt3QkFuQzNHLEtBQUs7dUJBQ04sS0FBSzsyQkFHZ0MsaUJBQWlCOzBCQTZCcEQsSUFBSSxPQUFPLEVBQVE7O1FBS3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3ZELEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQ2xCLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQzdCLENBQUMsU0FBUyxD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a0JBQWtCO29CQUNuQyxlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxjQUFjLEVBQUUsaUJBQWlCO29CQUNqQyxjQUFjLEVBQUUsa0JBQWtCO29CQUNsQyxtQ0FBbUMsRUFBRSx1Q0FBdUM7b0JBQzVFLGdDQUFnQyxFQUFFLHVDQUF1QztvQkFDekUsK0JBQStCLEVBQUUsdUNBQXVDO2lCQUMzRTthQUNKOzs7O1lBcEJRLGtCQUFrQjtZQURILFlBQVk7WUFMRCxVQUFVOzs7eUJBNkJ4QyxTQUFTLFNBQUMsUUFBUTswQkFNbEIsS0FBSztxQkFNTCxLQUFLO21CQVNMLEtBQUs7d0JBU0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQXVkaW9NZXRhZGF0YSwgQXVkaW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXVkaW8vaW5kZXgnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9tZWRpYS1wbGF5ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWVkaWEtcGxheWVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWVkaWEtcGxheWVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtNZWRpYVBsYXllclNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhrZXlkb3duLlNwYWNlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UudG9nZ2xlUGxheSgpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKScsXG4gICAgICAgICdbY2xhc3Muc3RhbmRhcmRdJzogJyFtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbicsXG4gICAgICAgICdbY2xhc3MuZnVsbHNjcmVlbl0nOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW4nLFxuICAgICAgICAnW2NsYXNzLnF1aWV0XSc6ICdxdWlldE1vZGUgJiYgdHlwZSA9PT0gXCJ2aWRlb1wiIHx8IG1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuJyxcbiAgICAgICAgJ1tjbGFzcy5ob3Zlcl0nOiAnaG92ZXJpbmcgfHwgZm9jdXNlZCcsXG4gICAgICAgICdbY2xhc3MudmlkZW9dJzogJ3R5cGUgPT09IFwidmlkZW9cIicsXG4gICAgICAgICdbY2xhc3MuYXVkaW9dJzogJ3R5cGUgPT09IFwiYXVkaW9cIicsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaG92ZXJpbmcgPSB0cnVlJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdob3ZlcmluZyA9IGZhbHNlJyxcbiAgICAgICAgJyhkb2N1bWVudDp3ZWJraXRmdWxsc2NyZWVuY2hhbmdlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkNoYW5nZSgpJyxcbiAgICAgICAgJyhkb2N1bWVudDptb3pmdWxsc2NyZWVuY2hhbmdlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkNoYW5nZSgpJyxcbiAgICAgICAgJyhkb2N1bWVudDpNU0Z1bGxzY3JlZW5DaGFuZ2UpJzogJ21lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuQ2hhbmdlKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkKCdwbGF5ZXInKSBwcml2YXRlIF9wbGF5ZXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBob3ZlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhdWRpb01ldGFkYXRhOiBPYnNlcnZhYmxlPEF1ZGlvTWV0YWRhdGE+O1xuXG4gICAgQElucHV0KCkgY3Jvc3NvcmlnaW46ICd1c2UtY3JlZGVudGlhbHMnIHwgJ2Fub255bW91cycgPSAndXNlLWNyZWRlbnRpYWxzJztcblxuICAgIGdldCBzb3VyY2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnNvdXJjZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzb3VyY2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5zb3VyY2UgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdHlwZSgpOiBNZWRpYVBsYXllclR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UudHlwZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB0eXBlKHZhbHVlOiBNZWRpYVBsYXllclR5cGUpIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UudHlwZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBxdWlldE1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5xdWlldE1vZGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcXVpZXRNb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnF1aWV0TW9kZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVkaWFQbGF5ZXJTZXJ2aWNlOiBNZWRpYVBsYXllclNlcnZpY2UsIHByaXZhdGUgX2F1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgICAgLy8gc2hvdyBjb250cm9scyB3aGVuIGhvdmVyaW5nIGFuZCBpbiBxdWlldCBtb2RlXG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtb3VzZW1vdmUnKS5waXBlKFxuICAgICAgICAgICAgdGFwKCgpID0+IHRoaXMuaG92ZXJpbmcgPSB0cnVlKSxcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgyMDAwKSxcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuaG92ZXJpbmcgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5zZXRNZWRpYVBsYXllcih0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3BsYXllclJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgICB0aGlzLmF1ZGlvTWV0YWRhdGEgPSB0aGlzLl9hdWRpb1NlcnZpY2UuZ2V0QXVkaW9GaWxlTWV0YWRhdGEodGhpcy5fcGxheWVyUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5aW5nRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlpbmcubmV4dCh0cnVlKSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlpbmcubmV4dChmYWxzZSkpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5tZWRpYUNsaWNrRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRvZ2dsZVBsYXkoKSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmxvYWRlZE1ldGFkYXRhRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmxvYWRlZCA9IHRydWUpO1xuXG4gICAgICAgIC8vIGluaXRpYWxseSBoaWRlIGFsbCB0ZXh0IHRyYWNrc1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5oaWRlU3VidGl0bGVUcmFja3MoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZWRpYVBsYXllclR5cGUgPSAndmlkZW8nIHwgJ2F1ZGlvJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVBsYXllckJ1ZmZlciB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbn0iXX0=