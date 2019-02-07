UX Aspects 1.7.5 is available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Documentation
* (EL-3001) [Link Button](https://uxaspects.github.io/UXAspects/#/css/buttons#link-buttons) - added primary link button.

#### Bug Fixes and Improvements
* (EL-3373) Resize - fixed an issue causing this directive to throw an error when destroyed immediately after initialization.
* (EL-3376) [Notifications](https://uxaspects.github.io/UXAspects/#/components/notifications#notifications) - notification height is no longer fixed, and depends upon the height of its content.
* (EL-3377) [Column Resizing](https://uxaspects.github.io/UXAspects/#/components/tables#column-resizing) - added an `updateLayout` function to `uxResizableTable` which can be used to programmatically realign the column headers.
* (EL-3378) [Toolbar Search](https://uxaspects.github.io/UXAspects/#/components/search#toolbar-search) - new `alwaysExpanded` property added.
* (EL-3383) [Search Builder (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/search#search-builder-ng1) - `buttonText` and `addField` properties now accept array values, allowing more than one "add" button to be created.
* (EL-3385) [Selection](https://uxaspects.github.io/UXAspects/#/components/tables#selection) - resolved an "expression changed after checked" error.
* (EL-3387) [Tree Grid (AngularJS)](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid-ng1) - watchers and event listeners are now correctly destroyed along with the directive.

#### Seed Project
* (EL-3382) Fixed an issue where the app and the tests shared the same `root` config value.

Any questions or feedback? Get in touch on Twitter [@UXAspects](https://twitter.com/UXAspects), open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues), or check our [blog](https://uxaspects.github.io/UXAspects/#/blog) for more information!
