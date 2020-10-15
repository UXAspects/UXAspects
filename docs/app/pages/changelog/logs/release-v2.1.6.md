UX Aspects 2.1.6 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@2.1.6
```

#### Bug Fixes and Improvements
* (EL-4042) [Tag Input](https://uxaspects.github.io/UXAspects/#/components/input-controls#tags) - dropdown now closes properly when using `ChangeDetectionStrategy.OnPush`.
* (EL-4051) [Input Dropdown](https://uxaspects.github.io/UXAspects/#/components/input-controls#input-dropdown) - clear button now works when `allowNull` is true.
* (EL-4057) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - programmatically setting `layout` now works when using `ChangeDetectionStrategy.OnPush`.
* (EL-4060) ng2-charts is now a peer dependency; install the version that works best for your application.
* (EL-4122) [Column Resizing](https://uxaspects.github.io/UXAspects/#/components/tables#column-resizing) - new `handleVisible` input can be set to false to hide the handle.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
