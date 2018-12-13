UX Aspects 1.7.1 is available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Bug Fixes and Improvements
* (EL-3041) [Spark (AngularJS)](https://uxaspects.github.io/UXAspects/#/charts/spark-charts#spark-chart-ng1) - separate tooltips can now be specified for multi-value segments using the `spark-tooltips` attribute.
* (EL-3304) [Date & Time Picker (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/date-time-picker#integrated-date-picker-ng1) - added support for `left` and `right` placement of the popover.
* (EL-3311) [Select List](https://uxaspects.github.io/UXAspects/#/components/select#select-list) - `selectedChange` event should now fire only once per selection change.
* (EL-3313) [Column Resizing](https://uxaspects.github.io/UXAspects/#/components/tables#column-resizing) - resolved issues with adding/removing columns.
* (EL-3315) [Tree Grid (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid-ng1) - when using checkboxes to select, indeterminate state can be displayed using the new `select.indeterminate` option.
* (EL-3316) `ng1/ux-aspects-ng1.js` is no longer incorrectly minified; use `ng1/ux-aspects-ng1.min.js` to consume the minified version of the AngularJS library.
* (EL-3317) [Tree Grid (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid-ng1) - added a `disabled` option, which can be used to prevent rows from being selected.

#### Dependencies
`@angular/cdk` is now a peer dependency of UX Aspects, so run `npm install --save-dev @angular/cdk` if your project does not already have it as a dependency.

Any questions or feedback? Get in touch on Twitter [@UXAspects](https://twitter.com/UXAspects), open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues), or check our [blog](https://uxaspects.github.io/UXAspects/#/blog) for more information!
