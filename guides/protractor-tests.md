# Protractor Tests

Protractor is used to execute the end-to-end test suite for UX Aspects.

## Building UXAspects

The Protractor tests require assets created when UX Aspects is built.

- In the 'UXAspects' folder run the commands `npm ci` and `grunt build`.

## Running the Protractor tests

- In the 'UXAspects' folder run the command `grunt e2e`. Results files will be created in the e2e/HTML and e2e/xml folders.

## Adding a new test

Create a test page

- Create a folder under e2e/pages/app. In the folder create a HTML file and a TypeScript file defining the components to be tested.

- Edit e2e/pages/app.module.ts. Import the new test page component. Add the component to the 'ROUTES' and 'declarations' arrays.

Create the new tests

- Create a folder for the tests under e2e/tests.

- Create a PageObject file (named xxxxxx.po.spec.ts) to wrap access to controls on the test page.

- Create a file (names xxxxxx.e2e-spec.ts) containing the Jasmine-based tests. The tests should access elements in the test page through exports from the PageObject file.

## Executing tests in different browsers

By default, tests will be executed in the Chrome browser. To test in other browsers uncomment the appropriate line in the 'capabilities' object in e2e/protractor.config.js. Only one browser may be tested at a time.

## Useful links

Protractor Tutorials
<http://www.protractortest.org>

