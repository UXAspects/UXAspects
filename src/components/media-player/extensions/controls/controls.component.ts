import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Observer } from "rxjs/Observer";

@Component({
    selector: 'ux-media-player-controls',
    templateUrl: './controls.component.html',
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
        this.mediaPlayerComponent.volume = this._volume / 100;
    }

    ngOnInit(): void {
        this.mediaPlayerComponent.playEvent.subscribe(_ => this.playing = true);
        this.mediaPlayerComponent.pauseEvent.subscribe(_ => this.playing = false);
        this.mediaPlayerComponent.quietModeEvent.subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerComponent.volumeChangeEvent.subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerComponent.initEvent.filter(init => init === true).subscribe(() => this.volume = this.mediaPlayerComponent.volume * 100);
        this.mediaPlayerComponent.fullscreenEvent.subscribe(fullscreen => this.fullscreen = fullscreen);

        let mouseenter$ = Observable.fromEvent(this.volumeIcon.nativeElement, 'mouseenter');
        let mouseleave$ = Observable.fromEvent(this.volumeContainer.nativeElement, 'mouseleave');
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
            this.mediaPlayerComponent.pause();
        } else {
            this.mediaPlayerComponent.play();
        }
    }

    setFullscreen(): void {
        this.mediaPlayerComponent.toggleFullscreen();
    }

    goToStart(): void {
        this.mediaPlayerComponent.currentTime = 0;
    }

    goToEnd(): void {
        this.mediaPlayerComponent.currentTime = this.mediaPlayerComponent.duration;
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