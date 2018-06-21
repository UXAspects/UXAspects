/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CookieAdapter = (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsic2VydmljZXMvcGVyc2lzdGVudC1kYXRhL2FkYXB0ZXJzL2Nvb2tpZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxJQUFBOzs7Ozs7O0lBRUksK0JBQU87Ozs7SUFBUCxVQUFRLEdBQVc7UUFFZixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7WUFHbEIscUJBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUczQyxxQkFBTSxLQUFLLEdBQUcsT0FBTztpQkFDaEIsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBMUUsQ0FBMEUsQ0FBQztpQkFDekYsSUFBSSxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQWxCLENBQWtCLENBQUMsQ0FBQztZQUV4QyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7SUFFRCwrQkFBTzs7Ozs7SUFBUCxVQUFRLEdBQVcsRUFBRSxLQUFhO1FBQzlCLFFBQVEsQ0FBQyxNQUFNLEdBQU0sR0FBRyxTQUFJLEtBQUssYUFBVSxDQUFDO0tBQy9DOzs7OztJQUVELGtDQUFVOzs7O0lBQVYsVUFBVyxHQUFXO1FBRWxCLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07WUFDckMscUJBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMscUJBQU0sSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFFbEUsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxlQUFhLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVMsQ0FBQyxDQUFDO2FBQ2xHO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCw2QkFBSzs7O0lBQUw7UUFBQSxpQkFLQzs7UUFGRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUEzQixDQUEyQixDQUFDO2FBQ2hFLE9BQU8sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztLQUNuRDs7OztJQUVELG9DQUFZOzs7SUFBWjs7UUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2Y7d0JBaERMO0lBa0RDLENBQUE7QUFoREQseUJBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUFkYXB0ZXIgfSBmcm9tICcuL3N0b3JhZ2UtYWRhcHRlcic7XG5cbmV4cG9ydCBjbGFzcyBDb29raWVBZGFwdGVyIGltcGxlbWVudHMgU3RvcmFnZUFkYXB0ZXIge1xuXG4gICAgZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmNvb2tpZSkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYWxsIHRoZSBjb29raWVzIGZvciB0aGlzIHNpdGVcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcblxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgY29va2llcyBpbnRvIGEgZnJvbSB3ZSBjYW4gZWFzaWx5IG1hbmFnZVxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBjb29raWVzXG4gICAgICAgICAgICAgICAgLm1hcChjb29raWUgPT4gKHsga2V5OiBjb29raWUuc3BsaXQoJz0nKVswXS50cmltKCksIHZhbHVlOiBjb29raWUuc3BsaXQoJz0nKVsxXS50cmltKCkgfSkpXG4gICAgICAgICAgICAgICAgLmZpbmQoY29va2llID0+IGNvb2tpZS5rZXkgPT09IGtleSk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLnZhbHVlIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7a2V5fT0ke3ZhbHVlfTsgcGF0aD0vYDtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZm9yRWFjaChjb29raWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXFQb3MgPSBjb29raWUuaW5kZXhPZignPScpO1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVxUG9zID4gLTEgPyBjb29raWUuc3Vic3RyKDAsIGVxUG9zKS50cmltKCkgOiBjb29raWU7XG5cbiAgICAgICAgICAgIGlmIChuYW1lID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUudHJpbSgpLnJlcGxhY2UoLz0uKi8sIGA9O2V4cGlyZXM9JHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9O3BhdGg9L2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcblxuICAgICAgICAvLyBjYWxsIHJlbW92ZSBpdGVtIG9uIGVhY2ggY29va2llXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLm1hcChjb29raWUgPT4gY29va2llLnNwbGl0KCc9JylbMF0udHJpbSgpKVxuICAgICAgICAgICAgLmZvckVhY2goY29va2llID0+IHRoaXMucmVtb3ZlSXRlbShjb29raWUpKTtcbiAgICB9XG5cbiAgICBnZXRTdXBwb3J0ZWQoKTogU3RvcmFnZUFkYXB0ZXIge1xuICAgICAgICAvLyBjb29raWVzIGFyZSBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSJdfQ==