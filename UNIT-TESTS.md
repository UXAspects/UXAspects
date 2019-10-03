# Unit Tests

UX Aspects components are covered by unit tests written using the Jasmine framework. The code can be found in the `.spec.ts` files alongside each component. The tests can be run using `grunt test` from the command line, or by opening the `_SpecRunner.html` file in the browser.

Unit tests will always be verified before a pull request is approved.

## Writing Unit Tests

### AngularJS

There are two approaches to writing unit tests for the AngularJS components of UX Aspects. Firstly, one can create a fragment of markup representing the component, along with a custom scope containing any variables to be bound, and use the Angular `$compile` service to create an appropriate DOM fragment. jQuery can then be used to issue clicks, keypresses, and other events, and subsequently check the expected state of the DOM. This approach overlaps with the Selenium browser tests, and therefore is not currently the preferred approach.

The second method is to instantiate the component's controller directly. This can be achieved by again creating a custom scope with the variables to be bound by the component, and then using the Angular `$controller` service to instantiate the controller with the provided scope. Instead of sending clicks or keypresses, the controller methods are invoked directly, and changes to the bindings and controller state are verified.

### Angular 2

Tests for Angular 2 components will use the `TestBed` API to create an instance of the component. Within a test, the `ngOnInit()` function is called to initialize the component. After this, the component's functions and properties can be tested as normal.

See also [Testing Components in Angular 2 with Jasmine](https://semaphoreci.com/community/tutorials/testing-components-in-angular-2-with-jasmine).

### Guidelines

Tests are broken up into logical groups using the `describe` function. The advantage of this is that different preconditions can be set up in the `beforeEach` function for each `describe` group. This is preferable to setting up new data within the function itself.

Any dependencies should be mocked, and those dependencies should have their own unit tests if they are part of UX Aspects.

Tests should establish preconditions for anything that is being tested. For example, if the result of a particular action is to set a property to false, the property should be confirmed as being set to true before the action occurs.

Each test should cover a single use case. Use the `beforeEach` function to avoid repetition of setup code.

A good way to approach laying out tests is to consider a typical use case, edge cases, and error cases. For example, number picker control may verify that the minimum and maximum values may be correctly provided, and that entering out-of-range numbers and non-numeric values cause an appropriate error state.

Whenever a bug is fixed, it is good to consider whether that can become a unit test.
