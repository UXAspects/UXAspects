UX Aspects 2.1.3 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@2.1.3
```

#### Bug Fixes and Improvements
* (EL-3748) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - widgets can now be dragged in stacked mode.
* (EL-3905) [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - the dashboard layout algorithm can now be invoked programmatically with the `refreshLayout` function.
* (EL-3926) [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - options in the dropdown are now correctly disabled after selecting in multiple select mode.
* (EL-3934) [Dropdown Menu](https://uxaspects.github.io/UXAspects/#/components/buttons#dropdowns) - `click` and other events are no longer emitted on the menu button when `disabled` is set to true.
* (EL-3957) [Filters](https://uxaspects.github.io/UXAspects/#/components/tables#filters) - the `Filter` type now has an optional `id` property, allowing `id`s to be applied to filter menu items.
* (EL-4061) [Tag Input](https://uxaspects.github.io/UXAspects/#/components/input-controls#tags) - input field no longer loses focus when clicking on the typeahead scrollbar.
* (EL-4083) [Selection](https://uxaspects.github.io/UXAspects/#/components/tables#selection) - `selectedChange` now emits only after user actions that change the selection.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
