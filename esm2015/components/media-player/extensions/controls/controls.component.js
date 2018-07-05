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
MediaPlayerControlsExtensionComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvY29udHJvbHMvY29udHJvbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBbURoRixNQUFNLDRDQUE2QyxTQUFRLGlDQUFpQzs7OzBCQUlsRSxLQUFLOzRCQUNILEtBQUs7OEJBQ0gsS0FBSzt1QkFNTCxFQUFFOytCQUNGLEVBQUU7MEJBQ1AsSUFBSSxPQUFPLEVBQVE7Ozs7O0lBRXhDLElBQUksTUFBTTtRQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3ZCOzs7OztJQUVELElBQUksTUFBTSxDQUFDLEtBQWE7UUFFcEIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7S0FDdkQ7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3pHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUM7UUFDM0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2TCxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBRS9ILHVCQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDM0UsdUJBQU0sb0JBQW9CLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pGLHVCQUFNLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6RixXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZGLG9CQUFvQixDQUFDLElBQUksQ0FDckIsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQ2xFLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQzdCLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQztLQUNoRDs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7SUFFRCxVQUFVO1FBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUN0QztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbkI7S0FDSjs7OztJQUVELFVBQVU7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2xDO0tBQ0o7Ozs7SUFFRCxhQUFhO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7S0FDOUM7Ozs7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FDM0M7Ozs7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO0tBQzFFOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFpQjtRQUN2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFFM0IsdUJBQU0sS0FBSyxxQkFBRyxLQUFLLENBQUMsTUFBd0IsQ0FBQSxDQUFDO1FBQzdDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNqQjs7Ozs7SUFHRCxRQUFRLENBQUMsS0FBaUI7UUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUM7U0FDVjtRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2Qix1QkFBTSxNQUFNLHFCQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBK0IsQ0FBQSxDQUFDO1FBQ2pFLHVCQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU5Qyx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBR3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQzs7Ozs7SUFJM0MsT0FBTztRQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDOzs7O1lBOUpuQyxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0VBMENpRTtnQkFDM0UsSUFBSSxFQUFFO29CQUNGLGVBQWUsRUFBRSx5QkFBeUI7aUJBQzdDO2FBQ0o7Ozs7OzJCQVNJLFNBQVMsU0FBQyxZQUFZOzZCQUN0QixTQUFTLFNBQUMsY0FBYztnQ0FDeEIsU0FBUyxTQUFDLGlCQUFpQjt5QkFnRjNCLFlBQVksU0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFpQjdDLFlBQVksU0FBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyB0aW1lciB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS90aW1lcic7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2Jhc2UtZXh0ZW5zaW9uLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWVkaWEtcGxheWVyLWNvbnRyb2xzJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2b2x1bWUtY29udGFpbmVyXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlci1jb250YWluZXJcIiAjdm9sdW1lQ29udGFpbmVyIFtjbGFzcy5hY3RpdmVdPVwidm9sdW1lQWN0aXZlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtc2xpZGVyLWljb25cIiAjdm9sdW1lSWNvbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb25cIiBbY2xhc3MuaHBlLXZvbHVtZS1tdXRlXT1cInZvbHVtZSA9PT0gMFwiIFtjbGFzcy5ocGUtdm9sdW1lLWxvd109XCJ2b2x1bWUgPiAwICYmIHZvbHVtZSA8PSA3MFwiIFtjbGFzcy5ocGUtdm9sdW1lXT1cInZvbHVtZSA+IDcwXCIgW3V4VG9vbHRpcF09XCJtdXRlVG9vbHRpcFwiIChjbGljayk9XCJ0b2dnbGVNdXRlKClcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS1zbGlkZXItbm9kZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZS1zbGlkZXJcIiAjdm9sdW1lU2xpZGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2b2x1bWUtdHJhY2stbG93ZXJcIiBbc3R5bGUud2lkdGguJV09XCJ2b2x1bWVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lLXNsaWRlci10aHVtYlwiIChtb3VzZWRvd24pPVwiZHJhZ1N0YXJ0KCRldmVudClcIiBbc3R5bGUubGVmdC4lXT1cInZvbHVtZVwiIHRhYmluZGV4PVwiMFwiIChrZXlkb3duLkFycm93UmlnaHQpPVwidm9sdW1lID0gdm9sdW1lICsgMTBcIiAoa2V5ZG93bi5BcnJvd0xlZnQpPVwidm9sdW1lID0gdm9sdW1lIC0gMTBcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XG5cbjxzdmcgdmlld0JveD1cIjAgMCA1MS41IDY0XCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE3XCIgY2xhc3M9XCJjb250cm9sLWJ1dHRvblwiIChjbGljayk9XCJnb1RvU3RhcnQoKVwiPlxuICAgIDxyZWN0IHg9XCIwXCIgeT1cIjBcIiB3aWR0aD1cIjcuNVwiIGhlaWdodD1cIjY0XCIgLz5cbiAgICA8cG9seWdvbiBwb2ludHM9XCI1MS41LDY0IDUxLjUsMCA3LjQsMzIgXCIgLz5cbjwvc3ZnPlxuXG48c3ZnIHZpZXdCb3g9XCIwIDAgNDUgNjRcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjlcIiBjbGFzcz1cImNvbnRyb2wtYnV0dG9uXCIgKm5nSWY9XCIhcGxheWluZ1wiIChjbGljayk9XCJ0b2dnbGVQbGF5KClcIj5cbiAgICA8cG9seWdvbiBwb2ludHM9XCIwLjQsMCAwLjQsNjQgNDQuNiwzMlwiIC8+XG48L3N2Zz5cblxuPHN2ZyB2aWV3Qm94PVwiMCAwIDQzIDU2LjlcIiBjbGFzcz1cImNvbnRyb2wtYnV0dG9uXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjI5XCIgKm5nSWY9XCJwbGF5aW5nXCIgKGNsaWNrKT1cInRvZ2dsZVBsYXkoKVwiPlxuICAgIDxyZWN0IHk9XCIwLjFcIiB3aWR0aD1cIjE1LjdcIiBoZWlnaHQ9XCI1Ni45XCIgLz5cbiAgICA8cmVjdCB4PVwiMjcuM1wiIHk9XCIwLjFcIiB3aWR0aD1cIjE1LjdcIiBoZWlnaHQ9XCI1Ni45XCIgLz5cbjwvc3ZnPlxuXG48c3ZnIHZpZXdCb3g9XCIwIDAgNTEuNSA2NFwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxN1wiIGNsYXNzPVwiY29udHJvbC1idXR0b25cIiAoY2xpY2spPVwiZ29Ub0VuZCgpXCI+XG4gICAgPHJlY3QgeD1cIjQ0LjFcIiB5PVwiMFwiIHdpZHRoPVwiNy41XCIgaGVpZ2h0PVwiNjRcIiAvPlxuICAgIDxwb2x5Z29uIHBvaW50cz1cIjAsNjQgMCwwIDQ0LjEsMzIgXCIgLz5cbjwvc3ZnPlxuXG48ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XG5cbjxzcGFuIGNsYXNzPVwiaHBlLWljb25cIiAqbmdJZj1cIm1lZGlhUGxheWVyU2VydmljZS50eXBlICE9PSAnYXVkaW8nXCIgW2NsYXNzLmhwZS1leHBhbmRdPVwiIW1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuXCIgW2NsYXNzLmhwZS1jb250cmFjdF09XCJtZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlblwiXG4gICAgKGNsaWNrKT1cInNldEZ1bGxzY3JlZW4oKVwiPjwvc3Bhbj5cblxuPG5nLXRlbXBsYXRlICNtdXRlVG9vbHRpcD57eyB2b2x1bWUgPT09IDAgPyAnVW5tdXRlJyA6ICdNdXRlJyB9fTwvbmctdGVtcGxhdGU+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MucXVpZXRdJzogJ3F1aWV0TW9kZSB8fCBmdWxsc2NyZWVuJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJDb250cm9sc0V4dGVuc2lvbkNvbXBvbmVudCBleHRlbmRzIE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHBsYXlpbmc6IGJvb2xlYW47XG4gICAgcXVpZXRNb2RlOiBib29sZWFuO1xuICAgIGZ1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2b2x1bWVBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICB2b2x1bWVEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQFZpZXdDaGlsZCgndm9sdW1lSWNvbicpIHZvbHVtZUljb246IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndm9sdW1lU2xpZGVyJykgdm9sdW1lU2xpZGVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3ZvbHVtZUNvbnRhaW5lcicpIHZvbHVtZUNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgX3ZvbHVtZTogbnVtYmVyID0gNTA7XG4gICAgcHJpdmF0ZSBfcHJldmlvdXNWb2x1bWUgPSA1MDtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgZ2V0IHZvbHVtZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdm9sdW1lO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUodmFsdWU6IG51bWJlcikge1xuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gMCAmJiB0aGlzLl92b2x1bWUgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzVm9sdW1lID0gdGhpcy5fdm9sdW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdm9sdW1lID0gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIDApLCAxMDApO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS52b2x1bWUgPSB0aGlzLl92b2x1bWUgLyAxMDA7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBsYXlFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoXyA9PiB0aGlzLnBsYXlpbmcgPSB0cnVlKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGF1c2VFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoXyA9PiB0aGlzLnBsYXlpbmcgPSBmYWxzZSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnF1aWV0TW9kZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShxdWlldE1vZGUgPT4gdGhpcy5xdWlldE1vZGUgPSBxdWlldE1vZGUpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS52b2x1bWVDaGFuZ2VFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUodm9sdW1lID0+IHRoaXMudm9sdW1lID0gdm9sdW1lICogMTAwKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuaW5pdEV2ZW50LnBpcGUoZGVib3VuY2VUaW1lKDEpLCBmaWx0ZXIoaW5pdCA9PiBpbml0ID09PSB0cnVlKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnZvbHVtZSA9IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnZvbHVtZSAqIDEwMCk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5FdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZnVsbHNjcmVlbiA9PiB0aGlzLmZ1bGxzY3JlZW4gPSBmdWxsc2NyZWVuKTtcblxuICAgICAgICBjb25zdCBtb3VzZWVudGVyJCA9IGZyb21FdmVudCh0aGlzLnZvbHVtZUljb24ubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgICAgY29uc3QgbW91c2VlbnRlckNvbnRhaW5lciQgPSBmcm9tRXZlbnQodGhpcy52b2x1bWVDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInKTtcbiAgICAgICAgY29uc3QgbW91c2VsZWF2ZUNvbnRhaW5lciQgPSBmcm9tRXZlbnQodGhpcy52b2x1bWVDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnKTtcblxuICAgICAgICBtb3VzZWVudGVyJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy52b2x1bWVBY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgbW91c2VsZWF2ZUNvbnRhaW5lciQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aW1lcigxNTAwKS5waXBlKHRha2VVbnRpbChtb3VzZWVudGVyQ29udGFpbmVyJCkpKSxcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMudm9sdW1lQWN0aXZlID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB0b2dnbGVNdXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy52b2x1bWUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudm9sdW1lID0gdGhpcy5fcHJldmlvdXNWb2x1bWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZvbHVtZSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVQbGF5KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wbGF5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0RnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UudG9nZ2xlRnVsbHNjcmVlbigpO1xuICAgIH1cblxuICAgIGdvVG9TdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuY3VycmVudFRpbWUgPSAwO1xuICAgIH1cblxuICAgIGdvVG9FbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZHVyYXRpb247XG4gICAgfVxuXG4gICAgZHJhZ1N0YXJ0KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudm9sdW1lRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IHRodW1iID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICB0aHVtYi5mb2N1cygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gICAgZHJhZ01vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnZvbHVtZURyYWdnaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IHRoaXMudm9sdW1lU2xpZGVyLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IHNsaWRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBjb25zdCB4ID0gTWF0aC5taW4oYm91bmRzLndpZHRoLCBNYXRoLm1heCgwLCBldmVudC5wYWdlWCAtIGJvdW5kcy5sZWZ0KSk7XG5cbiAgICAgICAgLy8gY29udmVydCB0byBhIHBlcmNlbnRhZ2VcbiAgICAgICAgdGhpcy52b2x1bWUgPSAoeCAvIGJvdW5kcy53aWR0aCkgKiAxMDA7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcpXG4gICAgZHJhZ0VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52b2x1bWVEcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cblxufSJdfQ==