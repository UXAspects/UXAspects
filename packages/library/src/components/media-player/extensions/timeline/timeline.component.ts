import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'ux-media-player-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.less'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document:mouseup)': 'mouseDown = false',
        '[class.quiet]': 'quietMode || fullscreen'
    }
})
export class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('progressThumb') thumb: ElementRef;
    @ViewChild('timeline') timelineRef: ElementRef;

    current: number = 0;
    position: number = 0;
    duration: number = 0;
    buffered: MediaPlayerBuffered[] = [];
    mouseDown: boolean = false;
    quietMode: boolean = false;
    fullscreen: boolean = false;
    private _mouseEventSubscription: Subscription;

    scrub = {
        visible: false,
        position: 0,
        time: 0
    };

    ngOnInit(): void {

        // watch for changes to the current time
        this.mediaPlayerService.durationChangeEvent.subscribe(duration => this.duration = duration);
        this.mediaPlayerService.quietModeEvent.subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.fullscreenEvent.subscribe(fullscreen => {
            this.fullscreen = fullscreen;
            this.scrub.position = 0;
        });

        this.mediaPlayerService.timeUpdateEvent.subscribe(current => {
            this.current = current;
            this.position = (this.current / this.duration) * 100;
        });

        this.mediaPlayerService.progressEvent.subscribe((buffered: TimeRanges) => {
            this.buffered = [];

            for (let idx = 0; idx < buffered.length; idx++) {
                this.buffered.push({ start: (buffered.start(idx) / this.duration) * 100, end: (buffered.end(idx) / this.duration) * 100 });
            }
        });
    }

    ngAfterViewInit(): void {
        let mousedown$ = Observable.fromEvent(this.thumb.nativeElement, 'mousedown');
        let mousemove$ = Observable.fromEvent(document, 'mousemove');
        let mouseup$ = Observable.fromEvent(document, 'mouseup');

        this._mouseEventSubscription = mousedown$.switchMap(event => mousemove$.takeUntil(mouseup$)).subscribe(event => {
            this.scrub.visible = false;
        });
    }

    ngOnDestroy() {
        this._mouseEventSubscription.unsubscribe();
    }

    updateScrub(event?: MouseEvent): void {

        let target = event.target as HTMLElement;
      
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }

        let timeline = this.timelineRef.nativeElement as HTMLDivElement;
        let bounds = timeline.getBoundingClientRect();

        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;

        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    }
}

export interface MediaPlayerBuffered {
    start: number;
    end: number;
}
