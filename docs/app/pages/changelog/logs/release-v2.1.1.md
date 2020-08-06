UX Aspects 2.1.1 is now available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Installation
```bash
npm install @ux-aspects/ux-aspects@2.1.1
```

#### Bug Fixes and Improvements
* (EL-4014) [Column Picker](https://uxaspects.github.io/UXAspects/#/components/tables#column-picker) - the `deselected` binding is once again updated after selecting columns.
* (EL-4014) [Column Picker](https://uxaspects.github.io/UXAspects/#/components/tables#column-picker) - the type of the `selected` binding has changed to `ReadonlyArray<string | ColumnPickerGroupItem>`, so that it is compatible with the data provided to the `deselected` binding.
* (EL-4014) [Column Picker](https://uxaspects.github.io/UXAspects/#/components/tables#column-picker) - the list of deselected columns is no longer sorted by default; the `sort` input is now available to restore that functionality if needed.
* (EL-4023) [Tree Grid](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid) - resolved another performance issue.
* (EL-4023) [Tree Grid](https://uxaspects.github.io/UXAspects/#/components/tree-view#tree-grid) - deprecated the unused `rows` input; see example code for the new recommended way to bind the tree grid rows.

Any questions or feedback? Feel free to open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues)!
