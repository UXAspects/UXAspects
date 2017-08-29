Unit tests test the smallest level of functionality e.g. the result of executing a method. End-to-end (E2E) tests build on unit tests by combining units of code and testing that the resulting combination functions correctly. They test a particular feature for correctness by comparing the results for a given input against the specification e.g. 'pressing button X should result in checkbox Y becoming disabled'.

Protractor is an end-to-end, open source test framework for Angular. It uses the Jasmine framework by default and runs on top of Selenium WebDriver. Tests may be run against a local Selenium server or against a remote server e.g. a Selenium Grid system. Tests may be written in JavaScript and TypeScript.

The UXAspects project includes a suite of E2E tests in the 'e2e' folder of the project repository.

### Installation

Install [Node.js](https://nodejs.org/), which provides the npm package manager.

Execute the command `npm install -g grunt-cli` to install the grunt command line interface.

Follow the instructions in the "Building from Source" section in the [Getting Started](https://uxaspects.github.io/UXAspects/#/gettingstarted) page of the UX Aspects documentation to build the components to be tested.

Before the first test run, execute `./node_modules/.bin/webdriver-manager update` to download the binaries necessary to get an instance of the Selenium Server running.

Execute the command `grunt e2e` to run the tests.

### Architecture

All Protractor methods are asynchronous and return promises. WebDriver maintains a queue of pending promises called the control flow. Promises are queued and resolved in the order they were created in.

In our tests, elements are located on the test page by using 'by.ID' and 'by.CSS' locators.

The Protractor global elements() function takes a locator for an element and returns that element. When using CSS selectors as a locator, the shortcut $() notation may be used. For example, `checkbox1.$('div .ux-checked')` is the same as `checkbox1.element(by.css('div .ux-checked'))`.

Multiple DOM elements may be found using the global element.all() function. As with single elements, a shortcut notation, $$(), may be used. For example `textsContainer.$$('em').get(1)` is the same as `textsContainer.elements.all(by.css('em').get(1))` and returns the second of an array of 'em' elements.

### Test organisation

#### HTML files

The components being tested are grouped in HTML pages under the e2e/pages folder.

The tests to be run against these pages are found under the e2e/tests folder.

The e2e/protractor.config.js configuration file defines the location of the test files to be executed (in the 'specs' property) and the URL for the Selenium server. The browser the tests are to run in is defined in the 'capabilities' property (at the moment tests are run only in Chrome).

#### Page Objects

When writing Protractor tests, it is good practice to place information about the location of elements in 'page object' files, separate from the definitions of the tests themselves.

A page object is a class that serves as an interface to the UI page being tested. The tests then use the methods of this class whenever they need to interact with that page.

Encapsulating this information in a separate file means that if the organization of the page being tested changes, only the code within the page object needs to change. The tests themselves can remain unchanged. In addition, the Protractor-specific terms used to locate elements on the page are restricted to the page object files, making the test specification files easier to read.
 
#### Test specifications

The test instructions themselves are written using Jasmine syntax in test specification files. The page object class is exported from the page object file and imported into the test specification file.

### Results

A variety of reporter classes are available to format tests results. Our e2e project outputs results to XML and HTML files. Further information about the reporters may be obtained at [https://github.com/larrymyers/jasmine-reporters](https://github.com/larrymyers/jasmine-reporters).

### Example Test

To illustrate the organization of our Protractor tests, here is a simplified version of the tests for our Checkbox component.

#### HTML file containing components to be tested

Some checkboxes and associated elements are displayed in the HTML file to be tested ([e2e\pages\app\checkbox\checkbox.testpage.component.html](https://github.com/UXAspects/UXAspects/blob/develop/e2e/pages/app/checkbox/checkbox.testpage.component.html)).


```html
<div>
    <ux-checkbox id="checkbox1" [(value)]="checkModel.option1" [disabled]="disableCheck" 
        [simplified]="simplified">Option1
    </ux-checkbox>
</div>

<div>
    <ux-checkbox id="checkbox2" [(value)]="checkModel.option2" [indeterminateValue]="indeterminateValue"
        [simplified]="simplified">Option2
    </ux-checkbox>
</div>

<div>
    <button  id="button1" class="btn button-primary m-r-xs" 
        (click)="disableCheck = !disableCheck">
        {{ disableCheck ? 'Click to enable Option1' : 'Click to disable Option1' }}
    </button>
</div>
```

#### Page object file

The page object file for the tests defines an interface to be used to access the elements in the test page ([e2e\tests\components\checkbox\checkbox.po.spec.ts](https://github.com/UXAspects/UXAspects/blob/develop/e2e/tests/components/checkbox/checkbox.po.spec.ts)).

```javascript
import { browser, element, by, ElementFinder } from 'protractor';
export class CheckBoxesPage {
        
    getPage(): void {
        browser.get('/checkboxes');
    }
    
    checkbox1 = element(by.id('checkbox1'));
    checkbox2 = element(by.id('checkbox2'));
    disableButton = element(by.id('button1'));
    
    confirmIsChecked(checkbox: ElementFinder) {    
        return checkbox.$('div.ux-checked').isPresent();
    }
    
    confirmIsDisabled(checkbox: ElementFinder) {
        return checkbox.$('div.ux-disabled').isPresent();
    }
}
```

#### Test specification file

The tests specification file ([e2e\tests\components\checkbox\checkbox.e2e-spec.ts](https://github.com/UXAspects/UXAspects/blob/develop/e2e/protractor.config.js)) uses the page object class to access the elements on the page being tested. The tests use Jasmine syntax to check the values associated with elements (e.g. `'expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy()'`) and to perform operations on elements e.g. (`'page.disableButton.click()'`).


```javascript
import { browser, Key } from 'protractor';
import { CheckBoxesPage } from './checkbox.po.spec';

describe('Checkbox Tests', () => {

  let page: CheckBoxesPage;
  let browserName: string;

  beforeEach(() => {
    page = new CheckBoxesPage();
    page.getPage();
  });

  it('should have correct initial states', () => {    
    // Initial values.
    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();
    expect(page.confirmIsChecked(page.checkbox2)).toBeFalsy();

    // All enabled.
    expect(page.confirmIsDisabled(page.checkbox1)).toBeFalsy();
    expect(page.confirmIsDisabled(page.checkbox2)).toBeFalsy();
  });

  it('should react to clicks', () => {
    page.checkbox2.click();
    expect(page.confirmIsChecked(page.checkbox2)).toBeTruthy();
    page.checkbox1.click();
    expect(page.confirmIsChecked(page.checkbox1)).toBeFalsy();
  });

  it('should react to disabling', () => {
    page.disableButton.click();
    expect(page.confirmIsDisabled(page.checkbox1)).toBeTruthy();
    page.checkbox1.click();
    expect(page.confirmIsChecked(page.checkbox1)).toBeTruthy();
  });
}
```

### Further reading

More details about Protractor may be obtained at [http://www.protractortest.org/#/toc](http://www.protractortest.org/#/toc).


