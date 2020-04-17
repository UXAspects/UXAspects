UX Aspects 2.0.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects-2](https://uxaspects.github.io/UXAspects-2).

#### Installation
````bash
npm install @ux-aspects/ux-aspects@2.0.0
````

#### New Features
* Angular 9 is now supported.

#### Breaking Changes (from UX Aspects 1.x)
* Angular 6 is no longer supported.
* AngularJS components and `HybridModule` have been removed, and from now on must be imported from `@ux-aspects/ux-aspects-ng1`. Refer to the [UX Aspects (AngularJS) documentation](https://uxaspects.github.io/UXAspects-ng1/#/changelog) for details.
* The `dist` folder has now been removed from the published package. Any import paths referring to `@ux-aspects/ux-aspects/dist/...` can be replaced with `@ux-aspects/ux-aspects/...`.
* With the removal of AngularJS components, all dependencies are now resolved through NPM and the package no longer contains third party code; therefore the Licenses file has been removed.
* All styles relating to AngularJS components have been removed. These styles are available in the `@ux-aspects/ux-aspects-ng1` package if required.
* Removed [Angular i18n](https://angular.io/guide/i18n) attributes. Localizable text is now provided via inputs:
    * Color Picker
        * `colorAriaLabel`
        * `switchModeAriaLabel`
        * `inputAriaLabel`
    * Facet Container
        * `clearAriaLabel`
        * `deselectFacetAriaLabel`
    * Media Player
        * `muteAriaLabel`
        * `playAriaLabel`
        * `fullscreenAriaLabel`
        * `selectSubtitlesAriaLabel`
        * `goToStartAriaLabel`
        * `goToEndAriaLabel`
        * `subtitlesTitleAriaLabel`
        * `subtitlesOffAriaLabel`
        * `noSubtitlesAriaLabel`
        * `mediaPlayerAriaLabel`
        * `seekAriaLabel`
    * Item Display Panel
        * `closeAriaLabel`
    * Filter
        * `clearAriaLabel`
* Removed the following deprecated inputs/outputs:
    * Tabs
        * `select`
        * `deselect`
    * Page Header
        * `familyBackground`
        * `familyForeground`
        * `titleTemplate`
    * Item Display Panel
        * `title`
    * Marquee Wizard
        * `icon`
    * Floating Action Button
        * `icon`
    * Tag Input
        * `trackAriaDescendant`
* Updated the [angular-split](https://bertrandg.github.io/angular-split/#/documentation) dependency, which provides the splitter functionality. Two selectors have changed with this update:
    * `split` is now `as-split`
    * `split-area` is now `as-split-area`
* `label` no longer has a 5px bottom margin by default.
* Any component that extends `ConduitZoneComponent` must now manually call `super.ngOnInit()` and `super.ngOnDestroy()` if the component is using those lifecycle hooks.

#### Known Issues
The 2.0.0 release of UX Aspects contains features and bug fixes in line with UX Aspects 1.8.16. UX Aspects 2.0.1 will include the remaining 1.x changes (in line with 1.8.18).
* Infinite Scroll - does not load items if the promise returns almost immediately.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects-2/issues)!
