/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Pipe } from '@angular/core';
var FilterTypeaheadHighlight = /** @class */ (function () {
    function FilterTypeaheadHighlight() {
    }
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    FilterTypeaheadHighlight.prototype.transform = /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    function (value, searchQuery) {
        var /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, "<b class=\"filter-typeahead-highlighted\">" + value.match(regex) + "</b>");
    };
    FilterTypeaheadHighlight.decorators = [
        { type: Pipe, args: [{
                    name: 'filterTypeaheadHighlight'
                },] }
    ];
    return FilterTypeaheadHighlight;
}());
export { FilterTypeaheadHighlight };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXR5cGVhaGVhZC1oaWdobGlnaHQucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWR5bmFtaWMvZmlsdGVyLXR5cGVhaGVhZC1oaWdobGlnaHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQU1oRCw0Q0FBUzs7Ozs7SUFBVCxVQUFVLEtBQWEsRUFBRSxXQUFtQjtRQUN4QyxxQkFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSwrQ0FBMkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBTSxDQUFDLENBQUM7S0FDcEc7O2dCQVBKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsMEJBQTBCO2lCQUNuQzs7bUNBSkQ7O1NBS2Esd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ2ZpbHRlclR5cGVhaGVhZEhpZ2hsaWdodCdcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyVHlwZWFoZWFkSGlnaGxpZ2h0IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIHNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoc2VhcmNoUXVlcnksICdpJyk7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHJlZ2V4LCBgPGIgY2xhc3M9XCJmaWx0ZXItdHlwZWFoZWFkLWhpZ2hsaWdodGVkXCI+JHt2YWx1ZS5tYXRjaChyZWdleCl9PC9iPmApO1xuICAgIH1cbn0iXX0=