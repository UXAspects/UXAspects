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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUFtRHJCLGlFQUFpQzs7OzJCQUlsRSxLQUFLOzZCQUNILEtBQUs7K0JBQ0gsS0FBSzt3QkFNTCxFQUFFO2dDQUNGLEVBQUU7MkJBQ1AsSUFBSSxPQUFPLEVBQVE7OztJQUV4QyxzQkFBSSx5REFBTTs7OztRQUFWO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7Ozs7O1FBRUQsVUFBVyxLQUFhO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDdkM7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVB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Q0FBaUM7U0FBL0UscUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgdGltZXIgfSBmcm9tICdyeGpzL29ic2VydmFibGUvdGltZXInO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBmaWx0ZXIsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgfSBmcm9tICcuLi9iYXNlLWV4dGVuc2lvbi5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1lZGlhLXBsYXllci1jb250cm9scycsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidm9sdW1lLWNvbnRhaW5lclwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIgI3ZvbHVtZUNvbnRhaW5lciBbY2xhc3MuYWN0aXZlXT1cInZvbHVtZUFjdGl2ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlci1pY29uXCIgI3ZvbHVtZUljb24+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uXCIgW2NsYXNzLmhwZS12b2x1bWUtbXV0ZV09XCJ2b2x1bWUgPT09IDBcIiBbY2xhc3MuaHBlLXZvbHVtZS1sb3ddPVwidm9sdW1lID4gMCAmJiB2b2x1bWUgPD0gNzBcIiBbY2xhc3MuaHBlLXZvbHVtZV09XCJ2b2x1bWUgPiA3MFwiIFt1eFRvb2x0aXBdPVwibXV0ZVRvb2x0aXBcIiAoY2xpY2spPVwidG9nZ2xlTXV0ZSgpXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyLW5vZGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyXCIgI3ZvbHVtZVNsaWRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXRyYWNrLWxvd2VyXCIgW3N0eWxlLndpZHRoLiVdPVwidm9sdW1lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS1zbGlkZXItdGh1bWJcIiAobW91c2Vkb3duKT1cImRyYWdTdGFydCgkZXZlbnQpXCIgW3N0eWxlLmxlZnQuJV09XCJ2b2x1bWVcIiB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bi5BcnJvd1JpZ2h0KT1cInZvbHVtZSA9IHZvbHVtZSArIDEwXCIgKGtleWRvd24uQXJyb3dMZWZ0KT1cInZvbHVtZSA9IHZvbHVtZSAtIDEwXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxuXG48c3ZnIHZpZXdCb3g9XCIwIDAgNTEuNSA2NFwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxN1wiIGNsYXNzPVwiY29udHJvbC1idXR0b25cIiAoY2xpY2spPVwiZ29Ub1N0YXJ0KClcIj5cbiAgICA8cmVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCI3LjVcIiBoZWlnaHQ9XCI2NFwiIC8+XG4gICAgPHBvbHlnb24gcG9pbnRzPVwiNTEuNSw2NCA1MS41LDAgNy40LDMyIFwiIC8+XG48L3N2Zz5cblxuPHN2ZyB2aWV3Qm94PVwiMCAwIDQ1IDY0XCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjI5XCIgY2xhc3M9XCJjb250cm9sLWJ1dHRvblwiICpuZ0lmPVwiIXBsYXlpbmdcIiAoY2xpY2spPVwidG9nZ2xlUGxheSgpXCI+XG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMC40LDAgMC40LDY0IDQ0LjYsMzJcIiAvPlxuPC9zdmc+XG5cbjxzdmcgdmlld0JveD1cIjAgMCA0MyA1Ni45XCIgY2xhc3M9XCJjb250cm9sLWJ1dHRvblwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyOVwiICpuZ0lmPVwicGxheWluZ1wiIChjbGljayk9XCJ0b2dnbGVQbGF5KClcIj5cbiAgICA8cmVjdCB5PVwiMC4xXCIgd2lkdGg9XCIxNS43XCIgaGVpZ2h0PVwiNTYuOVwiIC8+XG4gICAgPHJlY3QgeD1cIjI3LjNcIiB5PVwiMC4xXCIgd2lkdGg9XCIxNS43XCIgaGVpZ2h0PVwiNTYuOVwiIC8+XG48L3N2Zz5cblxuPHN2ZyB2aWV3Qm94PVwiMCAwIDUxLjUgNjRcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTdcIiBjbGFzcz1cImNvbnRyb2wtYnV0dG9uXCIgKGNsaWNrKT1cImdvVG9FbmQoKVwiPlxuICAgIDxyZWN0IHg9XCI0NC4xXCIgeT1cIjBcIiB3aWR0aD1cIjcuNVwiIGhlaWdodD1cIjY0XCIgLz5cbiAgICA8cG9seWdvbiBwb2ludHM9XCIwLDY0IDAsMCA0NC4xLDMyIFwiIC8+XG48L3N2Zz5cblxuPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxuXG48c3BhbiBjbGFzcz1cImhwZS1pY29uXCIgKm5nSWY9XCJtZWRpYVBsYXllclNlcnZpY2UudHlwZSAhPT0gJ2F1ZGlvJ1wiIFtjbGFzcy5ocGUtZXhwYW5kXT1cIiFtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlblwiIFtjbGFzcy5ocGUtY29udHJhY3RdPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5cIlxuICAgIChjbGljayk9XCJzZXRGdWxsc2NyZWVuKClcIj48L3NwYW4+XG5cbjxuZy10ZW1wbGF0ZSAjbXV0ZVRvb2x0aXA+e3sgdm9sdW1lID09PSAwID8gJ1VubXV0ZScgOiAnTXV0ZScgfX08L25nLXRlbXBsYXRlPmAsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnF1aWV0XSc6ICdxdWlldE1vZGUgfHwgZnVsbHNjcmVlbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyQ29udHJvbHNFeHRlbnNpb25Db21wb25lbnQgZXh0ZW5kcyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwbGF5aW5nOiBib29sZWFuO1xuICAgIHF1aWV0TW9kZTogYm9vbGVhbjtcbiAgICBmdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgdm9sdW1lQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gICAgdm9sdW1lRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBWaWV3Q2hpbGQoJ3ZvbHVtZUljb24nKSB2b2x1bWVJY29uOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3ZvbHVtZVNsaWRlcicpIHZvbHVtZVNsaWRlcjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd2b2x1bWVDb250YWluZXInKSB2b2x1bWVDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIF92b2x1bWU6IG51bWJlciA9IDUwO1xuICAgIHByaXZhdGUgX3ByZXZpb3VzVm9sdW1lID0gNTA7XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGdldCB2b2x1bWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcbiAgICB9XG5cbiAgICBzZXQgdm9sdW1lKHZhbHVlOiBudW1iZXIpIHtcblxuICAgICAgICBpZiAodmFsdWUgPT09IDAgJiYgdGhpcy5fdm9sdW1lICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c1ZvbHVtZSA9IHRoaXMuX3ZvbHVtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3ZvbHVtZSA9IE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCAwKSwgMTAwKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lID0gdGhpcy5fdm9sdW1lIC8gMTAwO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5RXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKF8gPT4gdGhpcy5wbGF5aW5nID0gdHJ1ZSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKF8gPT4gdGhpcy5wbGF5aW5nID0gZmFsc2UpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5xdWlldE1vZGVFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUocXVpZXRNb2RlID0+IHRoaXMucXVpZXRNb2RlID0gcXVpZXRNb2RlKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lQ2hhbmdlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHZvbHVtZSA9PiB0aGlzLnZvbHVtZSA9IHZvbHVtZSAqIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmluaXRFdmVudC5waXBlKGRlYm91bmNlVGltZSgxKSwgZmlsdGVyKGluaXQgPT4gaW5pdCA9PT0gdHJ1ZSksIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWUgPSB0aGlzLm1lZGlhUGxheWVyU2VydmljZS52b2x1bWUgKiAxMDApO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGZ1bGxzY3JlZW4gPT4gdGhpcy5mdWxsc2NyZWVuID0gZnVsbHNjcmVlbik7XG5cbiAgICAgICAgY29uc3QgbW91c2VlbnRlciQgPSBmcm9tRXZlbnQodGhpcy52b2x1bWVJY29uLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJyk7XG4gICAgICAgIGNvbnN0IG1vdXNlZW50ZXJDb250YWluZXIkID0gZnJvbUV2ZW50KHRoaXMudm9sdW1lQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJyk7XG4gICAgICAgIGNvbnN0IG1vdXNlbGVhdmVDb250YWluZXIkID0gZnJvbUV2ZW50KHRoaXMudm9sdW1lQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWxlYXZlJyk7XG5cbiAgICAgICAgbW91c2VlbnRlciQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudm9sdW1lQWN0aXZlID0gdHJ1ZSk7XG4gICAgICAgIG1vdXNlbGVhdmVDb250YWluZXIkLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGltZXIoMTUwMCkucGlwZSh0YWtlVW50aWwobW91c2VlbnRlckNvbnRhaW5lciQpKSksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLnZvbHVtZUFjdGl2ZSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTXV0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudm9sdW1lID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnZvbHVtZSA9IHRoaXMuX3ByZXZpb3VzVm9sdW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlUGxheSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWluZykge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGF1c2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICB9XG5cbiAgICBnb1RvU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gMDtcbiAgICB9XG5cbiAgICBnb1RvRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5jdXJyZW50VGltZSA9IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uO1xuICAgIH1cblxuICAgIGRyYWdTdGFydChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnZvbHVtZURyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCB0aHVtYiA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgdGh1bWIuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICAgIGRyYWdNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy52b2x1bWVEcmFnZ2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBzbGlkZXIgPSB0aGlzLnZvbHVtZVNsaWRlci5uYXRpdmVFbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBjb25zdCBib3VuZHMgPSBzbGlkZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgY29uc3QgeCA9IE1hdGgubWluKGJvdW5kcy53aWR0aCwgTWF0aC5tYXgoMCwgZXZlbnQucGFnZVggLSBib3VuZHMubGVmdCkpO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdG8gYSBwZXJjZW50YWdlXG4gICAgICAgIHRoaXMudm9sdW1lID0gKHggLyBib3VuZHMud2lkdGgpICogMTAwO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNldXAnKVxuICAgIGRyYWdFbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudm9sdW1lRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn0iXX0=