/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var ScrollIntoViewService = (function () {
    function ScrollIntoViewService() {
    }
    /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    ScrollIntoViewService.prototype.scrollIntoView = /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    function (elem, scrollParent) {
        var /** @type {?} */ offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        }
        else {
            var /** @type {?} */ offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    };
    ScrollIntoViewService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollIntoViewService.ctorParameters = function () { return []; };
    return ScrollIntoViewService;
}());
export { ScrollIntoViewService };
function ScrollIntoViewService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ScrollIntoViewService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ScrollIntoViewService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC1pbnRvLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBS3ZDLDhDQUFjOzs7OztJQUFkLFVBQWUsSUFBaUIsRUFBRSxZQUF5QjtRQUN2RCxxQkFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUN6SCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckMsWUFBWSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDdEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHFCQUFNLFlBQVksR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7YUFDckU7U0FDSjtLQUNKOztnQkFiSixVQUFVOzs7O2dDQUZYOztTQUdhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjcm9sbEludG9WaWV3U2VydmljZSB7XG5cbiAgICBzY3JvbGxJbnRvVmlldyhlbGVtOiBIVE1MRWxlbWVudCwgc2Nyb2xsUGFyZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBvZmZzZXRUb3AgPSAoZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKSAtIHNjcm9sbFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIGlmIChvZmZzZXRUb3AgPCBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wID0gb2Zmc2V0VG9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0VG9wICsgZWxlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICBpZiAob2Zmc2V0Qm90dG9tID4gKHNjcm9sbFBhcmVudC5zY3JvbGxUb3AgKyBzY3JvbGxQYXJlbnQuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFBhcmVudC5zY3JvbGxUb3AgPSBvZmZzZXRCb3R0b20gLSBzY3JvbGxQYXJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==