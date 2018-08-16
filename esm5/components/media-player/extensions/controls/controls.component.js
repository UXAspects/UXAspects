/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SliderSize } from '../../../slider/index';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
var /** @type {?} */ uniqueId = 1;
var MediaPlayerControlsExtensionComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MediaPlayerControlsExtensionComponent, _super);
    function MediaPlayerControlsExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.volumeActive = false;
        _this.volumeFocus = false;
        _this.returnFocus = true;
        _this.subtitlesId = "ux-media-player-subtitle-popover-" + uniqueId++;
        _this.subtitlesOpen = false;
        _this.mouseEnterVolume = new Subject();
        _this.mouseLeaveVolume = new Subject();
        _this.options = {
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
        _this._volume = 50;
        _this._previousVolume = 50;
        _this._onDestroy = new Subject();
        return _this;
    }
    Object.defineProperty(MediaPlayerControlsExtensionComponent.prototype, "volume", {
        get: /**
         * @return {?}
         */
        function () {
            return this._volume;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === 0 && this._volume !== 0) {
                this._previousVolume = this._volume;
            }
            this._volume = Math.min(Math.max(value, 0), 100);
            this.mediaPlayerService.volume = this._volume / 100;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (volume) { return _this.volume = volume * 100; });
        this.mediaPlayerService.initEvent.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.volume = _this.mediaPlayerService.volume * 100; });
        this.mouseEnterVolume.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.volumeActive = true; });
        this.mouseLeaveVolume.pipe(switchMap(function () { return timer(1500).pipe(takeUntil(_this.mouseEnterVolume)); }), takeUntil(this._onDestroy)).subscribe(function () { return _this.volumeActive = false; });
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.toggleMute = /**
     * @return {?}
     */
    function () {
        this.volume = this.volume === 0 ? this._previousVolume : 0;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.goToStart = /**
     * @return {?}
     */
    function () {
        this.mediaPlayerService.currentTime = 0;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.goToEnd = /**
     * @return {?}
     */
    function () {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.isSubtitleActive = /**
     * @return {?}
     */
    function () {
        for (var /** @type {?} */ idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} track
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.setSubtitleTrack = /**
     * @param {?} track
     * @return {?}
     */
    function (track) {
        // hide all tracks
        this.mediaPlayerService.hideSubtitleTracks();
        // set the position of the subtitle track
        for (var /** @type {?} */ idx = 0; idx < track.cues.length; idx++) {
            var /** @type {?} */ cue = track.cues[idx];
            cue.line = -3;
        }
        // activate the selected one
        track.mode = 'showing';
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.getSubtitleTrack = /**
     * @return {?}
     */
    function () {
        for (var /** @type {?} */ idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return this.mediaPlayerService.textTracks[idx].label;
            }
        }
        return 'No subtitles';
    };
    MediaPlayerControlsExtensionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player-controls',
                    template: "<div class=\"volume-container\">\n\n    <div class=\"volume-slider-container\"\n        #volumeContainer\n        [class.active]=\"volumeActive || volumeFocus\"\n        (mouseenter)=\"mouseEnterVolume.next()\"\n        (mouseleave)=\"mouseLeaveVolume.next()\"\n        (uxFocusWithin)=\"volumeFocus = true\"\n        (uxBlurWithin)=\"volumeFocus = false\">\n\n        <button #volumeIcon\n                class=\"volume-slider-icon\"\n                attr.aria-label=\"{{ volume === 0 ? 'Unmute' : 'Mute' }}\"\n                i18n-aria-label\n                [uxTooltip]=\"muteTooltip\"\n                [showTriggers]=\"['mouseenter']\"\n                [hideTriggers]=\"['mouseleave']\"\n                (click)=\"toggleMute()\"\n                (mouseup)=\"volumeIcon.blur()\">\n\n            <span class=\"hpe-icon\"\n                  [class.hpe-volume-mute]=\"volume === 0\"\n                  [class.hpe-volume-low]=\"volume > 0 && volume <= 70\"\n                  [class.hpe-volume]=\"volume > 70\">\n            </span>\n        </button>\n\n        <div class=\"volume-slider-node\">\n            <ux-slider [(value)]=\"volume\" [options]=\"options\"></ux-slider>\n        </div>\n    </div>\n</div>\n\n<button #startButton\n    class=\"control-button\"\n    (click)=\"goToStart()\"\n    (mouseup)=\"startButton.blur()\"\n    aria-label=\"Go to start\"\n    i18n-aria-label>\n\n    <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" focusable=\"false\">\n        <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n        <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n    </svg>\n</button>\n\n<button #playButton\n    class=\"control-button\"\n    attr.aria-label=\"{{ (mediaPlayerService.playing | async) ? 'Pause' : 'Play' }}\"\n    i18n-aria-label\n    (click)=\"mediaPlayerService.togglePlay()\"\n    (mouseup)=\"playButton.blur()\">\n\n    <svg *ngIf=\"!(mediaPlayerService.playing | async)\" viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" focusable=\"false\">\n        <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n    </svg>\n    <svg *ngIf=\"mediaPlayerService.playing | async\" viewBox=\"0 0 43 56.9\" width=\"20\" height=\"29\" focusable=\"false\">\n        <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n        <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n    </svg>\n</button>\n\n<button #endButton\n    class=\"control-button\"\n    (click)=\"goToEnd()\"\n    (mouseup)=\"endButton.blur()\"\n    aria-label=\"Go to end\"\n    i18n-aria-label>\n\n    <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" focusable=\"false\">\n        <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n        <polygon points=\"0,64 0,0 44.1,32\" />\n    </svg>\n</button>\n\n<div class=\"actions-list\">\n\n    <ng-content></ng-content>\n\n    <div class=\"action-button-container\" *ngIf=\"mediaPlayerService.textTracks.length > 0 && mediaPlayerService.type === 'video'\">\n        <button #subtitlesButton\n            class=\"action-button\"\n            (keydown)=\"returnFocus = true\"\n            (click)=\"subtitlesOpen = !subtitlesOpen\"\n            (mouseup)=\"subtitlesButton.blur(); returnFocus = false\"\n            i18n-aria-label\n            attr.aria-label=\"Select subtitles, {{ getSubtitleTrack() }} currently selected.\"\n            [attr.aria-expanded]=\"subtitlesOpen\"\n            [attr.aria-describedby]=\"subtitlesId\"\n            aria-haspopup=\"true\">\n            <span class=\"hpe-icon hpe-subtitles\"></span>\n        </button>\n\n        <div #subtitles\n            [style.top.px]=\"-subtitles.offsetHeight\"\n            class=\"popover top media-player-subtitles-popover show\"\n            [id]=\"subtitlesId\"\n            (keydown.escape)=\"subtitlesOpen = false\"\n            (uxClickOutside)=\"subtitlesOpen = false\"\n            *ngIf=\"subtitlesOpen\">\n            <div class=\"arrow\"></div>\n            <h3 class=\"popover-title\" i18n>Subtitles</h3>\n            <div class=\"popover-content\">\n                <ul class=\"subtitles-list\" uxTabbableList [focusOnShow]=\"returnFocus\" [returnFocus]=\"returnFocus\">\n                    <li uxTabbableListItem\n                        tabindex=\"0\"\n                        class=\"subtitles-list-item\"\n                        [class.active]=\"!isSubtitleActive()\"\n                        [attr.aria-selected]=\"isSubtitleActive()\"\n                        (click)=\"mediaPlayerService.hideSubtitleTracks(); subtitlesOpen = false\"\n                        (keydown.enter)=\"mediaPlayerService.hideSubtitleTracks(); subtitlesOpen = false; returnFocus = true\">\n\n                        <i class=\"hpe-icon hpe-checkmark m-r-xs\"></i>\n                        <span i18n>Subtitles Off</span>\n                    </li>\n                    <li uxTabbableListItem\n                        class=\"subtitles-list-item\"\n                        *ngFor=\"let track of mediaPlayerService.textTracks\"\n                        [class.active]=\"track.mode === 'showing'\"\n                        [attr.aria-selected]=\"isSubtitleActive()\"\n                        (click)=\"setSubtitleTrack(track); subtitlesOpen = false\"\n                        (keydown.enter)=\"setSubtitleTrack(track); subtitlesOpen = false; returnFocus = true\">\n                        <i class=\"hpe-icon hpe-checkmark m-r-xs\"></i>\n                        <span>{{ track.label }}</span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"action-button-container\">\n        <button #fullscreenButton\n            *ngIf=\"mediaPlayerService.type !== 'audio'\"\n            class=\"action-button\"\n            attr.aria-label=\"{{ mediaPlayerService.fullscreen ? 'Exit full screen' : 'Full screen' }}\"\n            i18n-aria-label\n            (click)=\"mediaPlayerService.toggleFullscreen()\"\n            (mouseup)=\"fullscreenButton.blur()\">\n\n            <span class=\"hpe-icon\"\n                  [class.hpe-expand]=\"!mediaPlayerService.fullscreen\"\n                  [class.hpe-contract]=\"mediaPlayerService.fullscreen\">\n            </span>\n        </button>\n    </div>\n</div>\n\n\n\n<ng-template #muteTooltip>\n    <span aria-hidden=\"true\">{{ volume === 0 ? 'Unmute' : 'Mute' }}</span>\n</ng-template>",
                    host: {
                        '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
                    }
                }] }
    ];
    return MediaPlayerControlsExtensionComponent;
}(MediaPlayerBaseExtensionDirective));
export { MediaPlayerControlsExtensionComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQWlCLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhGLHFCQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7O0lBU2tDLGlFQUFpQzs7OzZCQUVoRSxLQUFLOzRCQUNOLEtBQUs7NEJBQ0wsSUFBSTs0QkFDTCxzQ0FBb0MsUUFBUSxFQUFJOzhCQUM3QyxLQUFLO2lDQUNYLElBQUksT0FBTyxFQUFRO2lDQUNuQixJQUFJLE9BQU8sRUFBUTt3QkFFYjtZQUNyQixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxRQUFRO2lCQUNsQjthQUNKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsTUFBTTtpQkFDaEI7Z0JBQ0QsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO2dCQUN6QixLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRSxLQUFLO3FCQUNkO29CQUNELEtBQUssRUFBRTt3QkFDSCxJQUFJLEVBQUUsS0FBSztxQkFDZDtpQkFDSjthQUNKO1NB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RUFBRSwwQkFBMEI7b0JBQ3BDLGdzTUFBd0M7b0JBQ3hDLElBQUksRUFBRTt3QkFDRixlQUFlLEVBQUUsK0RBQStEO3FCQUNuRjtpQkFDSjs7Z0RBZkQ7RUFnQjJELGlDQUFpQztTQUEvRSxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0aW1lciB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2xpZGVyT3B0aW9ucywgU2xpZGVyU2l6ZSB9IGZyb20gJy4uLy4uLy4uL3NsaWRlci9pbmRleCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgfSBmcm9tICcuLi9iYXNlLWV4dGVuc2lvbi5kaXJlY3RpdmUnO1xuXG5sZXQgdW5pcXVlSWQ6IG51bWJlciA9IDE7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWVkaWEtcGxheWVyLWNvbnRyb2xzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29udHJvbHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAnbWVkaWFQbGF5ZXJTZXJ2aWNlLnF1aWV0TW9kZSB8fCBtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyQ29udHJvbHNFeHRlbnNpb25Db21wb25lbnQgZXh0ZW5kcyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICB2b2x1bWVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2b2x1bWVGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHJldHVybkZvY3VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzdWJ0aXRsZXNJZDogc3RyaW5nID0gYHV4LW1lZGlhLXBsYXllci1zdWJ0aXRsZS1wb3BvdmVyLSR7dW5pcXVlSWQrK31gO1xuICAgIHN1YnRpdGxlc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBtb3VzZUVudGVyVm9sdW1lID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBtb3VzZUxlYXZlVm9sdW1lID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG9wdGlvbnM6IFNsaWRlck9wdGlvbnMgPSB7XG4gICAgICAgIGhhbmRsZXM6IHtcbiAgICAgICAgICAgIGFyaWE6IHtcbiAgICAgICAgICAgICAgICB0aHVtYjogJ1ZvbHVtZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJhY2s6IHtcbiAgICAgICAgICAgIGNvbG9yczoge1xuICAgICAgICAgICAgICAgIGxvd2VyOiAnIzY2NidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IFNsaWRlclNpemUuTmFycm93LFxuICAgICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgICAgICBtYWpvcjoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWlub3I6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfdm9sdW1lOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZSA9IDUwO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgdm9sdW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgfVxuXG4gICAgc2V0IHZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSAwICYmIHRoaXMuX3ZvbHVtZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWb2x1bWUgPSB0aGlzLl92b2x1bWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92b2x1bWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgMCksIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZSA9IHRoaXMuX3ZvbHVtZSAvIDEwMDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lQ2hhbmdlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHZvbHVtZSA9PiB0aGlzLnZvbHVtZSA9IHZvbHVtZSAqIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmluaXRFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWUgPSB0aGlzLm1lZGlhUGxheWVyU2VydmljZS52b2x1bWUgKiAxMDApO1xuXG4gICAgICAgIHRoaXMubW91c2VFbnRlclZvbHVtZS5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWVBY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgdGhpcy5tb3VzZUxlYXZlVm9sdW1lLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGltZXIoMTUwMCkucGlwZSh0YWtlVW50aWwodGhpcy5tb3VzZUVudGVyVm9sdW1lKSkpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLnZvbHVtZUFjdGl2ZSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTXV0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB0aGlzLnZvbHVtZSA9PT0gMCA/IHRoaXMuX3ByZXZpb3VzVm9sdW1lIDogMDtcbiAgICB9XG5cbiAgICBnb1RvU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBnb1RvRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5jdXJyZW50VGltZSA9IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uO1xuICAgIH1cblxuICAgIGlzU3VidGl0bGVBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRleHRUcmFja3MubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRleHRUcmFja3NbaWR4XS5tb2RlID09PSAnc2hvd2luZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzZXRTdWJ0aXRsZVRyYWNrKHRyYWNrOiBUZXh0VHJhY2spOiB2b2lkIHtcbiAgICAgICAgLy8gaGlkZSBhbGwgdHJhY2tzXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmhpZGVTdWJ0aXRsZVRyYWNrcygpO1xuXG4gICAgICAgIC8vIHNldCB0aGUgcG9zaXRpb24gb2YgdGhlIHN1YnRpdGxlIHRyYWNrXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHRyYWNrLmN1ZXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgY29uc3QgY3VlOiBhbnkgPSB0cmFjay5jdWVzW2lkeF07XG4gICAgICAgICAgICBjdWUubGluZSA9IC0zO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWN0aXZhdGUgdGhlIHNlbGVjdGVkIG9uZVxuICAgICAgICB0cmFjay5tb2RlID0gJ3Nob3dpbmcnO1xuXG4gICAgfVxuXG4gICAgZ2V0U3VidGl0bGVUcmFjaygpOiBzdHJpbmcge1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50ZXh0VHJhY2tzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhUGxheWVyU2VydmljZS50ZXh0VHJhY2tzW2lkeF0ubW9kZSA9PT0gJ3Nob3dpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRleHRUcmFja3NbaWR4XS5sYWJlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnTm8gc3VidGl0bGVzJztcbiAgICB9XG5cbn0iXX0=