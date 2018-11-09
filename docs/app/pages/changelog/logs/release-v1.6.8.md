UX Aspects 1.6.8 is available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### New Features
* Accessibility (WCAG 2.0 AA level):
    * [Dashboard]({{baseUrl}}/#/components/dashboard#dashboard)
    * [Spark Chart]({{baseUrl}}/#/charts/spark-charts#spark-charts)

#### Documentation
* [Split Button Dropdown]({{baseUrl}}/#/components/buttons#split-button-dropdowns) - updated with Angular compatible example code.
* Updated code examples for accessibility (WCAG 2.0 AA level):
    * [Charts]({{baseUrl}}/#/charts/bar-charts)

#### Bug Fixes and Improvements
* (EL-3275) [Column Resizing]({{baseUrl}}/#/components/tables#column-resizing) - two-way binding of the column width has been added; the documentation example has been updated to demonstrate this.
* (EL-3278) [Select List]({{baseUrl}}/#/components/select#select-list) - selection can be modified externally by updating the `selection` array.
* (EL-3291) [Select (AngularJS)]({{baseUrl}}/#/components/select#select) - fixed some errors which occurred when using objects as a data source.
* (EL-3299) [Tree Grid (AngularJS)]({{baseUrl}}/#/components/tree-view#tree-grid-ng1) - `selected` array is now two-way bindable, allowing external modification of the selected rows; additionally, the `multipleSelectProvider` instance can be obtained using the `selection-manager` binding.

#### Angular 7
[Angular 7](https://blog.angular.io/version-7-of-angular-cli-prompts-virtual-scroll-drag-and-drop-and-more-c594e22e7b8c) has been released, and UX Aspects will support this in the next release. Check the [Angular update tool](https://update.angular.io/) if you are planning to upgrade.

Any questions or feedback? Get in touch on Twitter [@UXAspects](https://twitter.com/UXAspects), open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues), or check our [blog](https://uxaspects.github.io/UXAspects/#/blog) for more information!
