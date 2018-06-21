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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2Nyb2xsL3Njcm9sbC1pbnRvLXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBS3ZDLDhDQUFjOzs7OztJQUFkLFVBQWUsSUFBaUIsRUFBRSxZQUF5QjtRQUN2RCxxQkFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUN6SCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckMsWUFBWSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDdEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHFCQUFNLFlBQVksR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUM7YUFDckU7U0FDSjtLQUNKOztnQkFiSixVQUFVOztnQ0FGWDs7U0FHYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTY3JvbGxJbnRvVmlld1NlcnZpY2Uge1xuXG4gICAgc2Nyb2xsSW50b1ZpZXcoZWxlbTogSFRNTEVsZW1lbnQsIHNjcm9sbFBhcmVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gKGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCkgLSBzY3JvbGxQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICBpZiAob2Zmc2V0VG9wIDwgc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCkge1xuICAgICAgICAgICAgc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCA9IG9mZnNldFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldEJvdHRvbSA9IG9mZnNldFRvcCArIGVsZW0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgaWYgKG9mZnNldEJvdHRvbSA+IChzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wICsgc2Nyb2xsUGFyZW50LmNsaWVudEhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wID0gb2Zmc2V0Qm90dG9tIC0gc2Nyb2xsUGFyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=