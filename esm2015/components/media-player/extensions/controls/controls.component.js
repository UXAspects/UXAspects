/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SliderSize } from '../../../slider/index';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
let /** @type {?} */ uniqueId = 1;
export class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.volumeActive = false;
        this.volumeFocus = false;
        this.returnFocus = true;
        this.subtitlesId = `ux-media-player-subtitle-popover-${uniqueId++}`;
        this.subtitlesOpen = false;
        this.mouseEnterVolume = new Subject();
        this.mouseLeaveVolume = new Subject();
        this.options = {
            handles: {
                aria: {
                    thumb: 'Volume'
                }
            },
            track: {
                colors: {
                    lower: '#666'
                },
                height: SliderSize.Narrow,
                ticks: {
                    major: {
                        show: false
                    },
                    minor: {
                        show: false
                    }
                }
            }
        };
        this._volume = 50;
        this._previousVolume = 50;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    get volume() {
        return this._volume;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set volume(value) {
        if (value === 0 && this._volume !== 0) {
            this._previousVolume = this._volume;
        }
        this._volume = Math.min(Math.max(value, 0), 100);
        this.mediaPlayerService.volume = this._volume / 100;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);
        this.mouseEnterVolume.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = true);
        this.mouseLeaveVolume.pipe(switchMap(() => timer(1500).pipe(takeUntil(this.mouseEnterVolume))), takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    toggleMute() {
        this.volume = this.volume === 0 ? this._previousVolume : 0;
    }
    /**
     * @return {?}
     */
    goToStart() {
        this.mediaPlayerService.currentTime = 0;
    }
    /**
     * @return {?}
     */
    goToEnd() {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    }
    /**
     * @return {?}
     */
    isSubtitleActive() {
        for (let /** @type {?} */ idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} track
     * @return {?}
     */
    setSubtitleTrack(track) {
        // hide all tracks
        this.mediaPlayerService.hideSubtitleTracks();
        // set the position of the subtitle track
        for (let /** @type {?} */ idx = 0; idx < track.cues.length; idx++) {
            const /** @type {?} */ cue = track.cues[idx];
            cue.line = -3;
        }
        // activate the selected one
        track.mode = 'showing';
    }
    /**
     * @return {?}
     */
    getSubtitleTrack() {
        for (let /** @type {?} */ idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return this.mediaPlayerService.textTracks[idx].label;
            }
        }
        return 'No subtitles';
    }
}
MediaPlayerControlsExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-controls',
                template: "<div class=\"volume-container\">\n\n    <div class=\"volume-slider-container\"\n        #volumeContainer\n        [class.active]=\"volumeActive || volumeFocus\"\n        (mouseenter)=\"mouseEnterVolume.next()\"\n        (mouseleave)=\"mouseLeaveVolume.next()\"\n        (uxFocusWithin)=\"volumeFocus = true\"\n        (uxBlurWithin)=\"volumeFocus = false\">\n\n        <button #volumeIcon\n                class=\"volume-slider-icon\"\n                attr.aria-label=\"{{ volume === 0 ? 'Unmute' : 'Mute' }}\"\n                i18n-aria-label\n                [uxTooltip]=\"muteTooltip\"\n                [showTriggers]=\"['mouseenter']\"\n                [hideTriggers]=\"['mouseleave']\"\n                (click)=\"toggleMute()\"\n                (mouseup)=\"volumeIcon.blur()\">\n\n            <span class=\"hpe-icon\"\n                  [class.hpe-volume-mute]=\"volume === 0\"\n                  [class.hpe-volume-low]=\"volume > 0 && volume <= 70\"\n                  [class.hpe-volume]=\"volume > 70\">\n            </span>\n        </button>\n\n        <div class=\"volume-slider-node\">\n            <ux-slider [(value)]=\"volume\" [options]=\"options\"></ux-slider>\n        </div>\n    </div>\n</div>\n\n<button #startButton\n    class=\"control-button\"\n    (click)=\"goToStart()\"\n    (mouseup)=\"startButton.blur()\"\n    aria-label=\"Go to start\"\n    i18n-aria-label>\n\n    <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" focusable=\"false\">\n        <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n        <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n    </svg>\n</button>\n\n<button #playButton\n    class=\"control-button\"\n    attr.aria-label=\"{{ (mediaPlayerService.playing | async) ? 'Pause' : 'Play' }}\"\n    i18n-aria-label\n    (click)=\"mediaPlayerService.togglePlay()\"\n    (mouseup)=\"playButton.blur()\">\n\n    <svg *ngIf=\"!(mediaPlayerService.playing | async)\" viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" focusable=\"false\">\n        <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n    </svg>\n    <svg *ngIf=\"mediaPlayerService.playing | async\" viewBox=\"0 0 43 56.9\" width=\"20\" height=\"29\" focusable=\"false\">\n        <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n        <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n    </svg>\n</button>\n\n<button #endButton\n    class=\"control-button\"\n    (click)=\"goToEnd()\"\n    (mouseup)=\"endButton.blur()\"\n    aria-label=\"Go to end\"\n    i18n-aria-label>\n\n    <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" focusable=\"false\">\n        <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n        <polygon points=\"0,64 0,0 44.1,32\" />\n    </svg>\n</button>\n\n<div class=\"actions-list\">\n\n    <ng-content></ng-content>\n\n    <div class=\"action-button-container\" *ngIf=\"mediaPlayerService.textTracks.length > 0 && mediaPlayerService.type === 'video'\">\n        <button #subtitlesButton\n            class=\"action-button\"\n            (keydown)=\"returnFocus = true\"\n            (click)=\"subtitlesOpen = !subtitlesOpen\"\n            (mouseup)=\"subtitlesButton.blur(); returnFocus = false\"\n            i18n-aria-label\n            attr.aria-label=\"Select subtitles, {{ getSubtitleTrack() }} currently selected.\"\n            [attr.aria-expanded]=\"subtitlesOpen\"\n            [attr.aria-describedby]=\"subtitlesId\"\n            aria-haspopup=\"true\">\n            <span class=\"hpe-icon hpe-subtitles\"></span>\n        </button>\n\n        <div #subtitles\n            [style.top.px]=\"-subtitles.offsetHeight\"\n            class=\"popover top media-player-subtitles-popover show\"\n            [id]=\"subtitlesId\"\n            (keydown.escape)=\"subtitlesOpen = false\"\n            (uxClickOutside)=\"subtitlesOpen = false\"\n            *ngIf=\"subtitlesOpen\">\n            <div class=\"arrow\"></div>\n            <h3 class=\"popover-title\" i18n>Subtitles</h3>\n            <div class=\"popover-content\">\n                <ul class=\"subtitles-list\" uxTabbableList [focusOnShow]=\"returnFocus\" [returnFocus]=\"returnFocus\">\n                    <li uxTabbableListItem\n                        tabindex=\"0\"\n                        class=\"subtitles-list-item\"\n                        [class.active]=\"!isSubtitleActive()\"\n                        [attr.aria-selected]=\"isSubtitleActive()\"\n                        (click)=\"mediaPlayerService.hideSubtitleTracks(); subtitlesOpen = false\"\n                        (keydown.enter)=\"mediaPlayerService.hideSubtitleTracks(); subtitlesOpen = false; returnFocus = true\">\n\n                        <i class=\"hpe-icon hpe-checkmark m-r-xs\"></i>\n                        <span i18n>Subtitles Off</span>\n                    </li>\n                    <li uxTabbableListItem\n                        class=\"subtitles-list-item\"\n                        *ngFor=\"let track of mediaPlayerService.textTracks\"\n                        [class.active]=\"track.mode === 'showing'\"\n                        [attr.aria-selected]=\"isSubtitleActive()\"\n                        (click)=\"setSubtitleTrack(track); subtitlesOpen = false\"\n                        (keydown.enter)=\"setSubtitleTrack(track); subtitlesOpen = false; returnFocus = true\">\n                        <i class=\"hpe-icon hpe-checkmark m-r-xs\"></i>\n                        <span>{{ track.label }}</span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"action-button-container\">\n        <button #fullscreenButton\n            *ngIf=\"mediaPlayerService.type !== 'audio'\"\n            class=\"action-button\"\n            attr.aria-label=\"{{ mediaPlayerService.fullscreen ? 'Exit full screen' : 'Full screen' }}\"\n            i18n-aria-label\n            (click)=\"mediaPlayerService.toggleFullscreen()\"\n            (mouseup)=\"fullscreenButton.blur()\">\n\n            <span class=\"hpe-icon\"\n                  [class.hpe-expand]=\"!mediaPlayerService.fullscreen\"\n                  [class.hpe-contract]=\"mediaPlayerService.fullscreen\">\n            </span>\n        </button>\n    </div>\n</div>\n\n\n\n<ng-template #muteTooltip>\n    <span aria-hidden=\"true\">{{ volume === 0 ? 'Unmute' : 'Mute' }}</span>\n</ng-template>",
                host: {
                    '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
                }
            }] }
];
function MediaPlayerControlsExtensionComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeActive;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeFocus;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.returnFocus;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.subtitlesId;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.subtitlesOpen;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.mouseEnterVolume;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.mouseLeaveVolume;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.options;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype._volume;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype._previousVolume;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBaUIsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEYscUJBQUksUUFBUSxHQUFXLENBQUMsQ0FBQztBQVN6QixNQUFNLDRDQUE2QyxTQUFRLGlDQUFpQzs7OzRCQUVoRSxLQUFLOzJCQUNOLEtBQUs7MkJBQ0wsSUFBSTsyQkFDTCxvQ0FBb0MsUUFBUSxFQUFFLEVBQUU7NkJBQzdDLEtBQUs7Z0NBQ1gsSUFBSSxPQUFPLEVBQVE7Z0NBQ25CLElBQUksT0FBTyxFQUFRO3VCQUViO1lBQ3JCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLFFBQVE7aUJBQ2xCO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsTUFBTSxFQUFFO29CQUNKLEtBQUssRUFBRSxNQUFNO2lCQUNoQjtnQkFDRCxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ3pCLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUU7d0JBQ0gsSUFBSSxFQUFFLEtBQUs7cUJBQ2Q7b0JBQ0QsS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRSxLQUFLO3FCQUNkO2lCQUNKO2FBQ0o7U0FDSjt1QkFFeUIsRUFBRTsrQkFDRixFQUFFOzBCQUNQLElBQUksT0FBTyxFQUFROzs7OztJQUV4QyxJQUFJLE1BQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUN2Qjs7Ozs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFhO1FBRXBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ3ZEOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRXZJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQ3RCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDbEcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztLQUNoRDs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQzNDOzs7O0lBRUQsT0FBTztRQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztLQUMxRTs7OztJQUVELGdCQUFnQjtRQUNaLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFDdkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7OztJQUVELGdCQUFnQixDQUFDLEtBQWdCOztRQUU3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7UUFHN0MsR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUMvQyx1QkFBTSxHQUFHLEdBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pCOztRQUdELEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0tBRTFCOzs7O0lBRUQsZ0JBQWdCO1FBQ1osR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztZQUN2RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDeEQ7U0FDSjtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUM7S0FDekI7OztZQXJISixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsZ3NNQUF3QztnQkFDeEMsSUFBSSxFQUFFO29CQUNGLGVBQWUsRUFBRSwrREFBK0Q7aUJBQ25GO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0aW1lciB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2xpZGVyT3B0aW9ucywgU2xpZGVyU2l6ZSB9IGZyb20gJy4uLy4uLy4uL3NsaWRlci9pbmRleCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgfSBmcm9tICcuLi9iYXNlLWV4dGVuc2lvbi5kaXJlY3RpdmUnO1xuXG5sZXQgdW5pcXVlSWQ6IG51bWJlciA9IDE7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWVkaWEtcGxheWVyLWNvbnRyb2xzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29udHJvbHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLnF1aWV0TW9kZSB8fCBtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyQ29udHJvbHNFeHRlbnNpb25Db21wb25lbnQgZXh0ZW5kcyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICB2b2x1bWVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2b2x1bWVGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHJldHVybkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzdWJ0aXRsZXNJZDogc3RyaW5nID0gYHV4LW1lZGlhLXBsYXllci1zdWJ0aXRsZS1wb3BvdmVyLSR7dW5pcXVlSWQrK31gO1xuICAgIHN1YnRpdGxlc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBtb3VzZUVudGVyVm9sdW1lID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBtb3VzZUxlYXZlVm9sdW1lID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG9wdGlvbnM6IFNsaWRlck9wdGlvbnMgPSB7XG4gICAgICAgIGhhbmRsZXM6IHtcbiAgICAgICAgICAgIGFyaWE6IHtcbiAgICAgICAgICAgICAgICB0aHVtYjogJ1ZvbHVtZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2s6IHtcbiAgICAgICAgICAgIGNvbG9yczoge1xuICAgICAgICAgICAgICAgIGxvd2VyOiAnIzY2NidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IFNsaWRlclNpemUuTmFycm93LFxuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBtYWpvcjoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWlub3I6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfdm9sdW1lOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZSA9IDUwO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgdm9sdW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgfVxuXG4gICAgc2V0IHZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSAwICYmIHRoaXMuX3ZvbHVtZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWb2x1bWUgPSB0aGlzLl92b2x1bWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92b2x1bWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgMCksIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZSA9IHRoaXMuX3ZvbHVtZSAvIDEwMDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lQ2hhbmdlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHZvbHVtZSA9PiB0aGlzLnZvbHVtZSA9IHZvbHVtZSAqIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmluaXRFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWUgPSB0aGlzLm1lZGlhUGxheWVyU2VydmljZS52b2x1bWUgKiAxMDApO1xuXG4gICAgICAgIHRoaXMubW91c2VFbnRlclZvbHVtZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWVBY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgdGhpcy5tb3VzZUxlYXZlVm9sdW1lLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGltZXIoMTUwMCkucGlwZSh0YWtlVW50aWwodGhpcy5tb3VzZUVudGVyVm9sdW1lKSkpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLnZvbHVtZUFjdGl2ZSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTXV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB0aGlzLnZvbHVtZSA9PT0gMCA/IHRoaXMuX3ByZXZpb3VzVm9sdW1lIDogMDtcbiAgICB9XG5cbiAgICBnb1RvU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBnb1RvRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5jdXJyZW50VGltZSA9IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uO1xuICAgIH1cblxuICAgIGlzU3VidGl0bGVBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRleHRUcmFja3MubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRleHRUcmFja3NbaWR4XS5tb2RlID09PSAnc2hvd2luZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXRTdWJ0aXRsZVRyYWNrKHRyYWNrOiBUZXh0VHJhY2spOiB2b2lkIHtcbiAgICAgICAgLy8gaGlkZSBhbGwgdHJhY2tzXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmhpZGVTdWJ0aXRsZVRyYWNrcygpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb24gb2YgdGhlIHN1YnRpdGxlIHRyYWNrXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRyYWNrLmN1ZXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgY29uc3QgY3VlOiBhbnkgPSB0cmFjay5jdWVzW2lkeF07XG4gICAgICAgICAgICBjdWUubGluZSA9IC0zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIHNlbGVjdGVkIG9uZVxuICAgICAgICB0cmFjay5tb2RlID0gJ3Nob3dpbmcnO1xuXG4gICAgfVxuXG4gICAgZ2V0U3VidGl0bGVUcmFjaygpOiBzdHJpbmcge1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50ZXh0VHJhY2tzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhUGxheWVyU2VydmljZS50ZXh0VHJhY2tzW2lkeF0ubW9kZSA9PT0gJ3Nob3dpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRleHRUcmFja3NbaWR4XS5sYWJlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnTm8gc3VidGl0bGVzJztcbiAgICB9XG5cbn0iXX0=