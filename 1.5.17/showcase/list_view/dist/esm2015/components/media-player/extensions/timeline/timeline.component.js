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
MediaPlayerTimelineExtensionComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBdUNoRixNQUFNLDRDQUE2QyxTQUFRLGlDQUFpQzs7O3VCQUt0RSxDQUFDO3dCQUNBLENBQUM7d0JBQ0QsQ0FBQzt3QkFDYyxFQUFFO3lCQUNmLEtBQUs7eUJBQ0wsS0FBSzswQkFDSixLQUFLO3FCQUNuQixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzBCQUUzQixJQUFJLE9BQU8sRUFBUTs7Ozs7SUFFeEMsUUFBUTs7UUFHSixJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDN0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FB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S0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFFcEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDekQ7S0FDSjs7O1lBOUdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUE0QkM7Z0JBQ1gsSUFBSSxFQUFFO29CQUNGLG9CQUFvQixFQUFFLG1CQUFtQjtvQkFDekMsZUFBZSxFQUFFLHlCQUF5QjtpQkFDN0M7YUFDSjs7Ozs7c0JBR0ksU0FBUyxTQUFDLGVBQWU7NEJBQ3pCLFNBQVMsU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzL29ic2VydmFibGUvZnJvbUV2ZW50JztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgfSBmcm9tICcuLi9iYXNlLWV4dGVuc2lvbi5kaXJlY3RpdmUnO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWVkaWEtcGxheWVyLXRpbWVsaW5lJyxcbiAgICB0ZW1wbGF0ZTogYDxwIGNsYXNzPVwiY3VycmVudC10aW1lXCI+e3sgY3VycmVudCB8IGR1cmF0aW9uIH19PC9wPlxuXG48ZGl2ICN0aW1lbGluZSBjbGFzcz1cInRpbWVsaW5lLWJhclwiIChtb3VzZWVudGVyKT1cInNjcnViLnZpc2libGUgPSB0cnVlOyBwb3Auc2hvdygpXCIgKG1vdXNlbGVhdmUpPVwic2NydWIudmlzaWJsZSA9IGZhbHNlOyBwb3AuaGlkZSgpXCJcbiAgICAobW91c2Vtb3ZlKT1cInVwZGF0ZVNjcnViKCRldmVudClcIiAobW91c2V1cCk9XCJ1cGRhdGVTY3J1YigkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJtb3VzZURvd24gPSB0cnVlOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cImJ1ZmZlcmVkLWJhclwiICpuZ0Zvcj1cImxldCBidWZmZXIgb2YgYnVmZmVyZWRcIiBbc3R5bGUubGVmdC4lXT1cImJ1ZmZlci5zdGFydFwiIFtzdHlsZS53aWR0aC4lXT1cImJ1ZmZlci5lbmQgLSBidWZmZXIuc3RhcnRcIj48L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1wcm9ncmVzcy1iYXJcIiBbc3R5bGUud2lkdGguJV09XCJwb3NpdGlvblwiPlxuICAgICAgICA8ZGl2ICNwcm9ncmVzc1RodW1iIGNsYXNzPVwibWVkaWEtcHJvZ3Jlc3MtYmFyLXRodW1iXCIgKG1vdXNlZW50ZXIpPVwic2NydWIudmlzaWJsZSA9IGZhbHNlOyBwb3AuaGlkZSgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgICAgKG1vdXNlbGVhdmUpPVwic2NydWIudmlzaWJsZSA9IHRydWU7IHBvcC5zaG93KCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInNjcnViLWhhbmRsZVwiXG4gICAgICAgICBbY2xhc3Muc2NydWItaGFuZGxlLWhpZGRlbl09XCIhc2NydWIudmlzaWJsZVwiXG4gICAgICAgICBbc3R5bGUubGVmdC5weF09XCJzY3J1Yi5wb3NpdGlvblwiXG4gICAgICAgICBbdXhUb29sdGlwXT1cInBvcFRlbXBsYXRlXCJcbiAgICAgICAgIHBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICBbc2hvd1RyaWdnZXJzXT1cIltdXCJcbiAgICAgICAgIFtoaWRlVHJpZ2dlcnNdPVwiW11cIlxuICAgICAgICAgI3BvcD1cInV4LXRvb2x0aXBcIlxuICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCIxMDBcIlxuICAgICAgICAgW3Rvb2x0aXBEaXNhYmxlZF09XCJkdXJhdGlvbiA9PT0gMFwiPjwvZGl2PlxuPC9kaXY+XG5cbjxwIGNsYXNzPVwiZHVyYXRpb24tdGltZVwiPnt7IGR1cmF0aW9uIHwgZHVyYXRpb24gfX08L3A+XG5cbjxuZy10ZW1wbGF0ZSAjcG9wVGVtcGxhdGU+XG4gICAgPHNwYW4+e3sgc2NydWIudGltZSB8IGR1cmF0aW9uIH19PC9zcGFuPlxuPC9uZy10ZW1wbGF0ZT5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhkb2N1bWVudDptb3VzZXVwKSc6ICdtb3VzZURvd24gPSBmYWxzZScsXG4gICAgICAgICdbY2xhc3MucXVpZXRdJzogJ3F1aWV0TW9kZSB8fCBmdWxsc2NyZWVuJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJUaW1lbGluZUV4dGVuc2lvbkNvbXBvbmVudCBleHRlbmRzIE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGQoJ3Byb2dyZXNzVGh1bWInKSB0aHVtYjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0aW1lbGluZScpIHRpbWVsaW5lUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgY3VycmVudDogbnVtYmVyID0gMDtcbiAgICBwb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgICBkdXJhdGlvbjogbnVtYmVyID0gMDtcbiAgICBidWZmZXJlZDogTWVkaWFQbGF5ZXJCdWZmZXJlZFtdID0gW107XG4gICAgbW91c2VEb3duOiBib29sZWFuID0gZmFsc2U7XG4gICAgcXVpZXRNb2RlOiBib29sZWFuID0gZmFsc2U7XG4gICAgZnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNjcnViID0geyB2aXNpYmxlOiBmYWxzZSwgcG9zaXRpb246IDAsIHRpbWU6IDAgfTtcblxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyB3YXRjaCBmb3IgY2hhbmdlcyB0byB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uQ2hhbmdlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGR1cmF0aW9uID0+IHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbik7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnF1aWV0TW9kZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShxdWlldE1vZGUgPT4gdGhpcy5xdWlldE1vZGUgPSBxdWlldE1vZGUpO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGZ1bGxzY3JlZW4gPT4ge1xuICAgICAgICAgICAgdGhpcy5mdWxsc2NyZWVuID0gZnVsbHNjcmVlbjtcbiAgICAgICAgICAgIHRoaXMuc2NydWIucG9zaXRpb24gPSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50aW1lVXBkYXRlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGN1cnJlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSAodGhpcy5jdXJyZW50IC8gdGhpcy5kdXJhdGlvbikgKiAxMDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnByb2dyZXNzRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKChidWZmZXJlZDogVGltZVJhbmdlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5idWZmZXJlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBidWZmZXJlZC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJlZC5wdXNoKHsgc3RhcnQ6IChidWZmZXJlZC5zdGFydChpZHgpIC8gdGhpcy5kdXJhdGlvbikgKiAxMDAsIGVuZDogKGJ1ZmZlcmVkLmVuZChpZHgpIC8gdGhpcy5kdXJhdGlvbikgKiAxMDAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbW91c2Vkb3duJCA9IGZyb21FdmVudCh0aGlzLnRodW1iLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKTtcbiAgICAgICAgY29uc3QgbW91c2Vtb3ZlJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgICAgICBjb25zdCBtb3VzZXVwJCA9IGZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcblxuICAgICAgICBtb3VzZWRvd24kLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbW91c2Vtb3ZlJC5waXBlKHRha2VVbnRpbChtb3VzZXVwJCkpKSxcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2NydWIudmlzaWJsZSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2NydWIoZXZlbnQ/OiBNb3VzZUV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZWRpYS1wcm9ncmVzcy1iYXItdGh1bWInKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGltZWxpbmUgPSB0aGlzLnRpbWVsaW5lUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGJvdW5kcyA9IHRpbWVsaW5lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHRoaXMuc2NydWIucG9zaXRpb24gPSBldmVudC5vZmZzZXRYO1xuICAgICAgICB0aGlzLnNjcnViLnRpbWUgPSAoZXZlbnQub2Zmc2V0WCAvIGJvdW5kcy53aWR0aCkgKiB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5tb3VzZURvd24pIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5jdXJyZW50VGltZSA9IHRoaXMuc2NydWIudGltZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVBsYXllckJ1ZmZlcmVkIHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xufVxuIl19