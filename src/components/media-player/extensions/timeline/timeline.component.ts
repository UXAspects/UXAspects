import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';


@Component({
    selector: 'ux-media-player-timeline',
    templateUrl: './timeline.component.html',
    host: {
        '(document:mouseup)': 'mouseDown = false',
        '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
    }
})
export class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('progressThumb') thumb: ElementRef;
    @ViewChild('timeline') timelineRef: ElementRef;

    current: number = 0;
    position: number = 0;
    buffered: MediaPlayerBuffered[] = [];
    mouseDown: boolean = false;
    scrub = { visible: false, position: 0, time: 0 };

    private _onDestroy = new Subject<void>();

    ngOnInit(): void {

        // watch for changes to the current time
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(fullscreen => {
            this.scrub.position = 0;
        });

        this.mediaPlayerService.timeUpdateEvent.pipe(takeUntil(this._onDestroy)).subscribe(current => {
            this.current = current;
            this.position = (this.current / this.mediaPlayerService.duration) * 100;
        });

        this.mediaPlayerService.progressEvent.pipe(takeUntil(this._onDestroy)).subscribe((buffered: TimeRanges) => {
            this.buffered = [];

            for (let idx = 0; idx < buffered.length; idx++) {
                this.buffered.push({
                    start: (buffered.start(idx) / this.mediaPlayerService.duration) * 100,
                    end: (buffered.end(idx) / this.mediaPlayerService.duration) * 100
                });
            }
        });
    }

    ngAfterViewInit(): void {
        const mousedown$ = fromEvent(this.thumb.nativeElement, 'mousedown');
        const mousemove$ = fromEvent(document, 'mousemove');
        const mouseup$ = fromEvent(document, 'mouseup');

        mousedown$.pipe(
            switchMap(() => mousemove$.pipe(takeUntil(mouseup$))),
            takeUntil(this._onDestroy)
        ).subscribe(() => this.scrub.visible = false);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    updateScrub(event: MouseEvent): void {

        const target = event.target as HTMLElement;

        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }

        const timeline = this.timelineRef.nativeElement as HTMLDivElement;
        const bounds = timeline.getBoundingClientRect();

        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;

        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    }

    /** Skip a number of seconds in any direction */
    skip(seconds: number): void {
        let target = this.current + seconds;

        // ensure that the target position is within the bounds of the clip
        if (target < 0) {
            target = 0;
        }

        if (target > this.mediaPlayerService.duration) {
            target = this.mediaPlayerService.duration;
        }

        this.mediaPlayerService.currentTime = target;
    }
}

export interface MediaPlayerBuffered {
    start: number;
    end: number;
}
