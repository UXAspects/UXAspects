/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { timer } from 'rxjs/observable/timer';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
var MediaPlayerControlsExtensionComponent = (function (_super) {
    tslib_1.__extends(MediaPlayerControlsExtensionComponent, _super);
    function MediaPlayerControlsExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fullscreen = false;
        _this.volumeActive = false;
        _this.volumeDragging = false;
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
        this.mediaPlayerService.playEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (_) { return _this.playing = true; });
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (_) { return _this.playing = false; });
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (volume) { return _this.volume = volume * 100; });
        this.mediaPlayerService.initEvent.pipe(debounceTime(1), filter(function (init) { return init === true; }), takeUntil(this._onDestroy)).subscribe(function () { return _this.volume = _this.mediaPlayerService.volume * 100; });
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (fullscreen) { return _this.fullscreen = fullscreen; });
        var /** @type {?} */ mouseenter$ = fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        var /** @type {?} */ mouseenterContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        var /** @type {?} */ mouseleaveContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
        mouseenter$.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.volumeActive = true; });
        mouseleaveContainer$.pipe(switchMap(function () { return timer(1500).pipe(takeUntil(mouseenterContainer$)); }), takeUntil(this._onDestroy)).subscribe(function () { return _this.volumeActive = false; });
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
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        }
        else {
            this.volume = 0;
        }
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.togglePlay = /**
     * @return {?}
     */
    function () {
        if (this.playing) {
            this.mediaPlayerService.pause();
        }
        else {
            this.mediaPlayerService.play();
        }
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.setFullscreen = /**
     * @return {?}
     */
    function () {
        this.mediaPlayerService.toggleFullscreen();
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
     * @param {?} event
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.volumeDragging = true;
        var /** @type {?} */ thumb = /** @type {?} */ (event.target);
        thumb.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragMove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.volumeDragging) {
            return;
        }
        event.preventDefault();
        var /** @type {?} */ slider = /** @type {?} */ (this.volumeSlider.nativeElement);
        var /** @type {?} */ bounds = slider.getBoundingClientRect();
        var /** @type {?} */ x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));
        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    };
    /**
     * @return {?}
     */
    MediaPlayerControlsExtensionComponent.prototype.dragEnd = /**
     * @return {?}
     */
    function () {
        this.volumeDragging = false;
    };
    MediaPlayerControlsExtensionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player-controls',
                    template: "<div class=\"volume-container\">\n\n    <div class=\"volume-slider-container\" #volumeContainer [class.active]=\"volumeActive\">\n        <div class=\"volume-slider-icon\" #volumeIcon>\n            <span class=\"hpe-icon\" [class.hpe-volume-mute]=\"volume === 0\" [class.hpe-volume-low]=\"volume > 0 && volume <= 70\" [class.hpe-volume]=\"volume > 70\" [uxTooltip]=\"muteTooltip\" (click)=\"toggleMute()\"></span>\n        </div>\n        \n        <div class=\"volume-slider-node\">\n            <div class=\"volume-slider\" #volumeSlider>\n                <div class=\"volume-track-lower\" [style.width.%]=\"volume\"></div>\n                <div class=\"volume-slider-thumb\" (mousedown)=\"dragStart($event)\" [style.left.%]=\"volume\" tabindex=\"0\" (keydown.ArrowRight)=\"volume = volume + 10\" (keydown.ArrowLeft)=\"volume = volume - 10\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"spacer\"></div>\n\n<svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToStart()\">\n    <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n    <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n</svg>\n\n<svg viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" class=\"control-button\" *ngIf=\"!playing\" (click)=\"togglePlay()\">\n    <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n</svg>\n\n<svg viewBox=\"0 0 43 56.9\" class=\"control-button\" width=\"20\" height=\"29\" *ngIf=\"playing\" (click)=\"togglePlay()\">\n    <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n    <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n</svg>\n\n<svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" class=\"control-button\" (click)=\"goToEnd()\">\n    <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n    <polygon points=\"0,64 0,0 44.1,32 \" />\n</svg>\n\n<div class=\"spacer\"></div>\n\n<span class=\"hpe-icon\" *ngIf=\"mediaPlayerService.type !== 'audio'\" [class.hpe-expand]=\"!mediaPlayerService.fullscreen\" [class.hpe-contract]=\"mediaPlayerService.fullscreen\"\n    (click)=\"setFullscreen()\"></span>\n\n<ng-template #muteTooltip>{{ volume === 0 ? 'Unmute' : 'Mute' }}</ng-template>",
                    host: {
                        '[class.quiet]': 'quietMode || fullscreen'
                    }
                },] },
    ];
    /** @nocollapse */
    MediaPlayerControlsExtensionComponent.ctorParameters = function () { return []; };
    MediaPlayerControlsExtensionComponent.propDecorators = {
        "volumeIcon": [{ type: ViewChild, args: ['volumeIcon',] },],
        "volumeSlider": [{ type: ViewChild, args: ['volumeSlider',] },],
        "volumeContainer": [{ type: ViewChild, args: ['volumeContainer',] },],
        "dragMove": [{ type: HostListener, args: ['document:mousemove', ['$event'],] },],
        "dragEnd": [{ type: HostListener, args: ['document:mouseup',] },],
    };
    return MediaPlayerControlsExtensionComponent;
}(MediaPlayerBaseExtensionDirective));
export { MediaPlayerControlsExtensionComponent };
function MediaPlayerControlsExtensionComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerControlsExtensionComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerControlsExtensionComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MediaPlayerControlsExtensionComponent.propDecorators;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.playing;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.quietMode;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.fullscreen;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeActive;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeDragging;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeIcon;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeSlider;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype.volumeContainer;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype._volume;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype._previousVolume;
    /** @type {?} */
    MediaPlayerControlsExtensionComponent.prototype._onDestroy;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFtRHJCLGlFQUFpQzs7OzJCQUlsRSxLQUFLOzZCQUNILEtBQUs7K0JBQ0gsS0FBSzt3QkFNTCxFQUFFO2dDQUNGLEVBQUU7MkJBQ1AsSUFBSSxPQUFPLEVBQVE7OztJQUV4QyxzQkFBSSx5REFBTTs7OztRQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7Ozs7O1FBRUQsVUFBVyxLQUFhO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDdkM7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVB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aUNBQWlDO1NBQS9FLHFDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL3RpbWVyJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi4vYmFzZS1leHRlbnNpb24uZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tZWRpYS1wbGF5ZXItY29udHJvbHMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZvbHVtZS1jb250YWluZXJcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiICN2b2x1bWVDb250YWluZXIgW2NsYXNzLmFjdGl2ZV09XCJ2b2x1bWVBY3RpdmVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS1zbGlkZXItaWNvblwiICN2b2x1bWVJY29uPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtdm9sdW1lLW11dGVdPVwidm9sdW1lID09PSAwXCIgW2NsYXNzLmhwZS12b2x1bWUtbG93XT1cInZvbHVtZSA+IDAgJiYgdm9sdW1lIDw9IDcwXCIgW2NsYXNzLmhwZS12b2x1bWVdPVwidm9sdW1lID4gNzBcIiBbdXhUb29sdGlwXT1cIm11dGVUb29sdGlwXCIgKGNsaWNrKT1cInRvZ2dsZU11dGUoKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlci1ub2RlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlclwiICN2b2x1bWVTbGlkZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS10cmFjay1sb3dlclwiIFtzdHlsZS53aWR0aC4lXT1cInZvbHVtZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyLXRodW1iXCIgKG1vdXNlZG93bik9XCJkcmFnU3RhcnQoJGV2ZW50KVwiIFtzdHlsZS5sZWZ0LiVdPVwidm9sdW1lXCIgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24uQXJyb3dSaWdodCk9XCJ2b2x1bWUgPSB2b2x1bWUgKyAxMFwiIChrZXlkb3duLkFycm93TGVmdCk9XCJ2b2x1bWUgPSB2b2x1bWUgLSAxMFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuPHN2ZyB2aWV3Qm94PVwiMCAwIDUxLjUgNjRcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTdcIiBjbGFzcz1cImNvbnRyb2wtYnV0dG9uXCIgKGNsaWNrKT1cImdvVG9TdGFydCgpXCI+XG4gICAgPHJlY3QgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiNy41XCIgaGVpZ2h0PVwiNjRcIiAvPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjUxLjUsNjQgNTEuNSwwIDcuNCwzMiBcIiAvPlxuPC9zdmc+XG5cbjxzdmcgdmlld0JveD1cIjAgMCA0NSA2NFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyOVwiIGNsYXNzPVwiY29udHJvbC1idXR0b25cIiAqbmdJZj1cIiFwbGF5aW5nXCIgKGNsaWNrKT1cInRvZ2dsZVBsYXkoKVwiPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjAuNCwwIDAuNCw2NCA0NC42LDMyXCIgLz5cbjwvc3ZnPlxuXG48c3ZnIHZpZXdCb3g9XCIwIDAgNDMgNTYuOVwiIGNsYXNzPVwiY29udHJvbC1idXR0b25cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjlcIiAqbmdJZj1cInBsYXlpbmdcIiAoY2xpY2spPVwidG9nZ2xlUGxheSgpXCI+XG4gICAgPHJlY3QgeT1cIjAuMVwiIHdpZHRoPVwiMTUuN1wiIGhlaWdodD1cIjU2LjlcIiAvPlxuICAgIDxyZWN0IHg9XCIyNy4zXCIgeT1cIjAuMVwiIHdpZHRoPVwiMTUuN1wiIGhlaWdodD1cIjU2LjlcIiAvPlxuPC9zdmc+XG5cbjxzdmcgdmlld0JveD1cIjAgMCA1MS41IDY0XCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE3XCIgY2xhc3M9XCJjb250cm9sLWJ1dHRvblwiIChjbGljayk9XCJnb1RvRW5kKClcIj5cbiAgICA8cmVjdCB4PVwiNDQuMVwiIHk9XCIwXCIgd2lkdGg9XCI3LjVcIiBoZWlnaHQ9XCI2NFwiIC8+XG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMCw2NCAwLDAgNDQuMSwzMiBcIiAvPlxuPC9zdmc+XG5cbjxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuPHNwYW4gY2xhc3M9XCJocGUtaWNvblwiICpuZ0lmPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnR5cGUgIT09ICdhdWRpbydcIiBbY2xhc3MuaHBlLWV4cGFuZF09XCIhbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5cIiBbY2xhc3MuaHBlLWNvbnRyYWN0XT1cIm1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuXCJcbiAgICAoY2xpY2spPVwic2V0RnVsbHNjcmVlbigpXCI+PC9zcGFuPlxuXG48bmctdGVtcGxhdGUgI211dGVUb29sdGlwPnt7IHZvbHVtZSA9PT0gMCA/ICdVbm11dGUnIDogJ011dGUnIH19PC9uZy10ZW1wbGF0ZT5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAncXVpZXRNb2RlIHx8IGZ1bGxzY3JlZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllckNvbnRyb2xzRXh0ZW5zaW9uQ29tcG9uZW50IGV4dGVuZHMgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcGxheWluZzogYm9vbGVhbjtcbiAgICBxdWlldE1vZGU6IGJvb2xlYW47XG4gICAgZnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZvbHVtZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZvbHVtZURyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKCd2b2x1bWVJY29uJykgdm9sdW1lSWNvbjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd2b2x1bWVTbGlkZXInKSB2b2x1bWVTbGlkZXI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndm9sdW1lQ29udGFpbmVyJykgdm9sdW1lQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBfdm9sdW1lOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZSA9IDUwO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgdm9sdW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgfVxuXG4gICAgc2V0IHZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSAwICYmIHRoaXMuX3ZvbHVtZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWb2x1bWUgPSB0aGlzLl92b2x1bWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92b2x1bWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgMCksIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZSA9IHRoaXMuX3ZvbHVtZSAvIDEwMDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShfID0+IHRoaXMucGxheWluZyA9IHRydWUpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShfID0+IHRoaXMucGxheWluZyA9IGZhbHNlKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHF1aWV0TW9kZSA9PiB0aGlzLnF1aWV0TW9kZSA9IHF1aWV0TW9kZSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZUNoYW5nZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh2b2x1bWUgPT4gdGhpcy52b2x1bWUgPSB2b2x1bWUgKiAxMDApO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5pbml0RXZlbnQucGlwZShkZWJvdW5jZVRpbWUoMSksIGZpbHRlcihpbml0ID0+IGluaXQgPT09IHRydWUpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudm9sdW1lID0gdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lICogMTAwKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmdWxsc2NyZWVuID0+IHRoaXMuZnVsbHNjcmVlbiA9IGZ1bGxzY3JlZW4pO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlZW50ZXIkID0gZnJvbUV2ZW50KHRoaXMudm9sdW1lSWNvbi5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgICBjb25zdCBtb3VzZWVudGVyQ29udGFpbmVyJCA9IGZyb21FdmVudCh0aGlzLnZvbHVtZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgICBjb25zdCBtb3VzZWxlYXZlQ29udGFpbmVyJCA9IGZyb21FdmVudCh0aGlzLnZvbHVtZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScpO1xuXG4gICAgICAgIG1vdXNlZW50ZXIkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnZvbHVtZUFjdGl2ZSA9IHRydWUpO1xuICAgICAgICBtb3VzZWxlYXZlQ29udGFpbmVyJC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRpbWVyKDE1MDApLnBpcGUodGFrZVVudGlsKG1vdXNlZW50ZXJDb250YWluZXIkKSkpLFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWVBY3RpdmUgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU11dGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnZvbHVtZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB0aGlzLl9wcmV2aW91c1ZvbHVtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudm9sdW1lID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVBsYXkoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBsYXlpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50b2dnbGVGdWxsc2NyZWVuKCk7XG4gICAgfVxuXG4gICAgZ29Ub1N0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxuXG4gICAgZ29Ub0VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuY3VycmVudFRpbWUgPSB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbjtcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy52b2x1bWVEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgdGh1bWIgPSBldmVudC50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIHRodW1iLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgICBkcmFnTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudm9sdW1lRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2xpZGVyID0gdGhpcy52b2x1bWVTbGlkZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgY29uc3QgYm91bmRzID0gc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihib3VuZHMud2lkdGgsIE1hdGgubWF4KDAsIGV2ZW50LnBhZ2VYIC0gYm91bmRzLmxlZnQpKTtcblxuICAgICAgICAvLyBjb252ZXJ0IHRvIGEgcGVyY2VudGFnZVxuICAgICAgICB0aGlzLnZvbHVtZSA9ICh4IC8gYm91bmRzLndpZHRoKSAqIDEwMDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZXVwJylcbiAgICBkcmFnRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZvbHVtZURyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG59Il19