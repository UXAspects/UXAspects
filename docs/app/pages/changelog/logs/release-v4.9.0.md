UX Aspects 4.9.0 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@4.9.0
```

#### Bug Fixes and Improvements
* (EL-4273) Accessibility Updates
  * [Page Header](https://uxaspects.github.io/UXAspects/#/components/page-header) - Removed aria-selected attributes which aren't supported with the menuItem role.
  * [Column Resizing](https://uxaspects.github.io/UXAspects/#/components/tables#column-resizing) - Added the separator role, aria-valuenow and aria-valuemin to the drag handles.
  * [Number Picker](https://uxaspects.github.io/UXAspects/#/components/input-controls#number-picker) - Removed aria-valuemin and aria-valuemax when no min and max value is provided respectively.
  * [Dashboard](https://uxaspects.github.io/UXAspects/#/components/dashboard#dashboard) - Added configurable roles to the dashboard and widgets.
  * [Accordion](https://uxaspects.github.io/UXAspects/#/components/panels#accordion) - Removed tablist and tab role form the accordion as these aren't supported with interactive elements, and added the aria-disabled attribute when the accordion item is disabled.
  * [Spark Chart](https://uxaspects.github.io/UXAspects/#/charts/spark-charts#spark-charts) - Added aria-labels to elements with progressbar role.
* (EL-4274) [Dropdown Menu](https://uxaspects.github.io/UXAspects/#/components/buttons#dropdowns) - The alignment property can be used without needing the placement property defined.
* (EL-4276) [Dropdown Menu](https://uxaspects.github.io/UXAspects/#/components/buttons#dropdowns) - uxMenuItems now support anchor tags using href links.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!