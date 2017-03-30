Angular makes the process of writing single page applications easy with a vast array of useful directives that often negate the need to write any JavaScript at all. However, when pages start to get complex and there are large amounts of data being shown, whether in table form or visually impressive charts, things can begin to slow down and it is often very easy to just blame the framework. While this could be the case, it is much more likely slow code in the application.

Although modern machines often have impressive specs, JavaScript is largely single threaded (with the exception of WebWorkers) and with browsers running at 60 FPS, this gives us ~16ms to run any code in a given frame. On top of that the browser can take ~8ms of that time to calculate layout and render any changes, leaving us with approximately 8ms to work with. If we can’t manage to do everything in that time frame the browser will start dropping frames which can result in a bad user experience.
There are certain things we can do to ensure Angular performs as quickly as it possibly can.

#### One Time Bindings

Any time we provide an Angular directive with a value, it can watch that value for any changes, which is great, as this provides us with a hassle free way to keep our model and view in sync. However in many occasions our data may be immutable, but Angular isn’t aware of this and each time a digest cycle is run, Angular is checking to see if that value has changed when it really doesn't need to. As of Angular 1.3, we can now use one-time bindings, which will provide the directive with an initial value, but will not check again to see if it has changed. To use this feature simply add two colons before any value passed to a directive eg:

```html
<p ng-bind="::vm.message"></p>
```

#### Avoid Interpolation

Angular provides us with a great way to add values from our controller or scope into the view through interpolation. An example of this could be:

```html
<h1>{{ vm.myHeading }}</h1>
```

While very useful, and sometimes unavoidable, interpolation is slow and can often be improved by using `ng-bind` instead.

#### Track By

When using the `ng-repeat` directive consider adding a “track by” key. By adding this, any time the data changes it can determine which items where previously visible and will not create a new element for that item, reducing the amount of DOM manipulation occurring and can significantly reduce the amount of garbage collection the browser needs to do.

```html
<tr ng-repeat="item in vm.items track by item.id">
```

#### \$digest vs \$apply

Most of the time any changes to data in the application will automatically be detected by Angular and the view will be updated, however there can be occasions where this won't happen automatically, such as when modifying data in a `setTimeout` callback. To manually inform Angular that there have been changes we can use `$scope.$apply()` or `$scope.$digest()`. Both of these may appear to do the same thing on the surface, but behind the scenes they are quite different and knowing when to use each one can bring quite a few performance benefits to your application.

`$scope.$digest()` will begin a digest cycle on the current scope, whereas `$scope.$apply()` is essentially an alias for `$rootScope.$digest()`. Once you realize this, you can see that `$scope.$digest()` will limit the dirty checking to the current scope only, reducing the number of checks significantly. Alternatively `$scope.$apply()` will check everything on the page, making it a much more expensive operation, so where possible it is always better to use `$digest` over `$apply`.

#### ng-show vs ng-if

When it comes to showing and hiding DOM elements, Angular gives us two options in the form of `ng-if` and `ng-show` (or `ng-hide`). The `ng-show` directive will hide the element through styling, by setting `display` to `none`. The `ng-if` directive on the other hand will remove the element from the DOM entirely and as well as that will remove any watchers on the element and its children. Due to this fact it is often more performant to use `ng-if` where possible as this avoids performing updates on elements that are not visible to the user.

#### Profiling

Chrome Dev Tools provides excellent facilities to determine what parts of your code are running slowly. The timeline tab allows you to record all code execution and see the time each function took to run.

There are also several Chrome extensions that can help identify issues:

- [Angular Performance](https://chrome.google.com/webstore/detail/angular-performance/hejbpbhdhhchmmcgmccpnngfedalkmkm)

- [Angular Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en)

- [NG Inspect Watchers](https://chrome.google.com/webstore/detail/angularjs-inspect-watcher/gdfcinoagafkodbnkjemaajfahnmfkhg)

- [Web Tracing Framework](https://chrome.google.com/webstore/detail/web-tracing-framework/gmdhhnlkjmknaopofnadmoamhmnlicme)