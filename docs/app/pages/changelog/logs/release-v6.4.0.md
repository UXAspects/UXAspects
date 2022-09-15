UX Aspects 6.4.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@6.4.0
```

#### Bug Fixes and Improvements
* [(530094)](https://internal.almoctane.com/ui/entity-navigation?p=131002/7002&entityType=work_item&id=530094) - [Column Resizing](https://uxaspects.github.io/UXAspects/#/components/tables#column-resizing) - Fixed issue with focus ring when using Column Resizing and Column Sorting.
* [(543001)](https://internal.almoctane.com/ui/entity-navigation?p=131002/7002&entityType=work_item&id=543001) - [Infinite Scroll](https://uxaspects.github.io/UXAspects/#/components/scrollbar#infinite-scroll) - Reset loading state when calling the reset function, to prevent the UI from continually loading.
* [(513141)](https://internal.almoctane.com/ui/entity-navigation?p=131002/7002&entityType=work_item&id=513141) - Accessibility Updates
    - [Input Dropdown](https://uxaspects.github.io/UXAspects/#/components/input-controls#input-dropdown) - Added `ariaLabelledby` input.
    - [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - Added `ariaLabelledby` and `listboxAriaLabel` inputs and made accessibility updates.
    - [Partition Map](https://uxaspects.github.io/UXAspects/#/charts/partition-map#partition-map) - Added aria-label and role to segments.
    - [Radio Button](https://uxaspects.github.io/UXAspects/#/components/input-controls#radio-button) - added `inputRole` to specify role of input element.
    - [Tags](https://uxaspects.github.io/UXAspects/#/components/input-controls#tags) - Added `ariaLabelledby` input and made accessibility updates.
    - [Typeahead](https://uxaspects.github.io/UXAspects/#/components/input-controls#typeahead) - Added `ariaLabel` input.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
