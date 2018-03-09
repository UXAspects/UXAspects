import { Component, OnInit, HostListener, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
    selector: 'ux-media-player-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.less'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.quiet]': 'quietMode || fullscreen'
    }
})
export class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit {

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
        this.mediaPlayerService.playEvent.subscribe(_ => this.playing = true);
        this.mediaPlayerService.pauseEvent.subscribe(_ => this.playing = false);
        this.mediaPlayerService.quietModeEvent.subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.volumeChangeEvent.subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.debounceTime(1).filter(init => init === true).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);
        this.mediaPlayerService.fullscreenEvent.subscribe(fullscreen => this.fullscreen = fullscreen);

        let mouseenter$ = Observable.fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        let mouseenterContainer$ = Observable.fromEvent(this.volumeContainer.nativeElement, 'mouseenter');
        let mouseleaveContainer$ = Observable.fromEvent(this.volumeContainer.nativeElement, 'mouseleave');

        mouseenter$.subscribe(() => this.volumeActive = true);
        mouseleaveContainer$.switchMap(() => Observable.timer(1500).takeUntil(mouseenterContainer$)).subscribe(() => this.volumeActive = false);
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

        let thumb = event.target as HTMLDivElement;
        thumb.focus();
    }

    @HostListener('document:mousemove', ['$event'])
    dragMove(event: MouseEvent): void {
        if (!this.volumeDragging) {
            return;
        }

        event.preventDefault();

        let slider = this.volumeSlider.nativeElement as HTMLDivElement;
        let bounds = slider.getBoundingClientRect();

        let x = Math.min(bounds.width, Math.max(0, event.pageX - bounds.left));

        // convert to a percentage
        this.volume = (x / bounds.width) * 100;
    }

    @HostListener('document:mouseup')
    dragEnd(): void {
        this.volumeDragging = false;        
    }

}