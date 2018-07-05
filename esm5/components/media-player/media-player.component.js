/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { AudioService } from '../../services/audio/index';
import { MediaPlayerService } from './media-player.service';
var MediaPlayerComponent = (function () {
    function MediaPlayerComponent(mediaPlayerService, _audioService, _elementRef) {
        var _this = this;
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        this._onDestroy = new Subject();
        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(switchMap(function (event) {
            _this.hovering = true;
            return of(event);
        }), debounceTime(2000), takeUntil(this._onDestroy)).subscribe(function () { return _this.hovering = false; });
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
                    template: "<div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n    <video class=\"video-player\"\n        #player\n        [src]=\"source\"\n        (abort)=\"mediaPlayerService.abortEvent.next()\"\n        (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n        (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n        (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n        (ended)=\"mediaPlayerService.endedEvent.next()\"\n        (error)=\"mediaPlayerService.errorEvent.next($event)\"\n        (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n        (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n        (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n        (pause)=\"mediaPlayerService.pauseEvent.next()\"\n        (play)=\"mediaPlayerService.playEvent.next()\"\n        (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n        (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n        (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n        (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n        (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n        (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n        (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n        (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n        (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n        (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n    </video>\n\n    <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n        <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n            <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n            <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n        </svg>\n    </div>\n\n</div>\n\n\n<div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n    <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n        <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n            <g transform=\"translate(-98.000000, -458.000000)\">\n                <g transform=\"translate(98.000000, 458.000000)\">\n                    <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                    <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                    <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                    <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                        stroke=\"#60798D\"></path>\n                    <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                    <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                </g>\n            </g>\n        </g>\n    </svg>\n\n    <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n    <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n    <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n    <audio #player\n        [src]=\"source\"\n        (abort)=\"mediaPlayerService.abortEvent.next()\"\n        (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n        (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n        (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n        (ended)=\"mediaPlayerService.endedEvent.next()\"\n        (error)=\"mediaPlayerService.errorEvent.next($event)\"\n        (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n        (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n        (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n        (pause)=\"mediaPlayerService.pauseEvent.next()\"\n        (play)=\"mediaPlayerService.playEvent.next()\"\n        (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n        (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n        (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n        (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n        (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n        (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n        (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n        (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n        (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n        (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n    </audio>\n</div>\n\n<div class=\"control-bar\">\n    <ux-media-player-timeline></ux-media-player-timeline>\n    <ux-media-player-controls></ux-media-player-controls>\n</div>",
                    providers: [MediaPlayerService],
                    host: {
                        'tabindex': '0',
                        '(keydown.Space)': 'mediaPlayerService.togglePlay()',
                        '[class.standard]': '!mediaPlayerService.fullscreen',
                        '[class.fullscreen]': 'mediaPlayerService.fullscreen',
                        '[class.quiet]': 'quietMode && type === "video" || mediaPlayerService.fullscreen',
                        '[class.hover]': 'hovering',
                        '[class.video]': 'type === "video"',
                        '[class.audio]': 'type === "audio"',
                        '(mouseenter)': 'hovering = true',
                        '(mouseleave)': 'hovering = false',
                        '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
                        '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange($event)',
                        '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    MediaPlayerComponent.ctorParameters = function () { return [
        { type: MediaPlayerService, },
        { type: AudioService, },
        { type: ElementRef, },
    ]; };
    MediaPlayerComponent.propDecorators = {
        "_playerRef": [{ type: ViewChild, args: ['player',] },],
        "source": [{ type: Input },],
        "type": [{ type: Input },],
        "quietMode": [{ type: Input },],
    };
    return MediaPlayerComponent;
}());
export { MediaPlayerComponent };
function MediaPlayerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MediaPlayerComponent.propDecorators;
    /** @type {?} */
    MediaPlayerComponent.prototype._playerRef;
    /** @type {?} */
    MediaPlayerComponent.prototype.hovering;
    /** @type {?} */
    MediaPlayerComponent.prototype.audioMetadata;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFpQixZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFtSnhELDhCQUFtQixrQkFBc0MsRUFBVSxhQUEyQixFQUFVLFdBQXVCO1FBQS9ILGlCQVdDO1FBWGtCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQWhDM0csS0FBSzswQkE4QkosSUFBSSxPQUFPLEVBQVE7O1FBS3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQ3ZELFNBQVMsQ0FBQyxVQUFDLEtBQWlCO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEIsQ0FBQyxFQUNGLFlBQVks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RUFBRSxnQ0FBZ0M7d0JBQ3BELG9CQUFvQixFQUFFLCtCQUErQjt3QkFDckQsZUFBZSxFQUFFLGdFQUFnRTt3QkFDakYsZUFBZSxFQUFFLFVBQVU7d0JBQzNCLGVBQWUsRUFBRSxrQkFBa0I7d0JBQ25DLGVBQWUsRUFBRSxrQkFBa0I7d0JBQ25DLGNBQWMsRUFBRSxpQkFBaUI7d0JBQ2pDLGNBQWMsRUFBRSxrQkFBa0I7d0JBQ2xDLG1DQUFtQyxFQUFFLDZDQUE2Qzt3QkFDbEYsZ0NBQWdDLEVBQUUsNkNBQTZDO3dCQUMvRSwrQkFBK0IsRUFBRSw2Q0FBNkM7cUJBQ2pGO2lCQUNKOzs7O2dCQTlHUSxrQkFBa0I7Z0JBREgsWUFBWTtnQkFORCxVQUFVOzs7K0JBd0h4QyxTQUFTLFNBQUMsUUFBUTsyQkFTbEIsS0FBSzt5QkFTTCxLQUFLOzhCQVNMLEtBQUs7OytCQW5KVjs7U0FzSGEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBBdWRpb01ldGFkYXRhLCBBdWRpb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdWRpby9pbmRleCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllclNlcnZpY2UgfSBmcm9tICcuL21lZGlhLXBsYXllci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tZWRpYS1wbGF5ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZpZGVvLXBsYXllci1jb250YWluZXJcIiAqbmdJZj1cInR5cGUgPT09ICd2aWRlbydcIj5cblxuICAgIDx2aWRlbyBjbGFzcz1cInZpZGVvLXBsYXllclwiXG4gICAgICAgICNwbGF5ZXJcbiAgICAgICAgW3NyY109XCJzb3VyY2VcIlxuICAgICAgICAoYWJvcnQpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmFib3J0RXZlbnQubmV4dCgpXCJcbiAgICAgICAgKGNhbnBsYXkpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmNhblBsYXlFdmVudC5uZXh0KHRydWUpXCJcbiAgICAgICAgKGNhbnBsYXl0aHJvdWdoKT1cIm1lZGlhUGxheWVyU2VydmljZS5jYW5QbGF5VGhyb3VnaEV2ZW50Lm5leHQodHJ1ZSlcIlxuICAgICAgICAoZHVyYXRpb25jaGFuZ2UpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uQ2hhbmdlRXZlbnQubmV4dChwbGF5ZXIuZHVyYXRpb24pXCJcbiAgICAgICAgKGVuZGVkKT1cIm1lZGlhUGxheWVyU2VydmljZS5lbmRlZEV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChlcnJvcik9XCJtZWRpYVBsYXllclNlcnZpY2UuZXJyb3JFdmVudC5uZXh0KCRldmVudClcIlxuICAgICAgICAobG9hZGVkZGF0YSk9XCJtZWRpYVBsYXllclNlcnZpY2UubG9hZGVkRGF0YUV2ZW50Lm5leHQoJGV2ZW50KVwiXG4gICAgICAgIChsb2FkZWRtZXRhZGF0YSk9XCJtZWRpYVBsYXllclNlcnZpY2UubG9hZGVkTWV0YWRhdGFFdmVudC5uZXh0KCRldmVudClcIlxuICAgICAgICAobG9hZHN0YXJ0KT1cIm1lZGlhUGxheWVyU2VydmljZS5sb2FkU3RhcnRFdmVudC5uZXh0KClcIlxuICAgICAgICAocGF1c2UpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlRXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHBsYXkpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlFdmVudC5uZXh0KClcIlxuICAgICAgICAocGxheWluZyk9XCJtZWRpYVBsYXllclNlcnZpY2UucGxheWluZ0V2ZW50Lm5leHQoIXBsYXllci5wYXVzZWQpXCJcbiAgICAgICAgKHJhdGVjaGFuZ2UpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnJhdGVDaGFuZ2VFdmVudC5uZXh0KHBsYXllci5wbGF5YmFja1JhdGUpXCJcbiAgICAgICAgKHNlZWtlZCk9XCJtZWRpYVBsYXllclNlcnZpY2Uuc2Vla2VkRXZlbnQubmV4dChwbGF5ZXIuY3VycmVudFRpbWUpXCJcbiAgICAgICAgKHNlZWtpbmcpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnNlZWtpbmdFdmVudC5uZXh0KHBsYXllci5jdXJyZW50VGltZSlcIlxuICAgICAgICAoc3RhbGxlZCk9XCJtZWRpYVBsYXllclNlcnZpY2Uuc3RhbGxlZEV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChzdXNwZW5kKT1cIm1lZGlhUGxheWVyU2VydmljZS5zdXNwZW5kRXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHRpbWV1cGRhdGUpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnRpbWVVcGRhdGVFdmVudC5uZXh0KHBsYXllci5jdXJyZW50VGltZSlcIlxuICAgICAgICAodm9sdW1lY2hhbmdlKT1cIm1lZGlhUGxheWVyU2VydmljZS52b2x1bWVDaGFuZ2VFdmVudC5uZXh0KHBsYXllci52b2x1bWUpXCJcbiAgICAgICAgKHdhaXRpbmcpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLndhaXRpbmdFdmVudC5uZXh0KClcIlxuICAgICAgICAoY2xpY2spPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLm1lZGlhQ2xpY2tFdmVudC5uZXh0KCRldmVudClcIj5cbiAgICA8L3ZpZGVvPlxuXG4gICAgPGRpdiBjbGFzcz1cInZpZGVvLW92ZXJsYXlcIiBbY2xhc3MucGxheWluZ109XCJtZWRpYVBsYXllclNlcnZpY2UucGxheWluZyB8IGFzeW5jXCI+XG4gICAgICAgIDxzdmcgY2xhc3M9XCJwbGF5LWdyYXBoaWNcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgNjQgNjRcIj5cbiAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJwbGF5LWNpcmNsZVwiIGN4PVwiMzIuMlwiIGN5PVwiMzEuOFwiIHI9XCIzMS44XCIgLz5cbiAgICAgICAgICAgIDxwb2x5Z29uIGNsYXNzPVwicGxheS10cmlhbmdsZVwiIHBvaW50cz1cIjIzLDE0LjEgMjMsNTAuOCA0OC4zLDMyLjVcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5cblxuPGRpdiBjbGFzcz1cImF1ZGlvLXBsYXllclwiICpuZ0lmPVwidHlwZSA9PT0gJ2F1ZGlvJ1wiPlxuXG4gICAgPHN2ZyB3aWR0aD1cIjI0cHhcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICAgICAgICA8ZyBzdHJva2U9XCJub25lXCIgc3Ryb2tlLXdpZHRoPVwiMVwiIGZpbGw9XCJub25lXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiPlxuICAgICAgICAgICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC05OC4wMDAwMDAsIC00NTguMDAwMDAwKVwiPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSg5OC4wMDAwMDAsIDQ1OC4wMDAwMDApXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNC41LDAuNSBMMTguMDQzNTMwOCwwLjUgTDIzLjUsNi4yMjI1MTUwMiBMMjMuNSwyMy41IEw0LjUsMjMuNSBMNC41LDAuNSBaXCIgZmlsbD1cIiNDQ0VBRTJcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNC41LDggTDQuNSwwLjUgTDE4LDAuNSBMMjMuNSw2IEwyMy41LDIzLjUgTDE4LDIzLjVcIiBzdHJva2U9XCIjNjA3OThEXCIgZmlsbD1cIiNDQ0VBRTJcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNCwxMy41IEwwLjUsMTMuNSBMMC41LDE4LjUgTDQsMTguNSBMOS41LDIyLjUgTDkuNSw5LjUgTDQsMTMuNSBaXCIgc3Ryb2tlPVwiIzYwNzk4RFwiIGZpbGw9XCIjODVEMkJFXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExLjUsMTIuNTEzNzkzOSBDMTMuNzU3NjIyNSwxMi41MTM3OTM5IDE0LjUsMTQuMzcwOTIzNiAxNC41LDE2IEMxNC41LDE3LjY4NDkyMzYgMTMuNzA4OTE1MiwxOS41NDIwNTMyIDExLjUsMTkuNTQyMDUzMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCIjNjA3OThEXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTExLjUsOSBDMTUuODAzNzY0Myw5LjA0MTY4NzAxIDE4LjUsMTEuNjYwNDgwNSAxOC41LDE2IEMxOC41LDIwLjMzOTUxOTUgMTUuODgwNDMwMiwyMy4wMDc5OTU2IDExLjUsMjNcIiBzdHJva2U9XCIjNjA3OThEXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE3LjUyMTkxMTYsMC43NjE0MTM1NzQgTDE3LjUyMTkxMTYsNiBMMjMsNlwiIHN0cm9rZT1cIiM2MDc5OERcIiBmaWxsPVwiIzg1RDJCRVwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICA8L3N2Zz5cblxuICAgIDxwIGNsYXNzPVwiYXVkaW8tZmlsZS1uYW1lXCI+e3sgKGF1ZGlvTWV0YWRhdGEgfCBhc3luYyk/LmZpbGVuYW1lIH19PC9wPlxuICAgIDxwIGNsYXNzPVwiYXVkaW8tZmlsZS1mb3JtYXRcIj57eyAoYXVkaW9NZXRhZGF0YSB8IGFzeW5jKT8uZGVzY3JpcHRpb24gfX08L3A+XG4gICAgPHAgY2xhc3M9XCJhdWRpby1maWxlLXNpemVcIj57eyAoYXVkaW9NZXRhZGF0YSB8IGFzeW5jKT8uc2l6ZSB8IGZpbGVTaXplIH19PC9wPlxuXG4gICAgPGF1ZGlvICNwbGF5ZXJcbiAgICAgICAgW3NyY109XCJzb3VyY2VcIlxuICAgICAgICAoYWJvcnQpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmFib3J0RXZlbnQubmV4dCgpXCJcbiAgICAgICAgKGNhbnBsYXkpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmNhblBsYXlFdmVudC5uZXh0KHRydWUpXCJcbiAgICAgICAgKGNhbnBsYXl0aHJvdWdoKT1cIm1lZGlhUGxheWVyU2VydmljZS5jYW5QbGF5VGhyb3VnaEV2ZW50Lm5leHQodHJ1ZSlcIlxuICAgICAgICAoZHVyYXRpb25jaGFuZ2UpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uQ2hhbmdlRXZlbnQubmV4dChwbGF5ZXIuZHVyYXRpb24pXCJcbiAgICAgICAgKGVuZGVkKT1cIm1lZGlhUGxheWVyU2VydmljZS5lbmRlZEV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChlcnJvcik9XCJtZWRpYVBsYXllclNlcnZpY2UuZXJyb3JFdmVudC5uZXh0KCRldmVudClcIlxuICAgICAgICAobG9hZGVkZGF0YSk9XCJtZWRpYVBsYXllclNlcnZpY2UubG9hZGVkRGF0YUV2ZW50Lm5leHQoJGV2ZW50KVwiXG4gICAgICAgIChsb2FkZWRtZXRhZGF0YSk9XCJtZWRpYVBsYXllclNlcnZpY2UubG9hZGVkTWV0YWRhdGFFdmVudC5uZXh0KCRldmVudClcIlxuICAgICAgICAobG9hZHN0YXJ0KT1cIm1lZGlhUGxheWVyU2VydmljZS5sb2FkU3RhcnRFdmVudC5uZXh0KClcIlxuICAgICAgICAocGF1c2UpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlRXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHBsYXkpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlFdmVudC5uZXh0KClcIlxuICAgICAgICAocGxheWluZyk9XCJtZWRpYVBsYXllclNlcnZpY2UucGxheWluZ0V2ZW50Lm5leHQoIXBsYXllci5wYXVzZWQpXCJcbiAgICAgICAgKHJhdGVjaGFuZ2UpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnJhdGVDaGFuZ2VFdmVudC5uZXh0KHBsYXllci5wbGF5YmFja1JhdGUpXCJcbiAgICAgICAgKHNlZWtlZCk9XCJtZWRpYVBsYXllclNlcnZpY2Uuc2Vla2VkRXZlbnQubmV4dChwbGF5ZXIuY3VycmVudFRpbWUpXCJcbiAgICAgICAgKHNlZWtpbmcpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnNlZWtpbmdFdmVudC5uZXh0KHBsYXllci5jdXJyZW50VGltZSlcIlxuICAgICAgICAoc3RhbGxlZCk9XCJtZWRpYVBsYXllclNlcnZpY2Uuc3RhbGxlZEV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChzdXNwZW5kKT1cIm1lZGlhUGxheWVyU2VydmljZS5zdXNwZW5kRXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHRpbWV1cGRhdGUpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnRpbWVVcGRhdGVFdmVudC5uZXh0KHBsYXllci5jdXJyZW50VGltZSlcIlxuICAgICAgICAodm9sdW1lY2hhbmdlKT1cIm1lZGlhUGxheWVyU2VydmljZS52b2x1bWVDaGFuZ2VFdmVudC5uZXh0KHBsYXllci52b2x1bWUpXCJcbiAgICAgICAgKHdhaXRpbmcpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLndhaXRpbmdFdmVudC5uZXh0KClcIlxuICAgICAgICAoY2xpY2spPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLm1lZGlhQ2xpY2tFdmVudC5uZXh0KCRldmVudClcIj5cbiAgICA8L2F1ZGlvPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJjb250cm9sLWJhclwiPlxuICAgIDx1eC1tZWRpYS1wbGF5ZXItdGltZWxpbmU+PC91eC1tZWRpYS1wbGF5ZXItdGltZWxpbmU+XG4gICAgPHV4LW1lZGlhLXBsYXllci1jb250cm9scz48L3V4LW1lZGlhLXBsYXllci1jb250cm9scz5cbjwvZGl2PmAsXG4gICAgcHJvdmlkZXJzOiBbTWVkaWFQbGF5ZXJTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAgICAgJyhrZXlkb3duLlNwYWNlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UudG9nZ2xlUGxheSgpJyxcbiAgICAgICAgJ1tjbGFzcy5zdGFuZGFyZF0nOiAnIW1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuJyxcbiAgICAgICAgJ1tjbGFzcy5mdWxsc2NyZWVuXSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbicsXG4gICAgICAgICdbY2xhc3MucXVpZXRdJzogJ3F1aWV0TW9kZSAmJiB0eXBlID09PSBcInZpZGVvXCIgfHwgbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW4nLFxuICAgICAgICAnW2NsYXNzLmhvdmVyXSc6ICdob3ZlcmluZycsXG4gICAgICAgICdbY2xhc3MudmlkZW9dJzogJ3R5cGUgPT09IFwidmlkZW9cIicsXG4gICAgICAgICdbY2xhc3MuYXVkaW9dJzogJ3R5cGUgPT09IFwiYXVkaW9cIicsXG4gICAgICAgICcobW91c2VlbnRlciknOiAnaG92ZXJpbmcgPSB0cnVlJyxcbiAgICAgICAgJyhtb3VzZWxlYXZlKSc6ICdob3ZlcmluZyA9IGZhbHNlJyxcbiAgICAgICAgJyhkb2N1bWVudDp3ZWJraXRmdWxsc2NyZWVuY2hhbmdlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkNoYW5nZSgkZXZlbnQpJyxcbiAgICAgICAgJyhkb2N1bWVudDptb3pmdWxsc2NyZWVuY2hhbmdlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkNoYW5nZSgkZXZlbnQpJyxcbiAgICAgICAgJyhkb2N1bWVudDpNU0Z1bGxzY3JlZW5DaGFuZ2UpJzogJ21lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuQ2hhbmdlKCRldmVudCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkKCdwbGF5ZXInKSBwcml2YXRlIF9wbGF5ZXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBob3ZlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGF1ZGlvTWV0YWRhdGE6IE9ic2VydmFibGU8QXVkaW9NZXRhZGF0YT47XG5cbiAgICBnZXQgc291cmNlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5zb3VyY2U7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgc291cmNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uuc291cmNlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHR5cGUoKTogTWVkaWFQbGF5ZXJUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnR5cGU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgdHlwZSh2YWx1ZTogTWVkaWFQbGF5ZXJUeXBlKSB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnR5cGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgcXVpZXRNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHF1aWV0TW9kZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5xdWlldE1vZGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG1lZGlhUGxheWVyU2VydmljZTogTWVkaWFQbGF5ZXJTZXJ2aWNlLCBwcml2YXRlIF9hdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgICAgIC8vIHNob3cgY29udHJvbHMgd2hlbiBob3ZlcmluZyBhbmQgaW4gcXVpZXQgbW9kZVxuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbW91c2Vtb3ZlJykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdmVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoZXZlbnQpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwMCksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhvdmVyaW5nID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uuc2V0TWVkaWFQbGF5ZXIodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9wbGF5ZXJSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5hdWRpb01ldGFkYXRhID0gdGhpcy5fYXVkaW9TZXJ2aWNlLmdldEF1ZGlvRmlsZU1ldGFkYXRhKHRoaXMuX3BsYXllclJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheWluZ0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5aW5nLm5leHQodHJ1ZSkpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5aW5nLm5leHQoZmFsc2UpKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UubWVkaWFDbGlja0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50b2dnbGVQbGF5KCkpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5sb2FkZWRNZXRhZGF0YUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5sb2FkZWQgPSB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBNZWRpYVBsYXllclR5cGUgPSAndmlkZW8nIHwgJ2F1ZGlvJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVBsYXllckJ1ZmZlciB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbn0iXX0=