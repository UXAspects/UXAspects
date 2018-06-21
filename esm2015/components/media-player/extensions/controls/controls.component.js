/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { timer } from 'rxjs/observable/timer';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
export class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.fullscreen = false;
        this.volumeActive = false;
        this.volumeDragging = false;
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
        this.mediaPlayerService.playEvent.pipe(takeUntil(this._onDestroy)).subscribe(_ => this.playing = true);
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(_ => this.playing = false);
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.pipe(debounceTime(1), filter(init => init === true), takeUntil(this._onDestroy)).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(fullscreen => this.fullscreen = fullscreen);
        const /** @type {?} */ mouseenter$ = fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        const /** @type {?} */ mouseenterContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        const /** @type {?} */ mouseleaveContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
        mouseenter$.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = true);
        mouseleaveContainer$.pipe(switchMap(() => timer(1500).pipe(takeUntil(mouseenterContainer$))), takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = false);
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
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        }
        else {
            this.volume = 0;
        }
    }
    /**
     * @return {?}
     */
    togglePlay() {
        if (this.playing) {
            this.mediaPlayerService.pause();
        }
        else {
            this.mediaPlayerService.play();
        }
    }
    /**
     * @return {?}
     */
    setFullscreen() {
        this.mediaPlayerService.toggleFullscreen();
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
     * @param {?} event
     * @return {?}
     */
    dragStart(event) {
        event.preventDefault();
        this.volumeDragging = true;
        const /** @type {?} */ thumb = /** @type {?} */ (event.target);
        thumb.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragMove(event) {
        if (!this.volumeDragging) {
            return;
        }
        event.preventDefault();
        const /** @type {?} */ slider = /** @type {?} */ (this.volumeSlider.nativeElement);
        const /** @type {?} */ bounds = slider.getBoundingClientRect();
        const /** @type {?} */ x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));
        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    }
    /**
     * @return {?}
     */
    dragEnd() {
        this.volumeDragging = false;
    }
}
MediaPlayerControlsExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-controls',
                template: `<div class="volume-container">

    <div class="volume-slider-container" #volumeContainer [class.active]="volumeActive">
        <div class="volume-slider-icon" #volumeIcon>
            <span class="hpe-icon" [class.hpe-volume-mute]="volume === 0" [class.hpe-volume-low]="volume > 0 && volume <= 70" [class.hpe-volume]="volume > 70" [uxTooltip]="muteTooltip" (click)="toggleMute()"></span>
        </div>
        
        <div class="volume-slider-node">
            <div class="volume-slider" #volumeSlider>
                <div class="volume-track-lower" [style.width.%]="volume"></div>
                <div class="volume-slider-thumb" (mousedown)="dragStart($event)" [style.left.%]="volume" tabindex="0" (keydown.ArrowRight)="volume = volume + 10" (keydown.ArrowLeft)="volume = volume - 10"></div>
            </div>
        </div>
    </div>
</div>

<div class="spacer"></div>

<svg viewBox="0 0 51.5 64" width="14" height="17" class="control-button" (click)="goToStart()">
    <rect x="0" y="0" width="7.5" height="64" />
    <polygon points="51.5,64 51.5,0 7.4,32 " />
</svg>

<svg viewBox="0 0 45 64" width="20" height="29" class="control-button" *ngIf="!playing" (click)="togglePlay()">
    <polygon points="0.4,0 0.4,64 44.6,32" />
</svg>

<svg viewBox="0 0 43 56.9" class="control-button" width="20" height="29" *ngIf="playing" (click)="togglePlay()">
    <rect y="0.1" width="15.7" height="56.9" />
    <rect x="27.3" y="0.1" width="15.7" height="56.9" />
</svg>

<svg viewBox="0 0 51.5 64" width="14" height="17" class="control-button" (click)="goToEnd()">
    <rect x="44.1" y="0" width="7.5" height="64" />
    <polygon points="0,64 0,0 44.1,32 " />
</svg>

<div class="spacer"></div>

<span class="hpe-icon" *ngIf="mediaPlayerService.type !== 'audio'" [class.hpe-expand]="!mediaPlayerService.fullscreen" [class.hpe-contract]="mediaPlayerService.fullscreen"
    (click)="setFullscreen()"></span>

<ng-template #muteTooltip>{{ volume === 0 ? 'Unmute' : 'Mute' }}</ng-template>`,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBbURoRixNQUFNLDRDQUE2QyxTQUFRLGlDQUFpQzs7OzBCQUlsRSxLQUFLOzRCQUNILEtBQUs7OEJBQ0gsS0FBSzt1QkFNTCxFQUFFOytCQUNGLEVBQUU7MEJBQ1AsSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRXhDLElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQUksTUFBTSxDQUFDLEtBQWE7UUFFcEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxH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QyxZQUFZLENBQUMsYUFBK0IsQ0FBQSxDQUFDO1FBQ2pFLHVCQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU5Qyx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7Ozs7SUFJM0MsT0FBTztRQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDOzs7O1lBOUpuQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0VBMENpRTtnQkFDM0UsSUFBSSxFQUFFO29CQUNGLGVBQWUsRUFBRSx5QkFBeUI7aUJBQzdDO2FBQ0o7Ozs7MkJBU0ksU0FBUyxTQUFDLFlBQVk7NkJBQ3RCLFNBQVMsU0FBQyxjQUFjO2dDQUN4QixTQUFTLFNBQUMsaUJBQWlCO3lCQWdGM0IsWUFBWSxTQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDO3dCQWlCN0MsWUFBWSxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL3RpbWVyJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi4vYmFzZS1leHRlbnNpb24uZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tZWRpYS1wbGF5ZXItY29udHJvbHMnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZvbHVtZS1jb250YWluZXJcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyLWNvbnRhaW5lclwiICN2b2x1bWVDb250YWluZXIgW2NsYXNzLmFjdGl2ZV09XCJ2b2x1bWVBY3RpdmVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS1zbGlkZXItaWNvblwiICN2b2x1bWVJY29uPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtdm9sdW1lLW11dGVdPVwidm9sdW1lID09PSAwXCIgW2NsYXNzLmhwZS12b2x1bWUtbG93XT1cInZvbHVtZSA+IDAgJiYgdm9sdW1lIDw9IDcwXCIgW2NsYXNzLmhwZS12b2x1bWVdPVwidm9sdW1lID4gNzBcIiBbdXhUb29sdGlwXT1cIm11dGVUb29sdGlwXCIgKGNsaWNrKT1cInRvZ2dsZU11dGUoKVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlci1ub2RlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlclwiICN2b2x1bWVTbGlkZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS10cmFjay1sb3dlclwiIFtzdHlsZS53aWR0aC4lXT1cInZvbHVtZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyLXRodW1iXCIgKG1vdXNlZG93bik9XCJkcmFnU3RhcnQoJGV2ZW50KVwiIFtzdHlsZS5sZWZ0LiVdPVwidm9sdW1lXCIgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24uQXJyb3dSaWdodCk9XCJ2b2x1bWUgPSB2b2x1bWUgKyAxMFwiIChrZXlkb3duLkFycm93TGVmdCk9XCJ2b2x1bWUgPSB2b2x1bWUgLSAxMFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuPHN2ZyB2aWV3Qm94PVwiMCAwIDUxLjUgNjRcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTdcIiBjbGFzcz1cImNvbnRyb2wtYnV0dG9uXCIgKGNsaWNrKT1cImdvVG9TdGFydCgpXCI+XG4gICAgPHJlY3QgeD1cIjBcIiB5PVwiMFwiIHdpZHRoPVwiNy41XCIgaGVpZ2h0PVwiNjRcIiAvPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjUxLjUsNjQgNTEuNSwwIDcuNCwzMiBcIiAvPlxuPC9zdmc+XG5cbjxzdmcgdmlld0JveD1cIjAgMCA0NSA2NFwiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyOVwiIGNsYXNzPVwiY29udHJvbC1idXR0b25cIiAqbmdJZj1cIiFwbGF5aW5nXCIgKGNsaWNrKT1cInRvZ2dsZVBsYXkoKVwiPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjAuNCwwIDAuNCw2NCA0NC42LDMyXCIgLz5cbjwvc3ZnPlxuXG48c3ZnIHZpZXdCb3g9XCIwIDAgNDMgNTYuOVwiIGNsYXNzPVwiY29udHJvbC1idXR0b25cIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjlcIiAqbmdJZj1cInBsYXlpbmdcIiAoY2xpY2spPVwidG9nZ2xlUGxheSgpXCI+XG4gICAgPHJlY3QgeT1cIjAuMVwiIHdpZHRoPVwiMTUuN1wiIGhlaWdodD1cIjU2LjlcIiAvPlxuICAgIDxyZWN0IHg9XCIyNy4zXCIgeT1cIjAuMVwiIHdpZHRoPVwiMTUuN1wiIGhlaWdodD1cIjU2LjlcIiAvPlxuPC9zdmc+XG5cbjxzdmcgdmlld0JveD1cIjAgMCA1MS41IDY0XCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE3XCIgY2xhc3M9XCJjb250cm9sLWJ1dHRvblwiIChjbGljayk9XCJnb1RvRW5kKClcIj5cbiAgICA8cmVjdCB4PVwiNDQuMVwiIHk9XCIwXCIgd2lkdGg9XCI3LjVcIiBoZWlnaHQ9XCI2NFwiIC8+XG4gICAgPHBvbHlnb24gcG9pbnRzPVwiMCw2NCAwLDAgNDQuMSwzMiBcIiAvPlxuPC9zdmc+XG5cbjxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuPHNwYW4gY2xhc3M9XCJocGUtaWNvblwiICpuZ0lmPVwibWVkaWFQbGF5ZXJTZXJ2aWNlLnR5cGUgIT09ICdhdWRpbydcIiBbY2xhc3MuaHBlLWV4cGFuZF09XCIhbWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5cIiBbY2xhc3MuaHBlLWNvbnRyYWN0XT1cIm1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuXCJcbiAgICAoY2xpY2spPVwic2V0RnVsbHNjcmVlbigpXCI+PC9zcGFuPlxuXG48bmctdGVtcGxhdGUgI211dGVUb29sdGlwPnt7IHZvbHVtZSA9PT0gMCA/ICdVbm11dGUnIDogJ011dGUnIH19PC9uZy10ZW1wbGF0ZT5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAncXVpZXRNb2RlIHx8IGZ1bGxzY3JlZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllckNvbnRyb2xzRXh0ZW5zaW9uQ29tcG9uZW50IGV4dGVuZHMgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcGxheWluZzogYm9vbGVhbjtcbiAgICBxdWlldE1vZGU6IGJvb2xlYW47XG4gICAgZnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZvbHVtZUFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHZvbHVtZURyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAVmlld0NoaWxkKCd2b2x1bWVJY29uJykgdm9sdW1lSWNvbjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd2b2x1bWVTbGlkZXInKSB2b2x1bWVTbGlkZXI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndm9sdW1lQ29udGFpbmVyJykgdm9sdW1lQ29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBfdm9sdW1lOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIF9wcmV2aW91c1ZvbHVtZSA9IDUwO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBnZXQgdm9sdW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgfVxuXG4gICAgc2V0IHZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSAwICYmIHRoaXMuX3ZvbHVtZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNWb2x1bWUgPSB0aGlzLl92b2x1bWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl92b2x1bWUgPSBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgMCksIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZSA9IHRoaXMuX3ZvbHVtZSAvIDEwMDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShfID0+IHRoaXMucGxheWluZyA9IHRydWUpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShfID0+IHRoaXMucGxheWluZyA9IGZhbHNlKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHF1aWV0TW9kZSA9PiB0aGlzLnF1aWV0TW9kZSA9IHF1aWV0TW9kZSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZUNoYW5nZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSh2b2x1bWUgPT4gdGhpcy52b2x1bWUgPSB2b2x1bWUgKiAxMDApO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5pbml0RXZlbnQucGlwZShkZWJvdW5jZVRpbWUoMSksIGZpbHRlcihpbml0ID0+IGluaXQgPT09IHRydWUpLCB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMudm9sdW1lID0gdGhpcy5tZWRpYVBsYXllclNlcnZpY2Uudm9sdW1lICogMTAwKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmdWxsc2NyZWVuID0+IHRoaXMuZnVsbHNjcmVlbiA9IGZ1bGxzY3JlZW4pO1xuXG4gICAgICAgIGNvbnN0IG1vdXNlZW50ZXIkID0gZnJvbUV2ZW50KHRoaXMudm9sdW1lSWNvbi5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgICBjb25zdCBtb3VzZWVudGVyQ29udGFpbmVyJCA9IGZyb21FdmVudCh0aGlzLnZvbHVtZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpO1xuICAgICAgICBjb25zdCBtb3VzZWxlYXZlQ29udGFpbmVyJCA9IGZyb21FdmVudCh0aGlzLnZvbHVtZUNvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScpO1xuXG4gICAgICAgIG1vdXNlZW50ZXIkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnZvbHVtZUFjdGl2ZSA9IHRydWUpO1xuICAgICAgICBtb3VzZWxlYXZlQ29udGFpbmVyJC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRpbWVyKDE1MDApLnBpcGUodGFrZVVudGlsKG1vdXNlZW50ZXJDb250YWluZXIkKSkpLFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWVBY3RpdmUgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU11dGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnZvbHVtZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB0aGlzLl9wcmV2aW91c1ZvbHVtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudm9sdW1lID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVBsYXkoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBsYXlpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50b2dnbGVGdWxsc2NyZWVuKCk7XG4gICAgfVxuXG4gICAgZ29Ub1N0YXJ0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxuXG4gICAgZ29Ub0VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuY3VycmVudFRpbWUgPSB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbjtcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy52b2x1bWVEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgdGh1bWIgPSBldmVudC50YXJnZXQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIHRodW1iLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcbiAgICBkcmFnTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudm9sdW1lRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2xpZGVyID0gdGhpcy52b2x1bWVTbGlkZXIubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgY29uc3QgYm91bmRzID0gc2xpZGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IHggPSBNYXRoLm1pbihib3VuZHMud2lkdGgsIE1hdGgubWF4KDAsIGV2ZW50LnBhZ2VYIC0gYm91bmRzLmxlZnQpKTtcblxuICAgICAgICAvLyBjb252ZXJ0IHRvIGEgcGVyY2VudGFnZVxuICAgICAgICB0aGlzLnZvbHVtZSA9ICh4IC8gYm91bmRzLndpZHRoKSAqIDEwMDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZXVwJylcbiAgICBkcmFnRW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZvbHVtZURyYWdnaW5nID0gZmFsc2U7XG4gICAgfVxuXG59Il19