/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CookieAdapter = /** @class */ (function () {
    function CookieAdapter() {
    }
    /**
     * @param {?} key
     * @return {?}
     */
    CookieAdapter.prototype.getItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (document.cookie) {
            // get all the cookies for this site
            var /** @type {?} */ cookies = document.cookie.split(';');
            // process the cookies into a from we can easily manage
            var /** @type {?} */ match = cookies
                .map(function (cookie) { return ({ key: cookie.split('=')[0].trim(), value: cookie.split('=')[1].trim() }); })
                .find(function (cookie) { return cookie.key === key; });
            return match ? match.value : null;
        }
        return null;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    CookieAdapter.prototype.setItem = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        document.cookie = key + "=" + value + "; path=/";
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CookieAdapter.prototype.removeItem = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        document.cookie.split(';').forEach(function (cookie) {
            var /** @type {?} */ eqPos = cookie.indexOf('=');
            var /** @type {?} */ name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
            if (name === key) {
                document.cookie = cookie.trim().replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            }
        });
    };
    /**
     * @return {?}
     */
    CookieAdapter.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // call remove item on each cookie
        document.cookie.split(';').map(function (cookie) { return cookie.split('=')[0].trim(); })
            .forEach(function (cookie) { return _this.removeItem(cookie); });
    };
    /**
     * @return {?}
     */
    CookieAdapter.prototype.getSupported = /**
     * @return {?}
     */
    function () {
        // cookies are supported in all browsers
        return this;
    };
    return CookieAdapter;
}());
export { CookieAdapter };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsic2VydmljZXMvcGVyc2lzdGVudC1kYXRhL2FkYXB0ZXJzL2Nvb2tpZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFBOzs7Ozs7O0lBRUksK0JBQU87Ozs7SUFBUCxVQUFRLEdBQVc7UUFFZixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7WUFHbEIscUJBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUczQyxxQkFBTSxLQUFLLEdBQUcsT0FBTztpQkFDaEIsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBMUUsQ0FBMEUsQ0FBQztpQkFDekYsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQWxCLENBQWtCLENBQUMsQ0FBQztZQUV4QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDckM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7Ozs7OztJQUVELCtCQUFPOzs7OztJQUFQLFVBQVEsR0FBVyxFQUFFLEtBQWE7UUFDOUIsUUFBUSxDQUFDLE1BQU0sR0FBTSxHQUFHLFNBQUksS0FBSyxhQUFVLENBQUM7S0FDL0M7Ozs7O0lBRUQsa0NBQVU7Ozs7SUFBVixVQUFXLEdBQVc7UUFFbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtZQUNyQyxxQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxxQkFBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRWxFLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNmLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZUFBYSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFTLENBQUMsQ0FBQzthQUNsRztTQUNKLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsNkJBQUs7OztJQUFMO1FBQUEsaUJBS0M7O1FBRkcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBM0IsQ0FBMkIsQ0FBQzthQUNoRSxPQUFPLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7S0FDbkQ7Ozs7SUFFRCxvQ0FBWTs7O0lBQVo7O1FBRUksTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO3dCQWhETDtJQWtEQyxDQUFBO0FBaERELHlCQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0b3JhZ2VBZGFwdGVyIH0gZnJvbSAnLi9zdG9yYWdlLWFkYXB0ZXInO1xuXG5leHBvcnQgY2xhc3MgQ29va2llQWRhcHRlciBpbXBsZW1lbnRzIFN0b3JhZ2VBZGFwdGVyIHtcblxuICAgIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5jb29raWUpIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGFsbCB0aGUgY29va2llcyBmb3IgdGhpcyBzaXRlXG4gICAgICAgICAgICBjb25zdCBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG5cbiAgICAgICAgICAgIC8vIHByb2Nlc3MgdGhlIGNvb2tpZXMgaW50byBhIGZyb20gd2UgY2FuIGVhc2lseSBtYW5hZ2VcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gY29va2llc1xuICAgICAgICAgICAgICAgIC5tYXAoY29va2llID0+ICh7IGtleTogY29va2llLnNwbGl0KCc9JylbMF0udHJpbSgpLCB2YWx1ZTogY29va2llLnNwbGl0KCc9JylbMV0udHJpbSgpIH0pKVxuICAgICAgICAgICAgICAgIC5maW5kKGNvb2tpZSA9PiBjb29raWUua2V5ID09PSBrZXkpO1xuXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaC52YWx1ZSA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX07IHBhdGg9L2A7XG4gICAgfVxuXG4gICAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLmZvckVhY2goY29va2llID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVxUG9zID0gY29va2llLmluZGV4T2YoJz0nKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlcVBvcyA+IC0xID8gY29va2llLnN1YnN0cigwLCBlcVBvcykudHJpbSgpIDogY29va2llO1xuXG4gICAgICAgICAgICBpZiAobmFtZSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLnRyaW0oKS5yZXBsYWNlKC89LiovLCBgPTtleHBpcmVzPSR7bmV3IERhdGUoKS50b1VUQ1N0cmluZygpfTtwYXRoPS9gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xlYXIoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2FsbCByZW1vdmUgaXRlbSBvbiBlYWNoIGNvb2tpZVxuICAgICAgICBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKS5tYXAoY29va2llID0+IGNvb2tpZS5zcGxpdCgnPScpWzBdLnRyaW0oKSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGNvb2tpZSA9PiB0aGlzLnJlbW92ZUl0ZW0oY29va2llKSk7XG4gICAgfVxuXG4gICAgZ2V0U3VwcG9ydGVkKCk6IFN0b3JhZ2VBZGFwdGVyIHtcbiAgICAgICAgLy8gY29va2llcyBhcmUgc3VwcG9ydGVkIGluIGFsbCBicm93c2Vyc1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbn0iXX0=