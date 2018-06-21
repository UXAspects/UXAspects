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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7SUF1Q3JCLGlFQUFpQzs7O3dCQUt0RSxDQUFDO3lCQUNBLENBQUM7eUJBQ0QsQ0FBQzt5QkFDYyxFQUFFOzBCQUNmLEtBQUs7MEJBQ0wsS0FBSzsyQkFDSixLQUFLO3NCQUNuQixFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFOzJCQUUzQixJQUFJLE9BQU8sRUFBUTs7Ozs7O0lBRXhDLHdEQUFROzs7SUFBUjtRQUFBLGlCQXNCQzs7UUFuQkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUM3SCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFD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QUFRLHFCQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBK0IsQ0FBQSxDQUFDO1FBQ2xFLHFCQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUVwRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN6RDtLQUNKOztnQkE5R0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRSxzMENBNEJDO29CQUNYLElBQUksRUFBRTt3QkFDRixvQkFBb0IsRUFBRSxtQkFBbUI7d0JBQ3pDLGVBQWUsRUFBRSx5QkFBeUI7cUJBQzdDO2lCQUNKOzs7OzBCQUdJLFNBQVMsU0FBQyxlQUFlO2dDQUN6QixTQUFTLFNBQUMsVUFBVTs7Z0RBOUN6QjtFQTJDMkQsaUNBQWlDO1NBQS9FLHFDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi4vYmFzZS1leHRlbnNpb24uZGlyZWN0aXZlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1lZGlhLXBsYXllci10aW1lbGluZScsXG4gICAgdGVtcGxhdGU6IGA8cCBjbGFzcz1cImN1cnJlbnQtdGltZVwiPnt7IGN1cnJlbnQgfCBkdXJhdGlvbiB9fTwvcD5cblxuPGRpdiAjdGltZWxpbmUgY2xhc3M9XCJ0aW1lbGluZS1iYXJcIiAobW91c2VlbnRlcik9XCJzY3J1Yi52aXNpYmxlID0gdHJ1ZTsgcG9wLnNob3coKVwiIChtb3VzZWxlYXZlKT1cInNjcnViLnZpc2libGUgPSBmYWxzZTsgcG9wLmhpZGUoKVwiXG4gICAgKG1vdXNlbW92ZSk9XCJ1cGRhdGVTY3J1YigkZXZlbnQpXCIgKG1vdXNldXApPVwidXBkYXRlU2NydWIoJGV2ZW50KVwiIChtb3VzZWRvd24pPVwibW91c2VEb3duID0gdHJ1ZTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJidWZmZXJlZC1iYXJcIiAqbmdGb3I9XCJsZXQgYnVmZmVyIG9mIGJ1ZmZlcmVkXCIgW3N0eWxlLmxlZnQuJV09XCJidWZmZXIuc3RhcnRcIiBbc3R5bGUud2lkdGguJV09XCJidWZmZXIuZW5kIC0gYnVmZmVyLnN0YXJ0XCI+PC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWVkaWEtcHJvZ3Jlc3MtYmFyXCIgW3N0eWxlLndpZHRoLiVdPVwicG9zaXRpb25cIj5cbiAgICAgICAgPGRpdiAjcHJvZ3Jlc3NUaHVtYiBjbGFzcz1cIm1lZGlhLXByb2dyZXNzLWJhci10aHVtYlwiIChtb3VzZWVudGVyKT1cInNjcnViLnZpc2libGUgPSBmYWxzZTsgcG9wLmhpZGUoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cInNjcnViLnZpc2libGUgPSB0cnVlOyBwb3Auc2hvdygpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIj48L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJzY3J1Yi1oYW5kbGVcIlxuICAgICAgICAgW2NsYXNzLnNjcnViLWhhbmRsZS1oaWRkZW5dPVwiIXNjcnViLnZpc2libGVcIlxuICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwic2NydWIucG9zaXRpb25cIlxuICAgICAgICAgW3V4VG9vbHRpcF09XCJwb3BUZW1wbGF0ZVwiXG4gICAgICAgICBwbGFjZW1lbnQ9XCJ0b3BcIlxuICAgICAgICAgW3Nob3dUcmlnZ2Vyc109XCJbXVwiXG4gICAgICAgICBbaGlkZVRyaWdnZXJzXT1cIltdXCJcbiAgICAgICAgICNwb3A9XCJ1eC10b29sdGlwXCJcbiAgICAgICAgIFt0b29sdGlwRGVsYXldPVwiMTAwXCJcbiAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwiZHVyYXRpb24gPT09IDBcIj48L2Rpdj5cbjwvZGl2PlxuXG48cCBjbGFzcz1cImR1cmF0aW9uLXRpbWVcIj57eyBkdXJhdGlvbiB8IGR1cmF0aW9uIH19PC9wPlxuXG48bmctdGVtcGxhdGUgI3BvcFRlbXBsYXRlPlxuICAgIDxzcGFuPnt7IHNjcnViLnRpbWUgfCBkdXJhdGlvbiB9fTwvc3Bhbj5cbjwvbmctdGVtcGxhdGU+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICcoZG9jdW1lbnQ6bW91c2V1cCknOiAnbW91c2VEb3duID0gZmFsc2UnLFxuICAgICAgICAnW2NsYXNzLnF1aWV0XSc6ICdxdWlldE1vZGUgfHwgZnVsbHNjcmVlbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyVGltZWxpbmVFeHRlbnNpb25Db21wb25lbnQgZXh0ZW5kcyBNZWRpYVBsYXllckJhc2VFeHRlbnNpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBAVmlld0NoaWxkKCdwcm9ncmVzc1RodW1iJykgdGh1bWI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndGltZWxpbmUnKSB0aW1lbGluZVJlZjogRWxlbWVudFJlZjtcblxuICAgIGN1cnJlbnQ6IG51bWJlciA9IDA7XG4gICAgcG9zaXRpb246IG51bWJlciA9IDA7XG4gICAgZHVyYXRpb246IG51bWJlciA9IDA7XG4gICAgYnVmZmVyZWQ6IE1lZGlhUGxheWVyQnVmZmVyZWRbXSA9IFtdO1xuICAgIG1vdXNlRG93bjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHF1aWV0TW9kZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZ1bGxzY3JlZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzY3J1YiA9IHsgdmlzaWJsZTogZmFsc2UsIHBvc2l0aW9uOiAwLCB0aW1lOiAwIH07XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGNoYW5nZXMgdG8gdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbkNoYW5nZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShkdXJhdGlvbiA9PiB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb24pO1xuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5xdWlldE1vZGVFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUocXVpZXRNb2RlID0+IHRoaXMucXVpZXRNb2RlID0gcXVpZXRNb2RlKTtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmdWxsc2NyZWVuID0+IHtcbiAgICAgICAgICAgIHRoaXMuZnVsbHNjcmVlbiA9IGZ1bGxzY3JlZW47XG4gICAgICAgICAgICB0aGlzLnNjcnViLnBvc2l0aW9uID0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UudGltZVVwZGF0ZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShjdXJyZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gKHRoaXMuY3VycmVudCAvIHRoaXMuZHVyYXRpb24pICogMTAwO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wcm9ncmVzc0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoYnVmZmVyZWQ6IFRpbWVSYW5nZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgYnVmZmVyZWQubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyZWQucHVzaCh7IHN0YXJ0OiAoYnVmZmVyZWQuc3RhcnQoaWR4KSAvIHRoaXMuZHVyYXRpb24pICogMTAwLCBlbmQ6IChidWZmZXJlZC5lbmQoaWR4KSAvIHRoaXMuZHVyYXRpb24pICogMTAwIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG1vdXNlZG93biQgPSBmcm9tRXZlbnQodGhpcy50aHVtYi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJyk7XG4gICAgICAgIGNvbnN0IG1vdXNlbW92ZSQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAgICAgY29uc3QgbW91c2V1cCQgPSBmcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG5cbiAgICAgICAgbW91c2Vkb3duJC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1vdXNlbW92ZSQucGlwZSh0YWtlVW50aWwobW91c2V1cCQpKSksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KVxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNjcnViLnZpc2libGUgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjcnViKGV2ZW50PzogTW91c2VFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVkaWEtcHJvZ3Jlc3MtYmFyLXRodW1iJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpbWVsaW5lID0gdGhpcy50aW1lbGluZVJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBjb25zdCBib3VuZHMgPSB0aW1lbGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLnNjcnViLnBvc2l0aW9uID0gZXZlbnQub2Zmc2V0WDtcbiAgICAgICAgdGhpcy5zY3J1Yi50aW1lID0gKGV2ZW50Lm9mZnNldFggLyBib3VuZHMud2lkdGgpICogdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZHVyYXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW91c2VEb3duKSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuY3VycmVudFRpbWUgPSB0aGlzLnNjcnViLnRpbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFQbGF5ZXJCdWZmZXJlZCB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbn1cbiJdfQ==