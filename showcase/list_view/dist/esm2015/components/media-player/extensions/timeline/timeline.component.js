/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
export class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.current = 0;
        this.position = 0;
        this.duration = 0;
        this.buffered = [];
        this.mouseDown = false;
        this.quietMode = false;
        this.fullscreen = false;
        this.scrub = { visible: false, position: 0, time: 0 };
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // watch for changes to the current time
        this.mediaPlayerService.durationChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(duration => this.duration = duration);
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(quietMode => this.quietMode = quietMode);
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(fullscreen => {
            this.fullscreen = fullscreen;
            this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.pipe(takeUntil(this._onDestroy)).subscribe(current => {
            this.current = current;
            this.position = (this.current / this.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.pipe(takeUntil(this._onDestroy)).subscribe((buffered) => {
            this.buffered = [];
            for (let /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                this.buffered.push({ start: (buffered.start(idx) / this.duration) * 100, end: (buffered.end(idx) / this.duration) * 100 });
            }
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ mousedown$ = fromEvent(this.thumb.nativeElement, 'mousedown');
        const /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        const /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        mousedown$.pipe(switchMap(() => mousemove$.pipe(takeUntil(mouseup$))), takeUntil(this._onDestroy)).subscribe(() => this.scrub.visible = false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    updateScrub(event) {
        const /** @type {?} */ target = /** @type {?} */ (event.target);
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }
        const /** @type {?} */ timeline = /** @type {?} */ (this.timelineRef.nativeElement);
        const /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    }
}
MediaPlayerTimelineExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-timeline',
                template: `<p class="current-time">{{ current | duration }}</p>

<div #timeline class="timeline-bar" (mouseenter)="scrub.visible = true; pop.show()" (mouseleave)="scrub.visible = false; pop.hide()"
    (mousemove)="updateScrub($event)" (mouseup)="updateScrub($event)" (mousedown)="mouseDown = true; $event.preventDefault()">

    <div class="buffered-bar" *ngFor="let buffer of buffered" [style.left.%]="buffer.start" [style.width.%]="buffer.end - buffer.start"></div>

    <div class="media-progress-bar" [style.width.%]="position">
        <div #progressThumb class="media-progress-bar-thumb" (mouseenter)="scrub.visible = false; pop.hide(); $event.stopPropagation()"
            (mouseleave)="scrub.visible = true; pop.show(); $event.stopPropagation()"></div>
    </div>

    <div class="scrub-handle"
         [class.scrub-handle-hidden]="!scrub.visible"
         [style.left.px]="scrub.position"
         [uxTooltip]="popTemplate"
         placement="top"
         [showTriggers]="[]"
         [hideTriggers]="[]"
         #pop="ux-tooltip"
         [tooltipDelay]="100"
         [tooltipDisabled]="duration === 0"></div>
</div>

<p class="duration-time">{{ duration | duration }}</p>

<ng-template #popTemplate>
    <span>{{ scrub.time | duration }}</span>
</ng-template>`,
                host: {
                    '(document:mouseup)': 'mouseDown = false',
                    '[class.quiet]': 'quietMode || fullscreen'
                }
            },] },
];
/** @nocollapse */
MediaPlayerTimelineExtensionComponent.propDecorators = {
    "thumb": [{ type: ViewChild, args: ['progressThumb',] },],
    "timelineRef": [{ type: ViewChild, args: ['timeline',] },],
};
function MediaPlayerTimelineExtensionComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerTimelineExtensionComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerTimelineExtensionComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MediaPlayerTimelineExtensionComponent.propDecorators;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.thumb;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.timelineRef;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.current;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.position;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.duration;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.buffered;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.mouseDown;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.quietMode;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.fullscreen;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.scrub;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype._onDestroy;
}
/**
 * @record
 */
export function MediaPlayerBuffered() { }
function MediaPlayerBuffered_tsickle_Closure_declarations() {
    /** @type {?} */
    MediaPlayerBuffered.prototype.start;
    /** @type {?} */
    MediaPlayerBuffered.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBdUNoRixNQUFNLDRDQUE2QyxTQUFRLGlDQUFpQzs7O3VCQUt0RSxDQUFDO3dCQUNBLENBQUM7d0JBQ0QsQ0FBQzt3QkFDYyxFQUFFO3lCQUNmLEtBQUs7eUJBQ0wsS0FBSzswQkFDSixLQUFLO3FCQUNuQixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzBCQUUzQixJQUFJLE9BQU8sRUFBUTs7Ozs7SUFFeEMsUUFBUTs7UUFHSixJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDN0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FB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S0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFFcEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDekQ7S0FDSjs7O1lBOUdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUE0QkM7Z0JBQ1gsSUFBSSxFQUFFO29CQUNGLG9CQUFvQixFQUFFLG1CQUFtQjtvQkFDekMsZUFBZSxFQUFFLHlCQUF5QjtpQkFDN0M7YUFDSjs7OztzQkFHSSxTQUFTLFNBQUMsZUFBZTs0QkFDekIsU0FBUyxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2Jhc2UtZXh0ZW5zaW9uLmRpcmVjdGl2ZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tZWRpYS1wbGF5ZXItdGltZWxpbmUnLFxuICAgIHRlbXBsYXRlOiBgPHAgY2xhc3M9XCJjdXJyZW50LXRpbWVcIj57eyBjdXJyZW50IHwgZHVyYXRpb24gfX08L3A+XG5cbjxkaXYgI3RpbWVsaW5lIGNsYXNzPVwidGltZWxpbmUtYmFyXCIgKG1vdXNlZW50ZXIpPVwic2NydWIudmlzaWJsZSA9IHRydWU7IHBvcC5zaG93KClcIiAobW91c2VsZWF2ZSk9XCJzY3J1Yi52aXNpYmxlID0gZmFsc2U7IHBvcC5oaWRlKClcIlxuICAgIChtb3VzZW1vdmUpPVwidXBkYXRlU2NydWIoJGV2ZW50KVwiIChtb3VzZXVwKT1cInVwZGF0ZVNjcnViKCRldmVudClcIiAobW91c2Vkb3duKT1cIm1vdXNlRG93biA9IHRydWU7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYnVmZmVyZWQtYmFyXCIgKm5nRm9yPVwibGV0IGJ1ZmZlciBvZiBidWZmZXJlZFwiIFtzdHlsZS5sZWZ0LiVdPVwiYnVmZmVyLnN0YXJ0XCIgW3N0eWxlLndpZHRoLiVdPVwiYnVmZmVyLmVuZCAtIGJ1ZmZlci5zdGFydFwiPjwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1lZGlhLXByb2dyZXNzLWJhclwiIFtzdHlsZS53aWR0aC4lXT1cInBvc2l0aW9uXCI+XG4gICAgICAgIDxkaXYgI3Byb2dyZXNzVGh1bWIgY2xhc3M9XCJtZWRpYS1wcm9ncmVzcy1iYXItdGh1bWJcIiAobW91c2VlbnRlcik9XCJzY3J1Yi52aXNpYmxlID0gZmFsc2U7IHBvcC5oaWRlKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJzY3J1Yi52aXNpYmxlID0gdHJ1ZTsgcG9wLnNob3coKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2NydWItaGFuZGxlXCJcbiAgICAgICAgIFtjbGFzcy5zY3J1Yi1oYW5kbGUtaGlkZGVuXT1cIiFzY3J1Yi52aXNpYmxlXCJcbiAgICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInNjcnViLnBvc2l0aW9uXCJcbiAgICAgICAgIFt1eFRvb2x0aXBdPVwicG9wVGVtcGxhdGVcIlxuICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgIFtzaG93VHJpZ2dlcnNdPVwiW11cIlxuICAgICAgICAgW2hpZGVUcmlnZ2Vyc109XCJbXVwiXG4gICAgICAgICAjcG9wPVwidXgtdG9vbHRpcFwiXG4gICAgICAgICBbdG9vbHRpcERlbGF5XT1cIjEwMFwiXG4gICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cImR1cmF0aW9uID09PSAwXCI+PC9kaXY+XG48L2Rpdj5cblxuPHAgY2xhc3M9XCJkdXJhdGlvbi10aW1lXCI+e3sgZHVyYXRpb24gfCBkdXJhdGlvbiB9fTwvcD5cblxuPG5nLXRlbXBsYXRlICNwb3BUZW1wbGF0ZT5cbiAgICA8c3Bhbj57eyBzY3J1Yi50aW1lIHwgZHVyYXRpb24gfX08L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGRvY3VtZW50Om1vdXNldXApJzogJ21vdXNlRG93biA9IGZhbHNlJyxcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAncXVpZXRNb2RlIHx8IGZ1bGxzY3JlZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllclRpbWVsaW5lRXh0ZW5zaW9uQ29tcG9uZW50IGV4dGVuZHMgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgncHJvZ3Jlc3NUaHVtYicpIHRodW1iOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3RpbWVsaW5lJykgdGltZWxpbmVSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBjdXJyZW50OiBudW1iZXIgPSAwO1xuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIGJ1ZmZlcmVkOiBNZWRpYVBsYXllckJ1ZmZlcmVkW10gPSBbXTtcbiAgICBtb3VzZURvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBxdWlldE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBmdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2NydWIgPSB7IHZpc2libGU6IGZhbHNlLCBwb3NpdGlvbjogMCwgdGltZTogMCB9O1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZHVyYXRpb25DaGFuZ2VFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZHVyYXRpb24gPT4gdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHF1aWV0TW9kZSA9PiB0aGlzLnF1aWV0TW9kZSA9IHF1aWV0TW9kZSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5FdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZnVsbHNjcmVlbiA9PiB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW4gPSBmdWxsc2NyZWVuO1xuICAgICAgICAgICAgdGhpcy5zY3J1Yi5wb3NpdGlvbiA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRpbWVVcGRhdGVFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoY3VycmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBjdXJyZW50O1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICh0aGlzLmN1cnJlbnQgLyB0aGlzLmR1cmF0aW9uKSAqIDEwMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucHJvZ3Jlc3NFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKGJ1ZmZlcmVkOiBUaW1lUmFuZ2VzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcmVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGJ1ZmZlcmVkLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcmVkLnB1c2goeyBzdGFydDogKGJ1ZmZlcmVkLnN0YXJ0KGlkeCkgLyB0aGlzLmR1cmF0aW9uKSAqIDEwMCwgZW5kOiAoYnVmZmVyZWQuZW5kKGlkeCkgLyB0aGlzLmR1cmF0aW9uKSAqIDEwMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb3VzZWRvd24kID0gZnJvbUV2ZW50KHRoaXMudGh1bWIubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpO1xuICAgICAgICBjb25zdCBtb3VzZW1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgIGNvbnN0IG1vdXNldXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgICAgIG1vdXNlZG93biQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZW1vdmUkLnBpcGUodGFrZVVudGlsKG1vdXNldXAkKSkpLFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zY3J1Yi52aXNpYmxlID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3J1YihldmVudD86IE1vdXNlRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lZGlhLXByb2dyZXNzLWJhci10aHVtYicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMudGltZWxpbmVSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgY29uc3QgYm91bmRzID0gdGltZWxpbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5zY3J1Yi5wb3NpdGlvbiA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHRoaXMuc2NydWIudGltZSA9IChldmVudC5vZmZzZXRYIC8gYm91bmRzLndpZHRoKSAqIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bikge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gdGhpcy5zY3J1Yi50aW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhUGxheWVyQnVmZmVyZWQge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG59XG4iXX0=