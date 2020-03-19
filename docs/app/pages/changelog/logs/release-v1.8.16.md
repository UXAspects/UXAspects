UX Aspects 1.8.16 is available! Check out the documentation at [uxaspects.github.io/UXAspects](https://uxaspects.github.io/UXAspects).

#### Bug Fixes and Improvements
* (EL-3734) [Select](https://uxaspects.github.io/UXAspects/#/components/select#select) - fixed several issues which could occur when an initial value is set.
* (EL-3780) [Checkbox](https://uxaspects.github.io/UXAspects/#/components/input-controls#checkbox), [Radio Button](https://uxaspects.github.io/UXAspects/#/components/input-controls#radio-button), [Toggle Switch](https://uxaspects.github.io/UXAspects/#/components/input-controls#toggle-switch) - eliminated some duplicate `valueChange` events.
* (EL-3786) [Tooltip](https://uxaspects.github.io/UXAspects/#/components/tooltips#tooltips) - fixed an error that could occur if the component is destroyed before the tooltip is shown.
* (EL-3794) [Column Sorting](https://uxaspects.github.io/UXAspects/#/components/tables#column-sorting) - added `order` and `orderChange` to allow column sorting state to be saved and restored.
* (EL-3803) [Date Range Picker](https://uxaspects.github.io/UXAspects/#/components/date-time-picker#date-range-picker) - fixed an error which could occur when the picker is closed and immediately destroyed.
* (EL-3810) [Filter](https://uxaspects.github.io/UXAspects/#/components/tables#filters) - now displays both the column name and selected value.
* (EL-3811) [Notifications](https://uxaspects.github.io/UXAspects/#/components/notifications#notifications) - added `remove` and `removeAll` functions to `NotificationService` to allow cleanup of the history list.
* (EL-3812) [Number Picker](https://uxaspects.github.io/UXAspects/#/components/input-controls#number-picker) - eliminated some duplicate `valueChange` events.
* (EL-3813) [Column Sorting](https://uxaspects.github.io/UXAspects/#/components/tables#column-sorting) - added `allowNoSort` which can be used to disable user selection of the `NoSort` state.
* (EL-3815) [Wizard](https://uxaspects.github.io/UXAspects/#/components/wizard#wizard) - added `validator` input which can be used to perform asynchronous validation on a wizard step when clicking Next or Finish.

Any questions or feedback? Get in touch on Twitter [@UXAspects](https://twitter.com/UXAspects), open an issue on [GitHub](https://github.com/UXAspects/UXAspects/issues), or check our [blog](https://uxaspects.github.io/UXAspects/#/blog) for more information!
