import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SliderOptions, SliderSize } from '../../../slider/index';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';

let uniqueId: number = 1;

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
    subtitlesId: string = `ux-media-player-subtitle-popover-${uniqueId++}`;
    subtitlesOpen: boolean = false;
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

    isSubtitleActive(): boolean {
        for (let idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return true;
            }
        }

        return false;
    }

    setSubtitleTrack(track: TextTrack): void {
        // hide all tracks
        this.mediaPlayerService.hideSubtitleTracks();

        // set the position of the subtitle track
        for (let idx = 0; idx < track.cues.length; idx++) {
            const cue: any = track.cues[idx];
            cue.line = -3;
        }

        // activate the selected one
        track.mode = 'showing';

    }

    getSubtitleTrack(): string {
        for (let idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return this.mediaPlayerService.textTracks[idx].label;
            }
        }

        return 'No subtitles';
    }

}