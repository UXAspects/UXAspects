UX Aspects ${version-number} is available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### New Features
* Angular 7 - UX Aspects should now be usable in Angular 7 projects. Note that Angular 5 continues to be supported; therefore the `rxjs-compat` dependency should not be removed at this time.
* [Icons](https://uxaspects.github.io/UXAspects/#/css/icons#ux-icons) - "filled" variants of several icons have been added.

#### Bug Fixes and Improvements
* (EL-3273) [Spark](https://uxaspects.github.io/UXAspects/#/charts/spark-charts#spark-charts) - updated `aria-label` property to accept an array of strings to support multi-value sparks.
* (EL-3288) [Fixed Header Table](https://uxaspects.github.io/UXAspects/#/components/tables#fixed-header-table) - `dataset` property and `setLayout` function have been added to support updating the header when the width of the table body changes (e.g. when a scrollbar appears).
* (EL-3289) [Popover](https://uxaspects.github.io/UXAspects/#/components/popover#popover) - added `alignment` property which allows alternative positions for the callout arrow.
* (EL-3293) [Tree Grid (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid-ng1) - added `expandedProperty` to options which allows the expanded state of rows to be bound to the original data object. This enables setting the initial expanded state, and persisting the expanded state through reloads.
* (EL-3294) [Facets](https://uxaspects.github.io/UXAspects/#/components/facets) - selected facets can be changed externally.

#### Dependencies
In this release, the third party component documented in the [Tree View](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-view) section has been changed to a peer dependency. If you use this component, run `npm install --save angular-tree-component` to keep the dependency up to date in your project. (Note that in newer versions the module should be imported as `TreeModule.forRoot()`.)

There has been a release of the third party component documented in the [Splitter](https://uxaspects.github.io/UXAspects/#/components/splitter#splitter) section which contains breaking changes. If you encounter any issues with the splitter, check the version with `npm ls angular-split`. The only supported version currently is `1.0.0-rc.3`.