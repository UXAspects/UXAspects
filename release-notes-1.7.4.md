UX Aspects 1.7.4 is available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### New Features
* [Alert](/#/components/notifications#alert)
* [Focus Indicator](/#/components/utilities#focus-indicator) - new directive which can be added to focusable elements to control the appearance of the focus ring when clicking. This has also been enabled in the following components, with more to be added in future releases:
    * [Buttons](https://uxaspects.github.io/UXAspects/#/css/buttons) (import `AccessibilityModule` to enable on native HTML buttons)
    * [Accordion](https://uxaspects.github.io/UXAspects/#/components/panels#accordion)
    * [Tabs](https://uxaspects.github.io/UXAspects/#/components/tabs#tabs)

#### Bug Fixes and Improvements
* (EL-3339) [Floating Action Button](https://uxaspects.github.io/UXAspects/#/components/buttons#floating-action-button) - resolved an "expression changed after checked" error.
* (EL-3343) [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - shift-tab now allows focus to leave the component.
* (EL-3344) [Tabbable List](https://uxaspects.github.io/UXAspects/#/components/utilities#tabbable-list) - added the `key` property to resolve issues when using this directive within a [Virtual Scroll](https://uxaspects.github.io/UXAspects/#/components/scrollbar#virtual-scroll) container.
* (EL-3356) [Marquee Wizard (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/wizard#marquee-wizard-ng1) - added support for custom templates to be specified in the step list using the new `stepTemplateUrl` property; Angular version also updated with this feature.
* (EL-3358) [Number Picker](https://uxaspects.github.io/UXAspects/#/components/input-controls#number-picker) - `id` can now be specified for the inner `input` as well as the component itself.
* (EL-3361) [Tree View](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-view) - fixed a focus issue with the example code.
* (EL-3364) [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - updated the dropdown toggling behavior to be similar to the native `select`.
* (EL-3366) [Tabs](https://uxaspects.github.io/UXAspects/#/components/tabs#tabs) - resolved an "expression changed after checked" error (reported as an issue with the Masthead).
* (EL-3367) [Hierarchy Bar](https://uxaspects.github.io/UXAspects/#/components/hierarchy-bar#hierarchy-bar) - new `collapsed` mode, and new template options for customizing the loading indicator and the overflow area.
* (EL-3368) [Tree View (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-view-ng1) - added support for HTML within tooltips.
* (EL-3370) [Spark (AngularJS)](https://uxaspects.github.io/UXAspects/#/charts/spark-charts#spark-chart-ng1) - multi-value spark now updates when the source data changes.

Any questions or feedback? Get in touch on Twitter [@UXAspects](https://twitter.com/UXAspects), open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues), or check our [blog](https://uxaspects.github.io/UXAspects/#/blog) for more information!
