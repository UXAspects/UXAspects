import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { timer } from 'rxjs/observable/timer';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';

@Component({
    selector: 'ux-media-player-controls',
    templateUrl: './controls.component.html',
    host: {
        '[class.quiet]': 'quietMode || fullscreen'
    }
})
export class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, OnDestroy {

    playing: boolean;
    quietMode: boolean;
    fullscreen: boolean = false;
    volumeActive: boolean = false;
    volumeDragging: boolean = false;

    @ViewChild('volumeIcon') volumeIcon: ElementRef;
    @ViewChild('volumeSlider') volumeSlider: ElementRef;
    @ViewChild('volumeContainer') volumeContainer: ElementRef;

    private _volume: number = 50;
    private _previousVolume = 50;
    private _onDestroy = new Subject<void>();

    get volume(): number {
        return this._volume;
    }

    set volume(value: number) {

        if (value === 0 && this._volume !== 0) {
            this._previousVolume = this._volume;
        }

        this._volume = Math.min(Math.max(value, 0), 100);
        this.mediaPlayerService.volume = this._volume / 100;
    }

    ngOnInit(): void {
        this.mediaPlayerService.playEvent.pipe(takeUntil(this._onDestroy)).subscribe(_ => this.playing = true);
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(_ => this.playing = false);
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.pipe(debounceTime(1), filter(init => init === true), takeUntil(this._onDestroy)).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(fullscreen => this.fullscreen = fullscreen);

        const mouseenter$ = fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        const mouseenterContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        const mouseleaveContainer$ = fromEvent(this.volumeContainer.nativeElement, 'mouseleave');

        mouseenter$.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = true);
        mouseleaveContainer$.pipe(
            switchMap(() => timer(1500).pipe(takeUntil(mouseenterContainer$))),
            takeUntil(this._onDestroy)
        ).subscribe(() => this.volumeActive = false);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    toggleMute(): void {
        if (this.volume === 0) {
            this.volume = this._previousVolume;
        } else {
            this.volume = 0;
        }
    }

    togglePlay(): void {
        if (this.playing) {
            this.mediaPlayerService.pause();
        } else {
            this.mediaPlayerService.play();
        }
    }

    setFullscreen(): void {
        this.mediaPlayerService.toggleFullscreen();
    }

    goToStart(): void {
        this.mediaPlayerService.currentTime = 0;
    }

    goToEnd(): void {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    }

    dragStart(event: MouseEvent): void {
        event.preventDefault();
        this.volumeDragging = true;

        const thumb = event.target as HTMLDivElement;
        thumb.focus();
    }

    @HostListener('document:mousemove', ['$event'])
    dragMove(event: MouseEvent): void {
        if (!this.volumeDragging) {
            return;
        }

        event.preventDefault();

        const slider = this.volumeSlider.nativeElement as HTMLDivElement;
        const bounds = slider.getBoundingClientRect();

        const x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));

        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    }

    @HostListener('document:mouseup')
    dragEnd(): void {
        this.volumeDragging = false;
    }

}