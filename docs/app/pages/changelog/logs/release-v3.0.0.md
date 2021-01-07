UX Aspects 3.0.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@3.0.0
```

#### New Features
* (EL-4173) Angular 11 support, and removal of support for Angular 8.

#### Bug Fixes and Improvements
* (EL-3314) `ng2-file-upload` and `ngx-mask` are no longer installed with UX Aspects by default.
* (EL-4074) Updated the peer dependency for `angular-tree-component` to its successor, `@circlon/angular-tree-component`.
* (EL-4175) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - `col` and `row` inputs can be used to reposition widgets after initialization.

#### Breaking Changes (from UX Aspects 2.1.x)
* Angular 8 is no longer supported.
* If you are using `ng2-file-upload` and `ngx-mask` packages in your application, you will need to install them manually.
* The package for `angular-tree-component` has been renamed.
    1. Run `npm remove angular-tree-component` and run `npm install @circlon/angular-tree-component`.
    1. Replace all imports of the deprecated package with `@circlon/angular-tree-component`.
    1. Add the angular tree component stylesheet to the `angular.json` file. See [Getting Started](https://github.com/CirclonGroup/angular-tree-component#getting-started) for details.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
