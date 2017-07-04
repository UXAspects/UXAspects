import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'ux-media-player-timeline',
    templateUrl: './timeline.component.html',
    host: {
        '(document:mouseup)': 'mouseDown = false',
        '[class.quiet]': 'quietMode || fullscreen'
    }
})
export class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective implements OnInit {

    current: number = 0;
    position: number = 0;
    duration: number = 0;
    buffered: MediaPlayerBuffered[] = [];
    mouseDown: boolean = false;
    quietMode: boolean = false;
    fullscreen: boolean = false;

    scrub = {
        visible: false,
        position: 0,
        time: 0
    };

    @ViewChild('timeline') timelineRef: ElementRef;

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

    updateScrub(event?: MouseEvent): void {

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