/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
var MediaPlayerTimelineExtensionComponent = (function (_super) {
    tslib_1.__extends(MediaPlayerTimelineExtensionComponent, _super);
    function MediaPlayerTimelineExtensionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.current = 0;
        _this.position = 0;
        _this.duration = 0;
        _this.buffered = [];
        _this.mouseDown = false;
        _this.quietMode = false;
        _this.fullscreen = false;
        _this.scrub = { visible: false, position: 0, time: 0 };
        _this._onDestroy = new Subject();
        return _this;
    }
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // watch for changes to the current time
        this.mediaPlayerService.durationChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (duration) { return _this.duration = duration; });
        this.mediaPlayerService.quietModeEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (quietMode) { return _this.quietMode = quietMode; });
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (fullscreen) {
            _this.fullscreen = fullscreen;
            _this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (current) {
            _this.current = current;
            _this.position = (_this.current / _this.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.pipe(takeUntil(this._onDestroy)).subscribe(function (buffered) {
            _this.buffered = [];
            for (var /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                _this.buffered.push({ start: (buffered.start(idx) / _this.duration) * 100, end: (buffered.end(idx) / _this.duration) * 100 });
            }
        });
    };
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ mousedown$ = fromEvent(this.thumb.nativeElement, 'mousedown');
        var /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        var /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        mousedown$.pipe(switchMap(function () { return mousemove$.pipe(takeUntil(mouseup$)); }), takeUntil(this._onDestroy)).subscribe(function () { return _this.scrub.visible = false; });
    };
    /**
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    MediaPlayerTimelineExtensionComponent.prototype.updateScrub = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ target = /** @type {?} */ (event.target);
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }
        var /** @type {?} */ timeline = /** @type {?} */ (this.timelineRef.nativeElement);
        var /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    };
    MediaPlayerTimelineExtensionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-media-player-timeline',
                    template: "<p class=\"current-time\">{{ current | duration }}</p>\n\n<div #timeline class=\"timeline-bar\" (mouseenter)=\"scrub.visible = true; pop.show()\" (mouseleave)=\"scrub.visible = false; pop.hide()\"\n    (mousemove)=\"updateScrub($event)\" (mouseup)=\"updateScrub($event)\" (mousedown)=\"mouseDown = true; $event.preventDefault()\">\n\n    <div class=\"buffered-bar\" *ngFor=\"let buffer of buffered\" [style.left.%]=\"buffer.start\" [style.width.%]=\"buffer.end - buffer.start\"></div>\n\n    <div class=\"media-progress-bar\" [style.width.%]=\"position\">\n        <div #progressThumb class=\"media-progress-bar-thumb\" (mouseenter)=\"scrub.visible = false; pop.hide(); $event.stopPropagation()\"\n            (mouseleave)=\"scrub.visible = true; pop.show(); $event.stopPropagation()\"></div>\n    </div>\n\n    <div class=\"scrub-handle\"\n         [class.scrub-handle-hidden]=\"!scrub.visible\"\n         [style.left.px]=\"scrub.position\"\n         [uxTooltip]=\"popTemplate\"\n         placement=\"top\"\n         [showTriggers]=\"[]\"\n         [hideTriggers]=\"[]\"\n         #pop=\"ux-tooltip\"\n         [tooltipDelay]=\"100\"\n         [tooltipDisabled]=\"duration === 0\"></div>\n</div>\n\n<p class=\"duration-time\">{{ duration | duration }}</p>\n\n<ng-template #popTemplate>\n    <span>{{ scrub.time | duration }}</span>\n</ng-template>",
                    host: {
                        '(document:mouseup)': 'mouseDown = false',
                        '[class.quiet]': 'quietMode || fullscreen'
                    }
                },] },
    ];
    /** @nocollapse */
    MediaPlayerTimelineExtensionComponent.ctorParameters = function () { return []; };
    MediaPlayerTimelineExtensionComponent.propDecorators = {
        "thumb": [{ type: ViewChild, args: ['progressThumb',] },],
        "timelineRef": [{ type: ViewChild, args: ['timeline',] },],
    };
    return MediaPlayerTimelineExtensionComponent;
}(MediaPlayerBaseExtensionDirective));
export { MediaPlayerTimelineExtensionComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUF1Q3JCLGlFQUFpQzs7O3dCQUt0RSxDQUFDO3lCQUNBLENBQUM7eUJBQ0QsQ0FBQzt5QkFDYyxFQUFFOzBCQUNmLEtBQUs7MEJBQ0wsS0FBSzsyQkFDSixLQUFLO3NCQUNuQixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzJCQUUzQixJQUFJLE9BQU8sRUFBUTs7Ozs7O0lBRXhDLHdEQUFROzs7SUFBUjtRQUFBLGlCQXNCQzs7UUFuQkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUM3SCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFD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QUFRLHFCQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBK0IsQ0FBQSxDQUFDO1FBQ2xFLHFCQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUVwRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN6RDtLQUNKOztnQkE5R0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxzMENBNEJDO29CQUNYLElBQUksRUFBRTt3QkFDRixvQkFBb0IsRUFBRSxtQkFBbUI7d0JBQ3pDLGVBQWUsRUFBRSx5QkFBeUI7cUJBQzdDO2lCQUNKOzs7OzswQkFHSSxTQUFTLFNBQUMsZUFBZTtnQ0FDekIsU0FBUyxTQUFDLFVBQVU7O2dEQTlDekI7RUEyQzJELGlDQUFpQztTQUEvRSxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSB9IGZyb20gJy4uL2Jhc2UtZXh0ZW5zaW9uLmRpcmVjdGl2ZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tZWRpYS1wbGF5ZXItdGltZWxpbmUnLFxuICAgIHRlbXBsYXRlOiBgPHAgY2xhc3M9XCJjdXJyZW50LXRpbWVcIj57eyBjdXJyZW50IHwgZHVyYXRpb24gfX08L3A+XG5cbjxkaXYgI3RpbWVsaW5lIGNsYXNzPVwidGltZWxpbmUtYmFyXCIgKG1vdXNlZW50ZXIpPVwic2NydWIudmlzaWJsZSA9IHRydWU7IHBvcC5zaG93KClcIiAobW91c2VsZWF2ZSk9XCJzY3J1Yi52aXNpYmxlID0gZmFsc2U7IHBvcC5oaWRlKClcIlxuICAgIChtb3VzZW1vdmUpPVwidXBkYXRlU2NydWIoJGV2ZW50KVwiIChtb3VzZXVwKT1cInVwZGF0ZVNjcnViKCRldmVudClcIiAobW91c2Vkb3duKT1cIm1vdXNlRG93biA9IHRydWU7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYnVmZmVyZWQtYmFyXCIgKm5nRm9yPVwibGV0IGJ1ZmZlciBvZiBidWZmZXJlZFwiIFtzdHlsZS5sZWZ0LiVdPVwiYnVmZmVyLnN0YXJ0XCIgW3N0eWxlLndpZHRoLiVdPVwiYnVmZmVyLmVuZCAtIGJ1ZmZlci5zdGFydFwiPjwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIm1lZGlhLXByb2dyZXNzLWJhclwiIFtzdHlsZS53aWR0aC4lXT1cInBvc2l0aW9uXCI+XG4gICAgICAgIDxkaXYgI3Byb2dyZXNzVGh1bWIgY2xhc3M9XCJtZWRpYS1wcm9ncmVzcy1iYXItdGh1bWJcIiAobW91c2VlbnRlcik9XCJzY3J1Yi52aXNpYmxlID0gZmFsc2U7IHBvcC5oaWRlKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJzY3J1Yi52aXNpYmxlID0gdHJ1ZTsgcG9wLnNob3coKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+PC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2NydWItaGFuZGxlXCJcbiAgICAgICAgIFtjbGFzcy5zY3J1Yi1oYW5kbGUtaGlkZGVuXT1cIiFzY3J1Yi52aXNpYmxlXCJcbiAgICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInNjcnViLnBvc2l0aW9uXCJcbiAgICAgICAgIFt1eFRvb2x0aXBdPVwicG9wVGVtcGxhdGVcIlxuICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgIFtzaG93VHJpZ2dlcnNdPVwiW11cIlxuICAgICAgICAgW2hpZGVUcmlnZ2Vyc109XCJbXVwiXG4gICAgICAgICAjcG9wPVwidXgtdG9vbHRpcFwiXG4gICAgICAgICBbdG9vbHRpcERlbGF5XT1cIjEwMFwiXG4gICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cImR1cmF0aW9uID09PSAwXCI+PC9kaXY+XG48L2Rpdj5cblxuPHAgY2xhc3M9XCJkdXJhdGlvbi10aW1lXCI+e3sgZHVyYXRpb24gfCBkdXJhdGlvbiB9fTwvcD5cblxuPG5nLXRlbXBsYXRlICNwb3BUZW1wbGF0ZT5cbiAgICA8c3Bhbj57eyBzY3J1Yi50aW1lIHwgZHVyYXRpb24gfX08L3NwYW4+XG48L25nLXRlbXBsYXRlPmAsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGRvY3VtZW50Om1vdXNldXApJzogJ21vdXNlRG93biA9IGZhbHNlJyxcbiAgICAgICAgJ1tjbGFzcy5xdWlldF0nOiAncXVpZXRNb2RlIHx8IGZ1bGxzY3JlZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllclRpbWVsaW5lRXh0ZW5zaW9uQ29tcG9uZW50IGV4dGVuZHMgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQFZpZXdDaGlsZCgncHJvZ3Jlc3NUaHVtYicpIHRodW1iOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3RpbWVsaW5lJykgdGltZWxpbmVSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBjdXJyZW50OiBudW1iZXIgPSAwO1xuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICAgIGR1cmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIGJ1ZmZlcmVkOiBNZWRpYVBsYXllckJ1ZmZlcmVkW10gPSBbXTtcbiAgICBtb3VzZURvd246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBxdWlldE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBmdWxsc2NyZWVuOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2NydWIgPSB7IHZpc2libGU6IGZhbHNlLCBwb3NpdGlvbjogMCwgdGltZTogMCB9O1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZHVyYXRpb25DaGFuZ2VFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZHVyYXRpb24gPT4gdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKHF1aWV0TW9kZSA9PiB0aGlzLnF1aWV0TW9kZSA9IHF1aWV0TW9kZSk7XG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmZ1bGxzY3JlZW5FdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZnVsbHNjcmVlbiA9PiB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW4gPSBmdWxsc2NyZWVuO1xuICAgICAgICAgICAgdGhpcy5zY3J1Yi5wb3NpdGlvbiA9IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLnRpbWVVcGRhdGVFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoY3VycmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBjdXJyZW50O1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9ICh0aGlzLmN1cnJlbnQgLyB0aGlzLmR1cmF0aW9uKSAqIDEwMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucHJvZ3Jlc3NFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKGJ1ZmZlcmVkOiBUaW1lUmFuZ2VzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcmVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGJ1ZmZlcmVkLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcmVkLnB1c2goeyBzdGFydDogKGJ1ZmZlcmVkLnN0YXJ0KGlkeCkgLyB0aGlzLmR1cmF0aW9uKSAqIDEwMCwgZW5kOiAoYnVmZmVyZWQuZW5kKGlkeCkgLyB0aGlzLmR1cmF0aW9uKSAqIDEwMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb3VzZWRvd24kID0gZnJvbUV2ZW50KHRoaXMudGh1bWIubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpO1xuICAgICAgICBjb25zdCBtb3VzZW1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgIGNvbnN0IG1vdXNldXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgICAgIG1vdXNlZG93biQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZW1vdmUkLnBpcGUodGFrZVVudGlsKG1vdXNldXAkKSkpLFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zY3J1Yi52aXNpYmxlID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3J1YihldmVudD86IE1vdXNlRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21lZGlhLXByb2dyZXNzLWJhci10aHVtYicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0aW1lbGluZSA9IHRoaXMudGltZWxpbmVSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgY29uc3QgYm91bmRzID0gdGltZWxpbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdGhpcy5zY3J1Yi5wb3NpdGlvbiA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHRoaXMuc2NydWIudGltZSA9IChldmVudC5vZmZzZXRYIC8gYm91bmRzLndpZHRoKSAqIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bikge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gdGhpcy5zY3J1Yi50aW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhUGxheWVyQnVmZmVyZWQge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG59XG4iXX0=