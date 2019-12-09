UX Aspects 2.0.0 beta 5 is now available! Check out the beta documentation at [uxaspects.github.io/UXAspects-2](https://uxaspects.github.io/UXAspects-2).

#### Installation
````bash
npm install @ux-aspects/ux-aspects@2.0.0-beta.5
````

#### Breaking Changes (from UX Aspects 1.x)
* AngularJS components and `HybridModule` have been removed, and from now on must be imported from `@ux-aspects/ux-aspects-ng1`. Refer to the [UX Aspects (AngularJS) documentation](https://uxaspects.github.io/UXAspects-ng1/#/changelog) for details.
* The `dist` folder has now been removed from the published package. Any import paths referring to `@ux-aspects/ux-aspects/dist/...` can be replaced with `@ux-aspects/ux-aspects/...`.
* With the removal of AngularJS components, all dependencies are now resolved through NPM and the package no longer contains third party code; therefore the Licenses file has been removed.
* All styles relating to AngularJS components have been removed. These styles are available in the `@ux-aspects/ux-aspects-ng1` package if required.

#### Known Issues
* The 2.0.0 beta documentation site currently has no showcase content.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects-2/issues)!
