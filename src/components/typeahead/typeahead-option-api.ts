/**
 * The API available to option templates.
 */
export interface TypeaheadOptionApi<T = any> {
    /**
     * Returns the unique key value of the given option.
     */
    getKey(option: T): string;
    /**
     * Returns the display value of the given option.
     */
    getDisplay(option: T): string;
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value. Override the ux-filter-match class in CSS to modify the default appearance.
     */
    getDisplayHtml(option: T): string;
}
