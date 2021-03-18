UX Aspects 3.5.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@3.5.0
```

#### Documentation
* (EL-4115) [Radio Button](https://uxaspects.github.io/UXAspects/#/components/input-controls#radio-button) - added documentation for `name` input, which is required for proper keyboard control.

#### Bug Fixes and Improvements
* (EL-4204) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - widgets using autoPositioning will return to original position when another widget's resize is cancelled.
* (EL-4210) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - undefined `col` and `row` values are no longer treated as 0.
* (EL-4212) [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - fixed `dropDirection="auto"`.
* (EL-4213) [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - added `autoCloseDropdown` input, which can be set to `false` to prevent the dropdown from closing on external click.
* (EL-4215) [Icon Set](https://uxaspects.github.io/UXAspects/#/css/icons#ux-icons) - new icon: `status-information`.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
