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
        this._onDestroy = new Subject();
        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(switchMap((event) => {
            this.hovering = true;
            return of(event);
        }), debounceTime(2000), takeUntil(this._onDestroy)).subscribe(() => this.hovering = false);
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
                template: `<div class="video-player-container" *ngIf="type === 'video'">

    <video class="video-player"
        #player
        [src]="source"
        (abort)="mediaPlayerService.abortEvent.next()"
        (canplay)="mediaPlayerService.canPlayEvent.next(true)"
        (canplaythrough)="mediaPlayerService.canPlayThroughEvent.next(true)"
        (durationchange)="mediaPlayerService.durationChangeEvent.next(player.duration)"
        (ended)="mediaPlayerService.endedEvent.next()"
        (error)="mediaPlayerService.errorEvent.next($event)"
        (loadeddata)="mediaPlayerService.loadedDataEvent.next($event)"
        (loadedmetadata)="mediaPlayerService.loadedMetadataEvent.next($event)"
        (loadstart)="mediaPlayerService.loadStartEvent.next()"
        (pause)="mediaPlayerService.pauseEvent.next()"
        (play)="mediaPlayerService.playEvent.next()"
        (playing)="mediaPlayerService.playingEvent.next(!player.paused)"
        (ratechange)="mediaPlayerService.rateChangeEvent.next(player.playbackRate)"
        (seeked)="mediaPlayerService.seekedEvent.next(player.currentTime)"
        (seeking)="mediaPlayerService.seekingEvent.next(player.currentTime)"
        (stalled)="mediaPlayerService.stalledEvent.next()"
        (suspend)="mediaPlayerService.suspendEvent.next()"
        (timeupdate)="mediaPlayerService.timeUpdateEvent.next(player.currentTime)"
        (volumechange)="mediaPlayerService.volumeChangeEvent.next(player.volume)"
        (waiting)="mediaPlayerService.waitingEvent.next()"
        (click)="mediaPlayerService.mediaClickEvent.next($event)">
    </video>

    <div class="video-overlay" [class.playing]="mediaPlayerService.playing | async">
        <svg class="play-graphic" x="0px" y="0px" viewBox="0 0 64 64">
            <circle class="play-circle" cx="32.2" cy="31.8" r="31.8" />
            <polygon class="play-triangle" points="23,14.1 23,50.8 48.3,32.5" />
        </svg>
    </div>

</div>


<div class="audio-player" *ngIf="type === 'audio'">

    <svg width="24px" height="24px" viewBox="0 0 24 24">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-98.000000, -458.000000)">
                <g transform="translate(98.000000, 458.000000)">
                    <path d="M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z" fill="#CCEAE2"></path>
                    <path d="M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5" stroke="#60798D" fill="#CCEAE2"></path>
                    <path d="M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z" stroke="#60798D" fill="#85D2BE"></path>
                    <path d="M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532"
                        stroke="#60798D"></path>
                    <path d="M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23" stroke="#60798D"></path>
                    <path d="M17.5219116,0.761413574 L17.5219116,6 L23,6" stroke="#60798D" fill="#85D2BE"></path>
                </g>
            </g>
        </g>
    </svg>

    <p class="audio-file-name">{{ (audioMetadata | async)?.filename }}</p>
    <p class="audio-file-format">{{ (audioMetadata | async)?.description }}</p>
    <p class="audio-file-size">{{ (audioMetadata | async)?.size | fileSize }}</p>

    <audio #player
        [src]="source"
        (abort)="mediaPlayerService.abortEvent.next()"
        (canplay)="mediaPlayerService.canPlayEvent.next(true)"
        (canplaythrough)="mediaPlayerService.canPlayThroughEvent.next(true)"
        (durationchange)="mediaPlayerService.durationChangeEvent.next(player.duration)"
        (ended)="mediaPlayerService.endedEvent.next()"
        (error)="mediaPlayerService.errorEvent.next($event)"
        (loadeddata)="mediaPlayerService.loadedDataEvent.next($event)"
        (loadedmetadata)="mediaPlayerService.loadedMetadataEvent.next($event)"
        (loadstart)="mediaPlayerService.loadStartEvent.next()"
        (pause)="mediaPlayerService.pauseEvent.next()"
        (play)="mediaPlayerService.playEvent.next()"
        (playing)="mediaPlayerService.playingEvent.next(!player.paused)"
        (ratechange)="mediaPlayerService.rateChangeEvent.next(player.playbackRate)"
        (seeked)="mediaPlayerService.seekedEvent.next(player.currentTime)"
        (seeking)="mediaPlayerService.seekingEvent.next(player.currentTime)"
        (stalled)="mediaPlayerService.stalledEvent.next()"
        (suspend)="mediaPlayerService.suspendEvent.next()"
        (timeupdate)="mediaPlayerService.timeUpdateEvent.next(player.currentTime)"
        (volumechange)="mediaPlayerService.volumeChangeEvent.next(player.volume)"
        (waiting)="mediaPlayerService.waitingEvent.next()"
        (click)="mediaPlayerService.mediaClickEvent.next($event)">
    </audio>
</div>

<div class="control-bar">
    <ux-media-player-timeline></ux-media-player-timeline>
    <ux-media-player-controls></ux-media-player-controls>
</div>`,
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
MediaPlayerComponent.ctorParameters = () => [
    { type: MediaPlayerService, },
    { type: AudioService, },
    { type: ElementRef, },
];
MediaPlayerComponent.propDecorators = {
    "_playerRef": [{ type: ViewChild, args: ['player',] },],
    "source": [{ type: Input },],
    "type": [{ type: Input },],
    "quietMode": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL21lZGlhLXBsYXllci9tZWRpYS1wbGF5ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFpQixZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQStHNUQsTUFBTTs7Ozs7O0lBb0NGLFlBQW1CLGtCQUFzQyxFQUFVLGFBQTJCLEVBQVUsV0FBdUI7UUFBNUcsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7d0JBaEMzRyxLQUFLOzBCQThCSixJQUFJLE9BQU8sRUFBUTs7UUFLcEMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDdkQsU0FBUyxDQUFDLENBQUMsS0FBaUI7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQixDQUFDLEVBQ0YsWUFB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QkFDckQsZUFBZSxFQUFFLGdFQUFnRTtvQkFDakYsZUFBZSxFQUFFLFVBQVU7b0JBQzNCLGVBQWUsRUFBRSxrQkFBa0I7b0JBQ25DLGVBQWUsRUFBRSxrQkFBa0I7b0JBQ25DLGNBQWMsRUFBRSxpQkFBaUI7b0JBQ2pDLGNBQWMsRUFBRSxrQkFBa0I7b0JBQ2xDLG1DQUFtQyxFQUFFLDZDQUE2QztvQkFDbEYsZ0NBQWdDLEVBQUUsNkNBQTZDO29CQUMvRSwrQkFBK0IsRUFBRSw2Q0FBNkM7aUJBQ2pGO2FBQ0o7Ozs7WUE5R1Esa0JBQWtCO1lBREgsWUFBWTtZQU5ELFVBQVU7OzsyQkF3SHhDLFNBQVMsU0FBQyxRQUFRO3VCQVNsQixLQUFLO3FCQVNMLEtBQUs7MEJBU0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQXVkaW9NZXRhZGF0YSwgQXVkaW9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXVkaW8vaW5kZXgnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJTZXJ2aWNlIH0gZnJvbSAnLi9tZWRpYS1wbGF5ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWVkaWEtcGxheWVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2aWRlby1wbGF5ZXItY29udGFpbmVyXCIgKm5nSWY9XCJ0eXBlID09PSAndmlkZW8nXCI+XG5cbiAgICA8dmlkZW8gY2xhc3M9XCJ2aWRlby1wbGF5ZXJcIlxuICAgICAgICAjcGxheWVyXG4gICAgICAgIFtzcmNdPVwic291cmNlXCJcbiAgICAgICAgKGFib3J0KT1cIm1lZGlhUGxheWVyU2VydmljZS5hYm9ydEV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChjYW5wbGF5KT1cIm1lZGlhUGxheWVyU2VydmljZS5jYW5QbGF5RXZlbnQubmV4dCh0cnVlKVwiXG4gICAgICAgIChjYW5wbGF5dGhyb3VnaCk9XCJtZWRpYVBsYXllclNlcnZpY2UuY2FuUGxheVRocm91Z2hFdmVudC5uZXh0KHRydWUpXCJcbiAgICAgICAgKGR1cmF0aW9uY2hhbmdlKT1cIm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbkNoYW5nZUV2ZW50Lm5leHQocGxheWVyLmR1cmF0aW9uKVwiXG4gICAgICAgIChlbmRlZCk9XCJtZWRpYVBsYXllclNlcnZpY2UuZW5kZWRFdmVudC5uZXh0KClcIlxuICAgICAgICAoZXJyb3IpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmVycm9yRXZlbnQubmV4dCgkZXZlbnQpXCJcbiAgICAgICAgKGxvYWRlZGRhdGEpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmxvYWRlZERhdGFFdmVudC5uZXh0KCRldmVudClcIlxuICAgICAgICAobG9hZGVkbWV0YWRhdGEpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmxvYWRlZE1ldGFkYXRhRXZlbnQubmV4dCgkZXZlbnQpXCJcbiAgICAgICAgKGxvYWRzdGFydCk9XCJtZWRpYVBsYXllclNlcnZpY2UubG9hZFN0YXJ0RXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHBhdXNlKT1cIm1lZGlhUGxheWVyU2VydmljZS5wYXVzZUV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChwbGF5KT1cIm1lZGlhUGxheWVyU2VydmljZS5wbGF5RXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHBsYXlpbmcpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlpbmdFdmVudC5uZXh0KCFwbGF5ZXIucGF1c2VkKVwiXG4gICAgICAgIChyYXRlY2hhbmdlKT1cIm1lZGlhUGxheWVyU2VydmljZS5yYXRlQ2hhbmdlRXZlbnQubmV4dChwbGF5ZXIucGxheWJhY2tSYXRlKVwiXG4gICAgICAgIChzZWVrZWQpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnNlZWtlZEV2ZW50Lm5leHQocGxheWVyLmN1cnJlbnRUaW1lKVwiXG4gICAgICAgIChzZWVraW5nKT1cIm1lZGlhUGxheWVyU2VydmljZS5zZWVraW5nRXZlbnQubmV4dChwbGF5ZXIuY3VycmVudFRpbWUpXCJcbiAgICAgICAgKHN0YWxsZWQpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnN0YWxsZWRFdmVudC5uZXh0KClcIlxuICAgICAgICAoc3VzcGVuZCk9XCJtZWRpYVBsYXllclNlcnZpY2Uuc3VzcGVuZEV2ZW50Lm5leHQoKVwiXG4gICAgICAgICh0aW1ldXBkYXRlKT1cIm1lZGlhUGxheWVyU2VydmljZS50aW1lVXBkYXRlRXZlbnQubmV4dChwbGF5ZXIuY3VycmVudFRpbWUpXCJcbiAgICAgICAgKHZvbHVtZWNoYW5nZSk9XCJtZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lQ2hhbmdlRXZlbnQubmV4dChwbGF5ZXIudm9sdW1lKVwiXG4gICAgICAgICh3YWl0aW5nKT1cIm1lZGlhUGxheWVyU2VydmljZS53YWl0aW5nRXZlbnQubmV4dCgpXCJcbiAgICAgICAgKGNsaWNrKT1cIm1lZGlhUGxheWVyU2VydmljZS5tZWRpYUNsaWNrRXZlbnQubmV4dCgkZXZlbnQpXCI+XG4gICAgPC92aWRlbz5cblxuICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1vdmVybGF5XCIgW2NsYXNzLnBsYXlpbmddPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlpbmcgfCBhc3luY1wiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwicGxheS1ncmFwaGljXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDY0IDY0XCI+XG4gICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwicGxheS1jaXJjbGVcIiBjeD1cIjMyLjJcIiBjeT1cIjMxLjhcIiByPVwiMzEuOFwiIC8+XG4gICAgICAgICAgICA8cG9seWdvbiBjbGFzcz1cInBsYXktdHJpYW5nbGVcIiBwb2ludHM9XCIyMywxNC4xIDIzLDUwLjggNDguMywzMi41XCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG5cbjxkaXYgY2xhc3M9XCJhdWRpby1wbGF5ZXJcIiAqbmdJZj1cInR5cGUgPT09ICdhdWRpbydcIj5cblxuICAgIDxzdmcgd2lkdGg9XCIyNHB4XCIgaGVpZ2h0PVwiMjRweFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgPGcgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj5cbiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtOTguMDAwMDAwLCAtNDU4LjAwMDAwMClcIj5cbiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoOTguMDAwMDAwLCA0NTguMDAwMDAwKVwiPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQuNSwwLjUgTDE4LjA0MzUzMDgsMC41IEwyMy41LDYuMjIyNTE1MDIgTDIzLjUsMjMuNSBMNC41LDIzLjUgTDQuNSwwLjUgWlwiIGZpbGw9XCIjQ0NFQUUyXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQuNSw4IEw0LjUsMC41IEwxOCwwLjUgTDIzLjUsNiBMMjMuNSwyMy41IEwxOCwyMy41XCIgc3Ryb2tlPVwiIzYwNzk4RFwiIGZpbGw9XCIjQ0NFQUUyXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTQsMTMuNSBMMC41LDEzLjUgTDAuNSwxOC41IEw0LDE4LjUgTDkuNSwyMi41IEw5LjUsOS41IEw0LDEzLjUgWlwiIHN0cm9rZT1cIiM2MDc5OERcIiBmaWxsPVwiIzg1RDJCRVwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS41LDEyLjUxMzc5MzkgQzEzLjc1NzYyMjUsMTIuNTEzNzkzOSAxNC41LDE0LjM3MDkyMzYgMTQuNSwxNiBDMTQuNSwxNy42ODQ5MjM2IDEzLjcwODkxNTIsMTkuNTQyMDUzMiAxMS41LDE5LjU0MjA1MzJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzYwNzk4RFwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMS41LDkgQzE1LjgwMzc2NDMsOS4wNDE2ODcwMSAxOC41LDExLjY2MDQ4MDUgMTguNSwxNiBDMTguNSwyMC4zMzk1MTk1IDE1Ljg4MDQzMDIsMjMuMDA3OTk1NiAxMS41LDIzXCIgc3Ryb2tlPVwiIzYwNzk4RFwiPjwvcGF0aD5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xNy41MjE5MTE2LDAuNzYxNDEzNTc0IEwxNy41MjE5MTE2LDYgTDIzLDZcIiBzdHJva2U9XCIjNjA3OThEXCIgZmlsbD1cIiM4NUQyQkVcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgPC9zdmc+XG5cbiAgICA8cCBjbGFzcz1cImF1ZGlvLWZpbGUtbmFtZVwiPnt7IChhdWRpb01ldGFkYXRhIHwgYXN5bmMpPy5maWxlbmFtZSB9fTwvcD5cbiAgICA8cCBjbGFzcz1cImF1ZGlvLWZpbGUtZm9ybWF0XCI+e3sgKGF1ZGlvTWV0YWRhdGEgfCBhc3luYyk/LmRlc2NyaXB0aW9uIH19PC9wPlxuICAgIDxwIGNsYXNzPVwiYXVkaW8tZmlsZS1zaXplXCI+e3sgKGF1ZGlvTWV0YWRhdGEgfCBhc3luYyk/LnNpemUgfCBmaWxlU2l6ZSB9fTwvcD5cblxuICAgIDxhdWRpbyAjcGxheWVyXG4gICAgICAgIFtzcmNdPVwic291cmNlXCJcbiAgICAgICAgKGFib3J0KT1cIm1lZGlhUGxheWVyU2VydmljZS5hYm9ydEV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChjYW5wbGF5KT1cIm1lZGlhUGxheWVyU2VydmljZS5jYW5QbGF5RXZlbnQubmV4dCh0cnVlKVwiXG4gICAgICAgIChjYW5wbGF5dGhyb3VnaCk9XCJtZWRpYVBsYXllclNlcnZpY2UuY2FuUGxheVRocm91Z2hFdmVudC5uZXh0KHRydWUpXCJcbiAgICAgICAgKGR1cmF0aW9uY2hhbmdlKT1cIm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbkNoYW5nZUV2ZW50Lm5leHQocGxheWVyLmR1cmF0aW9uKVwiXG4gICAgICAgIChlbmRlZCk9XCJtZWRpYVBsYXllclNlcnZpY2UuZW5kZWRFdmVudC5uZXh0KClcIlxuICAgICAgICAoZXJyb3IpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmVycm9yRXZlbnQubmV4dCgkZXZlbnQpXCJcbiAgICAgICAgKGxvYWRlZGRhdGEpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmxvYWRlZERhdGFFdmVudC5uZXh0KCRldmVudClcIlxuICAgICAgICAobG9hZGVkbWV0YWRhdGEpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmxvYWRlZE1ldGFkYXRhRXZlbnQubmV4dCgkZXZlbnQpXCJcbiAgICAgICAgKGxvYWRzdGFydCk9XCJtZWRpYVBsYXllclNlcnZpY2UubG9hZFN0YXJ0RXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHBhdXNlKT1cIm1lZGlhUGxheWVyU2VydmljZS5wYXVzZUV2ZW50Lm5leHQoKVwiXG4gICAgICAgIChwbGF5KT1cIm1lZGlhUGxheWVyU2VydmljZS5wbGF5RXZlbnQubmV4dCgpXCJcbiAgICAgICAgKHBsYXlpbmcpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlpbmdFdmVudC5uZXh0KCFwbGF5ZXIucGF1c2VkKVwiXG4gICAgICAgIChyYXRlY2hhbmdlKT1cIm1lZGlhUGxheWVyU2VydmljZS5yYXRlQ2hhbmdlRXZlbnQubmV4dChwbGF5ZXIucGxheWJhY2tSYXRlKVwiXG4gICAgICAgIChzZWVrZWQpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnNlZWtlZEV2ZW50Lm5leHQocGxheWVyLmN1cnJlbnRUaW1lKVwiXG4gICAgICAgIChzZWVraW5nKT1cIm1lZGlhUGxheWVyU2VydmljZS5zZWVraW5nRXZlbnQubmV4dChwbGF5ZXIuY3VycmVudFRpbWUpXCJcbiAgICAgICAgKHN0YWxsZWQpPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnN0YWxsZWRFdmVudC5uZXh0KClcIlxuICAgICAgICAoc3VzcGVuZCk9XCJtZWRpYVBsYXllclNlcnZpY2Uuc3VzcGVuZEV2ZW50Lm5leHQoKVwiXG4gICAgICAgICh0aW1ldXBkYXRlKT1cIm1lZGlhUGxheWVyU2VydmljZS50aW1lVXBkYXRlRXZlbnQubmV4dChwbGF5ZXIuY3VycmVudFRpbWUpXCJcbiAgICAgICAgKHZvbHVtZWNoYW5nZSk9XCJtZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lQ2hhbmdlRXZlbnQubmV4dChwbGF5ZXIudm9sdW1lKVwiXG4gICAgICAgICh3YWl0aW5nKT1cIm1lZGlhUGxheWVyU2VydmljZS53YWl0aW5nRXZlbnQubmV4dCgpXCJcbiAgICAgICAgKGNsaWNrKT1cIm1lZGlhUGxheWVyU2VydmljZS5tZWRpYUNsaWNrRXZlbnQubmV4dCgkZXZlbnQpXCI+XG4gICAgPC9hdWRpbz5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiY29udHJvbC1iYXJcIj5cbiAgICA8dXgtbWVkaWEtcGxheWVyLXRpbWVsaW5lPjwvdXgtbWVkaWEtcGxheWVyLXRpbWVsaW5lPlxuICAgIDx1eC1tZWRpYS1wbGF5ZXItY29udHJvbHM+PC91eC1tZWRpYS1wbGF5ZXItY29udHJvbHM+XG48L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogW01lZGlhUGxheWVyU2VydmljZV0sXG4gICAgaG9zdDoge1xuICAgICAgICAndGFiaW5kZXgnOiAnMCcsXG4gICAgICAgICcoa2V5ZG93bi5TcGFjZSknOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLnRvZ2dsZVBsYXkoKScsXG4gICAgICAgICdbY2xhc3Muc3RhbmRhcmRdJzogJyFtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbicsXG4gICAgICAgICdbY2xhc3MuZnVsbHNjcmVlbl0nOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW4nLFxuICAgICAgICAnW2NsYXNzLnF1aWV0XSc6ICdxdWlldE1vZGUgJiYgdHlwZSA9PT0gXCJ2aWRlb1wiIHx8IG1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuJyxcbiAgICAgICAgJ1tjbGFzcy5ob3Zlcl0nOiAnaG92ZXJpbmcnLFxuICAgICAgICAnW2NsYXNzLnZpZGVvXSc6ICd0eXBlID09PSBcInZpZGVvXCInLFxuICAgICAgICAnW2NsYXNzLmF1ZGlvXSc6ICd0eXBlID09PSBcImF1ZGlvXCInLFxuICAgICAgICAnKG1vdXNlZW50ZXIpJzogJ2hvdmVyaW5nID0gdHJ1ZScsXG4gICAgICAgICcobW91c2VsZWF2ZSknOiAnaG92ZXJpbmcgPSBmYWxzZScsXG4gICAgICAgICcoZG9jdW1lbnQ6d2Via2l0ZnVsbHNjcmVlbmNoYW5nZSknOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5DaGFuZ2UoJGV2ZW50KScsXG4gICAgICAgICcoZG9jdW1lbnQ6bW96ZnVsbHNjcmVlbmNoYW5nZSknOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5DaGFuZ2UoJGV2ZW50KScsXG4gICAgICAgICcoZG9jdW1lbnQ6TVNGdWxsc2NyZWVuQ2hhbmdlKSc6ICdtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkNoYW5nZSgkZXZlbnQpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgncGxheWVyJykgcHJpdmF0ZSBfcGxheWVyUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgaG92ZXJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhdWRpb01ldGFkYXRhOiBPYnNlcnZhYmxlPEF1ZGlvTWV0YWRhdGE+O1xuXG4gICAgZ2V0IHNvdXJjZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uuc291cmNlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHNvdXJjZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnNvdXJjZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0eXBlKCk6IE1lZGlhUGxheWVyVHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50eXBlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHR5cGUodmFsdWU6IE1lZGlhUGxheWVyVHlwZSkge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50eXBlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHF1aWV0TW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnF1aWV0TW9kZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBxdWlldE1vZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYVBsYXllclNlcnZpY2U6IE1lZGlhUGxheWVyU2VydmljZSwgcHJpdmF0ZSBfYXVkaW9TZXJ2aWNlOiBBdWRpb1NlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcblxuICAgICAgICAvLyBzaG93IGNvbnRyb2xzIHdoZW4gaG92ZXJpbmcgYW5kIGluIHF1aWV0IG1vZGVcbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21vdXNlbW92ZScpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3ZlcmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGV2ZW50KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDIwMDApLFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5ob3ZlcmluZyA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnNldE1lZGlhUGxheWVyKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fcGxheWVyUmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuYXVkaW9NZXRhZGF0YSA9IHRoaXMuX2F1ZGlvU2VydmljZS5nZXRBdWRpb0ZpbGVNZXRhZGF0YSh0aGlzLl9wbGF5ZXJSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlpbmdFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheWluZy5uZXh0KHRydWUpKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGF1c2VFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheWluZy5uZXh0KGZhbHNlKSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLm1lZGlhQ2xpY2tFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UudG9nZ2xlUGxheSgpKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UubG9hZGVkTWV0YWRhdGFFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UubG9hZGVkID0gdHJ1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFQbGF5ZXJUeXBlID0gJ3ZpZGVvJyB8ICdhdWRpbyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFQbGF5ZXJCdWZmZXIge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG59Il19