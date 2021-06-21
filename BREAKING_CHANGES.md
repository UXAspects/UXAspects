# 3.x to 4.0
* Angular 9 is no longer supported.
* The `hpe-*` icon set has been removed. Use the `ux-icon` component instead.
* The `valid` input has been removed from `ux-number-picker`. Use Angular form validation instead.

# 2.1.x to 3.0
* Angular 8 is no longer supported.
* If you are using ng2-file-upload and ngx-mask packages in your application, you will need to install manually.
* The package for `angular-tree-component` has been renamed.
    1. Run `npm remove angular-tree-component` and run `npm install @circlon/angular-tree-component`.
    1. Replace all imports of the deprecated package with `@circlon/angular-tree-component`.
    1. Add the angular tree component stylesheet to the `angular.json` file. See [Getting Started](https://github.com/CirclonGroup/angular-tree-component#getting-started) for details.

# 1.8.x to 2.0
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
