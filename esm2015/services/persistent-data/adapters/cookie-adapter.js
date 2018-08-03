/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class CookieAdapter {
    /**
     * @param {?} key
     * @return {?}
     */
    getItem(key) {
        if (document.cookie) {
            // get all the cookies for this site
            const /** @type {?} */ cookies = document.cookie.split(';');
            // process the cookies into a from we can easily manage
            const /** @type {?} */ match = cookies
                .map(cookie => ({ key: cookie.split('=')[0].trim(), value: cookie.split('=')[1].trim() }))
                .find(cookie => cookie.key === key);
            return match ? match.value : null;
        }
        return null;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setItem(key, value) {
        document.cookie = `${key}=${value}; path=/`;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeItem(key) {
        document.cookie.split(';').forEach(cookie => {
            const /** @type {?} */ eqPos = cookie.indexOf('=');
            const /** @type {?} */ name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
            if (name === key) {
                document.cookie = cookie.trim().replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        });
    }
    /**
     * @return {?}
     */
    clear() {
        // call remove item on each cookie
        document.cookie.split(';').map(cookie => cookie.split('=')[0].trim())
            .forEach(cookie => this.removeItem(cookie));
    }
    /**
     * @return {?}
     */
    getSupported() {
        // cookies are supported in all browsers
        return this;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsic2VydmljZXMvcGVyc2lzdGVudC1kYXRhL2FkYXB0ZXJzL2Nvb2tpZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNOzs7OztJQUVGLE9BQU8sQ0FBQyxHQUFXO1FBRWYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBR2xCLHVCQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFHM0MsdUJBQU0sS0FBSyxHQUFHLE9BQU87aUJBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3pGLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFeEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3JDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7Ozs7SUFFRCxPQUFPLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDOUIsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxLQUFLLFVBQVUsQ0FBQztLQUMvQzs7Ozs7SUFFRCxVQUFVLENBQUMsR0FBVztRQUVsQixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEMsdUJBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsdUJBQU0sSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUVsRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDbEc7U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQUVELEtBQUs7O1FBR0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDbkQ7Ozs7SUFFRCxZQUFZOztRQUVSLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjtDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUFkYXB0ZXIgfSBmcm9tICcuL3N0b3JhZ2UtYWRhcHRlcic7XG5cbmV4cG9ydCBjbGFzcyBDb29raWVBZGFwdGVyIGltcGxlbWVudHMgU3RvcmFnZUFkYXB0ZXIge1xuXG4gICAgZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmNvb2tpZSkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYWxsIHRoZSBjb29raWVzIGZvciB0aGlzIHNpdGVcbiAgICAgICAgICAgIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcblxuICAgICAgICAgICAgLy8gcHJvY2VzcyB0aGUgY29va2llcyBpbnRvIGEgZnJvbSB3ZSBjYW4gZWFzaWx5IG1hbmFnZVxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBjb29raWVzXG4gICAgICAgICAgICAgICAgLm1hcChjb29raWUgPT4gKHsga2V5OiBjb29raWUuc3BsaXQoJz0nKVswXS50cmltKCksIHZhbHVlOiBjb29raWUuc3BsaXQoJz0nKVsxXS50cmltKCkgfSkpXG4gICAgICAgICAgICAgICAgLmZpbmQoY29va2llID0+IGNvb2tpZS5rZXkgPT09IGtleSk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaCA/IG1hdGNoLnZhbHVlIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldEl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7a2V5fT0ke3ZhbHVlfTsgcGF0aD0vYDtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JykuZm9yRWFjaChjb29raWUgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXFQb3MgPSBjb29raWUuaW5kZXhPZignPScpO1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVxUG9zID4gLTEgPyBjb29raWUuc3Vic3RyKDAsIGVxUG9zKS50cmltKCkgOiBjb29raWU7XG5cbiAgICAgICAgICAgIGlmIChuYW1lID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUudHJpbSgpLnJlcGxhY2UoLz0uKi8sIGA9O2V4cGlyZXM9JHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9O3BhdGg9L2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcblxuICAgICAgICAvLyBjYWxsIHJlbW92ZSBpdGVtIG9uIGVhY2ggY29va2llXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpLm1hcChjb29raWUgPT4gY29va2llLnNwbGl0KCc9JylbMF0udHJpbSgpKVxuICAgICAgICAgICAgLmZvckVhY2goY29va2llID0+IHRoaXMucmVtb3ZlSXRlbShjb29raWUpKTtcbiAgICB9XG5cbiAgICBnZXRTdXBwb3J0ZWQoKTogU3RvcmFnZUFkYXB0ZXIge1xuICAgICAgICAvLyBjb29raWVzIGFyZSBzdXBwb3J0ZWQgaW4gYWxsIGJyb3dzZXJzXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufSJdfQ==