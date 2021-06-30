UX Aspects 4.0.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@4.0.0
```

#### New Features
* (EL-4243) Angular 12 support.

#### Bug Fixes and Improvements
* (EL-4238) [Menu](https://uxaspects.github.io/UXAspects/#/components/buttons#dropdowns) - placement can now be changed after initialization.
* (EL-4241) [Date Range Picker](https://uxaspects.github.io/UXAspects/#/components/date-time-picker#date-range-picker) - fixed a "Missing locale data" error.
* (EL-4253) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - fixed an issue where widgets could overlap when moving.

#### Breaking Changes (from UX Aspects 3.x)
* Angular 9 is no longer supported.
* The `hpe-*` icon set has been removed. Use the `ux-icon` component instead.
* The `valid` input has been removed from `ux-number-picker`. Use Angular form validation instead.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
