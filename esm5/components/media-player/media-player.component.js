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
var MediaPlayerComponent = /** @class */ (function () {
    function MediaPlayerComponent(mediaPlayerService, _audioService, _elementRef) {
        var _this = this;
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        this.focused = false;
        this.crossorigin = 'use-credentials';
        this._onDestroy = new Subject();
        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(tap(function () { return _this.hovering = true; }), debounceTime(2000), takeUntil(this._onDestroy)).subscribe(function () { return _this.hovering = false; });
    }
    Object.defineProperty(MediaPlayerComponent.prototype, "source", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaPlayerService.source;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.mediaPlayerService.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaPlayerService.type;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.mediaPlayerService.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerComponent.prototype, "quietMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mediaPlayerService.quietMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.mediaPlayerService.quietMode = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MediaPlayerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this.mediaPlayerService.playingEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.playing.next(true); });
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.playing.next(false); });
        this.mediaPlayerService.mediaClickEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.togglePlay(); });
        this.mediaPlayerService.loadedMetadataEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.mediaPlayerService.loaded = true; });
        // initially hide all text tracks
        this.mediaPlayerService.hideSubtitleTracks();
    };
    /**
     * @return {?}
     */
    MediaPlayerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    MediaPlayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player',
                    template: "<div class=\"player-container\"\n     tabindex=\"0\"\n     aria-label=\"Media Player\"\n     i18n-aria-label\n     [cdkTrapFocus]=\"mediaPlayerService.fullscreen\">\n\n    <div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n        <video class=\"video-player\"\n            #player\n            tabindex=\"-1\"\n            [src]=\"source\"\n            [crossOrigin]=\"crossorigin\"\n            (abort)=\"mediaPlayerService.abortEvent.next()\"\n            (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n            (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n            (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n            (ended)=\"mediaPlayerService.endedEvent.next()\"\n            (error)=\"mediaPlayerService.errorEvent.next($event)\"\n            (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n            (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n            (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n            (pause)=\"mediaPlayerService.pauseEvent.next()\"\n            (play)=\"mediaPlayerService.playEvent.next()\"\n            (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n            (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n            (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n            (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n            (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n            (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n            (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n            (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n            (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n            (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n\n            <ng-content select=\"track\"></ng-content>\n        </video>\n\n        <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n            <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n                <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n                <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n            </svg>\n        </div>\n\n    </div>\n\n    <div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n        <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n            <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                <g transform=\"translate(-98.000000, -458.000000)\">\n                    <g transform=\"translate(98.000000, 458.000000)\">\n                        <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                        <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                        <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                        <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                            stroke=\"#60798D\"></path>\n                        <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                        <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                    </g>\n                </g>\n            </g>\n        </svg>\n\n        <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n        <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n        <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n        <audio #player\n            [src]=\"source\"\n            (abort)=\"mediaPlayerService.abortEvent.next()\"\n            (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n            (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n            (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n            (ended)=\"mediaPlayerService.endedEvent.next()\"\n            (error)=\"mediaPlayerService.errorEvent.next($event)\"\n            (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n            (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n            (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n            (pause)=\"mediaPlayerService.pauseEvent.next()\"\n            (play)=\"mediaPlayerService.playEvent.next()\"\n            (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n            (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n            (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n            (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n            (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n            (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n            (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n            (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n            (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n            (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n        </audio>\n    </div>\n\n    <div class=\"control-bar\"\n        (focusWithin)=\"focused = true\"\n        (blurWithin)=\"focused = false\">\n\n        <ux-media-player-timeline></ux-media-player-timeline>\n        <ux-media-player-controls>\n            <ng-content select=\"[uxMediaPlayerCustomControl]\"></ng-content>\n        </ux-media-player-controls>\n    </div>\n</div>",
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
    MediaPlayerComponent.ctorParameters = function () { return [
        { type: MediaPlayerService },
        { type: AudioService },
        { type: ElementRef }
    ]; };
    MediaPlayerComponent.propDecorators = {
        _playerRef: [{ type: ViewChild, args: ['player',] }],
        crossorigin: [{ type: Input }],
        source: [{ type: Input }],
        type: [{ type: Input }],
        quietMode: [{ type: Input }]
    };
    return MediaPlayerComponent;
}());
export { MediaPlayerComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQWlCLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztJQTREeEQsOEJBQW1CLGtCQUFzQyxFQUFVLGFBQTJCLEVBQVUsV0FBdUI7UUFBL0gsaUJBUUM7UUFSa0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7d0JBbkMzRyxLQUFLO3VCQUNOLEtBQUs7MkJBR2dDLGlCQUFpQjswQkE2QnBELElBQUksT0FBTyxFQUFROztRQUtwQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUN2RCxHQUFHLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFwQixDQUFvQixDQUFDLEVBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFDbEIsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDN0IsQ0FBQyxT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b0IsRUFBRSwrQkFBK0I7d0JBQ3JELGVBQWUsRUFBRSxnRUFBZ0U7d0JBQ2pGLGVBQWUsRUFBRSxxQkFBcUI7d0JBQ3RDLGVBQWUsRUFBRSxrQkFBa0I7d0JBQ25DLGVBQWUsRUFBRSxrQkFBa0I7d0JBQ25DLGNBQWMsRUFBRSxpQkFBaUI7d0JBQ2pDLGNBQWMsRUFBRSxrQkFBa0I7d0JBQ2xDLG1DQUFtQyxFQUFFLHVDQUF1Qzt3QkFDNUUsZ0NBQWdDLEVBQUUsdUNBQXVDO3dCQUN6RSwrQkFBK0IsRUFBRSx1Q0FBdUM7cUJBQzNFO2lCQUNKOzs7O2dCQXBCUSxrQkFBa0I7Z0JBREgsWUFBWTtnQkFMRCxVQUFVOzs7NkJBNkJ4QyxTQUFTLFNBQUMsUUFBUTs4QkFNbEIsS0FBSzt5QkFNTCxLQUFLO3VCQVNMLEtBQUs7NEJBU0wsS0FBSzs7K0JBM0RWOztTQTJCYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEF1ZGlvTWV0YWRhdGEsIEF1ZGlvU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1ZGlvL2luZGV4JztcbmltcG9ydCB7IE1lZGlhUGxheWVyU2VydmljZSB9IGZyb20gJy4vbWVkaWEtcGxheWVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1lZGlhLXBsYXllcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLXBsYXllci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbTWVkaWFQbGF5ZXJTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoa2V5ZG93bi5TcGFjZSknOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLnRvZ2dsZVBsYXkoKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KCknLFxuICAgICAgICAnW2NsYXNzLnN0YW5kYXJkXSc6ICchbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW4nLFxuICAgICAgICAnW2NsYXNzLmZ1bGxzY3JlZW5dJzogJ21lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuJyxcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAncXVpZXRNb2RlICYmIHR5cGUgPT09IFwidmlkZW9cIiB8fCBtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbicsXG4gICAgICAgICdbY2xhc3MuaG92ZXJdJzogJ2hvdmVyaW5nIHx8IGZvY3VzZWQnLFxuICAgICAgICAnW2NsYXNzLnZpZGVvXSc6ICd0eXBlID09PSBcInZpZGVvXCInLFxuICAgICAgICAnW2NsYXNzLmF1ZGlvXSc6ICd0eXBlID09PSBcImF1ZGlvXCInLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyaW5nID0gdHJ1ZScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJpbmcgPSBmYWxzZScsXG4gICAgICAgICcoZG9jdW1lbnQ6d2Via2l0ZnVsbHNjcmVlbmNoYW5nZSknOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5DaGFuZ2UoKScsXG4gICAgICAgICcoZG9jdW1lbnQ6bW96ZnVsbHNjcmVlbmNoYW5nZSknOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5DaGFuZ2UoKScsXG4gICAgICAgICcoZG9jdW1lbnQ6TVNGdWxsc2NyZWVuQ2hhbmdlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkNoYW5nZSgpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgncGxheWVyJykgcHJpdmF0ZSBfcGxheWVyUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgaG92ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgYXVkaW9NZXRhZGF0YTogT2JzZXJ2YWJsZTxBdWRpb01ldGFkYXRhPjtcblxuICAgIEBJbnB1dCgpIGNyb3Nzb3JpZ2luOiAndXNlLWNyZWRlbnRpYWxzJyB8ICdhbm9ueW1vdXMnID0gJ3VzZS1jcmVkZW50aWFscyc7XG5cbiAgICBnZXQgc291cmNlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5zb3VyY2U7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc291cmNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uuc291cmNlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHR5cGUoKTogTWVkaWFQbGF5ZXJUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnR5cGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdHlwZSh2YWx1ZTogTWVkaWFQbGF5ZXJUeXBlKSB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnR5cGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcXVpZXRNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHF1aWV0TW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5xdWlldE1vZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG1lZGlhUGxheWVyU2VydmljZTogTWVkaWFQbGF5ZXJTZXJ2aWNlLCBwcml2YXRlIF9hdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgICAgIC8vIHNob3cgY29udHJvbHMgd2hlbiBob3ZlcmluZyBhbmQgaW4gcXVpZXQgbW9kZVxuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vtb3ZlJykucGlwZShcbiAgICAgICAgICAgIHRhcCgoKSA9PiB0aGlzLmhvdmVyaW5nID0gdHJ1ZSksXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwMCksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhvdmVyaW5nID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uuc2V0TWVkaWFQbGF5ZXIodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9wbGF5ZXJSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5hdWRpb01ldGFkYXRhID0gdGhpcy5fYXVkaW9TZXJ2aWNlLmdldEF1ZGlvRmlsZU1ldGFkYXRhKHRoaXMuX3BsYXllclJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheWluZ0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5aW5nLm5leHQodHJ1ZSkpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5aW5nLm5leHQoZmFsc2UpKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UubWVkaWFDbGlja0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50b2dnbGVQbGF5KCkpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5sb2FkZWRNZXRhZGF0YUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5sb2FkZWQgPSB0cnVlKTtcblxuICAgICAgICAvLyBpbml0aWFsbHkgaGlkZSBhbGwgdGV4dCB0cmFja3NcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuaGlkZVN1YnRpdGxlVHJhY2tzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFQbGF5ZXJUeXBlID0gJ3ZpZGVvJyB8ICdhdWRpbyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFQbGF5ZXJCdWZmZXIge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG59Il19