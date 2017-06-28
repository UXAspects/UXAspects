import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';

@Component({
    selector: 'ux-media-player-controls',
    templateUrl: './controls.component.html',
    host: {
        '[class.quiet]': 'quietMode'
    }
})
export class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit {

    playing: boolean;
    quietMode: boolean;
    volumeDragging: boolean = false;

    @ViewChild('volumeSlider') volumeSlider: ElementRef;

    private _volume: number = 50;

    get volume(): number {
        return this._volume;
    }

    set volume(value: number) {
        this._volume = value;
        this.mediaPlayerComponent.volume = this._volume / 100;
    }


    ngOnInit(): void {
        this.mediaPlayerComponent.playEvent.subscribe(_ => this.playing = true);
        this.mediaPlayerComponent.pauseEvent.subscribe(_ => this.playing = false);
        this.mediaPlayerComponent.quietModeEvent.subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerComponent.volumeChangeEvent.subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerComponent.initEvent.filter(init => init === true).subscribe(() => this.volume = this.mediaPlayerComponent.volume * 100);
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