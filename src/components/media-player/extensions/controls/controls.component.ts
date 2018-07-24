import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { timer } from 'rxjs/observable/timer';
import { debounceTime, filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SliderOptions, SliderSize } from '../../../slider/index';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';

@Component({
    selector: 'ux-media-player-controls',
    templateUrl: './controls.component.html',
    host: {
        '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
    }
})
export class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, OnDestroy {

    volumeActive: boolean = false;
    volumeFocus: boolean = false;
    mouseEnterVolume = new Subject<void>();
    mouseLeaveVolume = new Subject<void>();

    options: SliderOptions = {
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
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);

        this.mouseEnterVolume.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = true);
        this.mouseLeaveVolume.pipe(
            switchMap(() => timer(1500).pipe(takeUntil(this.mouseEnterVolume))), takeUntil(this._onDestroy)
        ).subscribe(() => this.volumeActive = false);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    toggleMute(): void {
        this.volume = this.volume === 0 ? this._previousVolume : 0;
    }

    goToStart(): void {
        this.mediaPlayerService.currentTime = 0;
    }

    goToEnd(): void {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    }

}