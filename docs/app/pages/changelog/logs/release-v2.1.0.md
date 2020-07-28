UX Aspects 2.1.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@2.1.0
```

#### New Features
* (EL-3986) Angular 10 support, and removal of support for Angular 7.

#### Bug Fixes and Improvements
* (EL-3831) [Number Picker](https://uxaspects.github.io/UXAspects/#/components/input-controls#number-picker) - the scroll wheel now only modifies the number picker value when the control has focus.
* (EL-3972) [Dropdown Menu](https://uxaspects.github.io/UXAspects/#/components/buttons#dropdowns) - new `(activate)` output can be used to hook both mouse click and enter key events on a `uxMenuItem`.
* (EL-3989) [Number Picker](https://uxaspects.github.io/UXAspects/#/components/input-controls#number-picker) - new `placeholder` input.
* (EL-4001) [Tree Grid](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid) - fixed an endless loop which could occur when programmatically setting the `expanded` state.
* (EL-4010) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - fixed an issue which prevented widgets from being dragged.
* (EL-4012) [Marquee Wizard](https://uxaspects.github.io/UXAspects/#/components/wizard#marquee-wizard) - fixed an issue affecting steps which are loaded after initialization.

#### Compatibility Notice
[The Angular Package Format no longer includes ESM5 or FESM5 bundles](https://blog.angular.io/version-10-of-angular-now-available-78960babd41), which means that the Angular 10 packages can no longer be loaded in Internet Explorer without downlevelling. Because of this, our Plunker examples will no longer load in Internet Explorer.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
