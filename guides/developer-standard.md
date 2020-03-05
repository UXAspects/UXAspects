# Developer Standard

## Writing Angular Components

This is a guide on how you should write Angular components.

The following syntax should be used:

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'ux-sample',
    templateUrl: './sample.component.html'
})
export class SampleComponent {
    constructor() {}
}
```

### Naming Convention

Files and folders should be named using lower kebab case, with each component file following the format `name.component.ext` (replacing name with the component `name` and `ext` with the associated file extension).

An example folder structure would be:

```
components
-- spark
---- spark.component.ts
---- spark.component.html
---- spark.component.less
---- spark.module.ts
---- index.ts
-- flippable-card
---- flippable-card.component.ts
---- flippable-card.component.html
---- flippable-card.component.less
---- flippable-card.module.ts
---- index.ts
```

### Component Decorator

- The selector should always be prefixed with `ux-` (any documentation specific components should be prefixed with `uxd-`), this will help avoid any potential conflicts with selectors in other libraries of a user's application.
- Exclude `moduleId` property. The Angular component interface has a field for `moduleId` which is used to support relative paths, primarily for SystemJS module loader to load templates and stylesheets. As part of our build process we inline templates to allow us to support the most common bundlers and module loaders so this property is not required.
- Template urls should begin with a `./` to ensure they are relative paths.
- Use the tag element instead of wrapping in a container element. The tag element can be styled and have events and bindings using the `:host` property in the decorator (or using a HostListener).
- Define inputs and outputs in class rather than in component metadata.

### Component Module

Each component should have its own module file that will import everything it requires, export the component so other modules can use it and declare the component.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleComponent } from './sample.component';

@NgModule({
  imports:      [ CommonModule ],
  exports:      [ SampleComponent ],
  declarations: [ SampleComponent ]
})
export class SampleModule { }
```

> **Note**: In the example above we import the `CommonModule`, this is required if we need to use Angular's built in directives such as `ngFor` and `ngIf` in our component template.

### Component Index

Each component should have an index.ts file in its folder. This should export each component or service class associated with the component to allow consumers to import any classes they need for things like dependency injection. e.g.:

```typescript
export * from './spark.module';
export * from './spark.component';
```

It is also very important to export the component `index.ts` file from the root `index.ts` file e.g.:

```typescript
/*
  Export Modules, Components & Services
*/
export * from './components/checkbox/index';
export * from './components/ebox/index';
export * from './components/flippable-card/index';
export * from './components/progressbar/index';
export * from './components/radiobutton/index';
export * from './components/spark/index';
export * from './components/toggleswitch/index';
export * from './services/color/index';
```

This allows consumers to import from `@ux-aspects/ux-aspects` rather than having to specify the full path of the class.

### Component Class

- The class name should consist of the component name followed by `Component`, written in upper camel case.
- Any `@Input` and `@Output` variables should be defined in the class rather than in component metadata.
- All instance variables that are used within the view should be public.
- Mark any other instance variables or functions as private that you do not wish to expose outside of the component.
- All private instance variables should be prefixed with an underscore.
- New components should use `changeDetection: ChangeDetectionStrategy.OnPush` to improve efficiency. See [Angular OnPush Change Detection and Component Design](https://blog.angular-university.io/onpush-change-detection-how-it-works/) for more information on designing components to work with `ChangeDetectionStrategy.OnPush`.
- `@Input()` properties should have immutable types, such as `ReadonlyArray<string>` rather than `string[]` to help avoid changes that would not be detected when using `ChangeDetectionStrategy.OnPush`.
- Any component that may be used in a form e.g. checkboxes or radiobuttons, should support **both** `ngModel` and an alternative two way binding property to get/set the value.
- Use attributes on the template to manipulate the DOM where possible rather than using TypeScript to manipulate the DOM. In the rare occasion where it is not possible, inject `Renderer2` and use it rather than directly touching the DOM.
- When using key events in the View specify the key in the attribute rather than performing a condition check on the event `keyCode` e.g. `(keydown.uparrow)="upKeyPress()"`.
- When binding directly to a style property in the view, place the unit in the attribute rather than using string interpolation eg. `<div [style.top.px]="topValue"></div>` rather than `<div [style.top]="topValue + 'px'"></div>`.
- TSLint is included in our project and your code should conform to the rules it tests for. Run `npm run lint` to check.
- Where possible components should support a disabled state.
- Components should provide keyboard support for accessibility purposes.
- Each component should have automated tests written for it. See [Automated Testing](#automated-testing).

### Component Styling

Each component should have its own stylesheet. While Angular provides component encapsulation, we cannot use this and still allow theming of components. To resolve this issue and still retain style encapsulation, every rule for a component should be inside a tag selector. For example, our `ux-checkbox` component stylesheet would look like this:

```less
ux-checkbox {
    // rules go in here
}
```

The tag element should be styled rather than adding a `div` in the component template and adding a class to it.

We should follow this [style guide](http://codeguide.co/#css-syntax) when writing our stylesheet, below are some of the most important points:

#### Never add a margin to a `component` element.

We should leave it up to the consuming application as to how much spacing is around any component.

```less
// Bad
ux-checkbox {
	margin: 10px;
}
```

#### Use descriptive class names.

```less
// Good
.nav-bar {
}

.nav-bar-logo {
}

.nav-bar-brand {
}
```

#### Use color variables in components.

```less
// Good
.selector {
	color: @brand-primary;
}

// Bad
.selector {
	color: #abc;
}
```

#### One selector per line

```less
// Good
.selector,
.selector-secondary {
}

// Bad
.selector, .selector-secondary {
}
```

#### Include one space before the opening brace of declaration blocks for legibility.

```less
// Good
.selector {
}

// Bad
.selector{
}
```

#### Include one space after `:` for each declaration.

```less
// Good
background-color: #ddd;
color: #fff;

// bad
background-color:#ddd;
color:#fff;
```

#### End all declarations with a semi-colon.

```less
// Good
.selector {
	color: #2d2;
	text-align: center;
}

// Bad
.selector {
	color: #2d2;
	text-align: center
}
```

#### Comma-separated property values should include a space after each comma.

```less
// Good
.selector {
	box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}

// Bad
.selector {
	box-shadow: 0 1px 2px #ccc,inset 0 1px 0 #fff;
}
```

#### Lowercase all hex values and use shorthand hex values where available.

```less
// Good
.selector {
	color: #fff;
}

// bad
.selector {
	color: #FFFFFF;
}
```

#### Avoid specifying units for zero values.

```less
// Good
margin: 0;

// Bad
margin: 0px;
```

#### Avoid using shorthand notation for margin and padding when only setting one or two sides.

```less
// Good
margin-top: 10px;
margin-left: 10px;

// Bad
margin: 10px 0 0 10px;
```

## Documenting Angular Components

Every component in UX Aspects should be documented fully, including all inputs, output, public functions to be used when exported, content templates, and related components or directives. A documentation section should have the following structure:
1. A working example of the component. Some important options may be included in the example via the use of a Customize section.
2. A description of the component and any associated sub-components or directives.
3. An API listing of the inputs, outputs, and public functions. Each of these should be implemented with the `uxd-api-properties` component, containing a table row for each item.
4. Any associated types should be described using the `uxd-api-properties` component.
5. Other customization information, such as available content templates or classes that can be overridden for styling.
6. The code listing, which should come from the `snippets` directory as noted below.

Some good reference examples include:
* [Date Range Picker](https://uxaspects.github.io/UXAspects/#/components/date-time-picker#date-range-picker)
* [Tag Input](https://uxaspects.github.io/UXAspects/#/components/input-controls#tags)
* [Hierarchy Bar](https://uxaspects.github.io/UXAspects/#/components/hierarchy-bar#hierarchy-bar)

Each documentation section should have its own module to enable code splitting. The module should import any dependencies unless provided by a parent module.

Each subsection should be a separate component, and should be decorated with the `@DocumentationSectionComponent()` decorator, passing the class name as a string parameter.

Eg:

```typescript
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-sorting',
    templateUrl: './sorting.component.html'
})
export class ComponentsSortingComponent {
}
```

Any components that are detailing an Angular 1 component should be suffixed with `Ng1` in the class name and `ng1` in the selector and file names, e.g.:

```typescript
import { Component } from '@angular/core';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';

@Component({
    selector: 'uxd-components-sorting-ng1',
    templateUrl: './sorting-ng1.component.html'
})
@DocumentationSectionComponent('ComponentsSortingNg1Component')
export class ComponentsSortingNg1Component {
}
```

### Code Snippets

Any code snippets should be placed in a snippets folder in the appropriate section directory. These can be imported by the section and displayed in a `uxd-snippet` component using the content attribute. All snippets are available in a `snippets` object on the class.


### Plunker Support

Where possible, a Plunker example should be provided. The code snippets displayed in the section should also be used to produce the example where possible.

To add a Plunker example to a section the class should implement the `IPlaygroundProvider` interface. This requires having a public `playground` property on the class. The following options can be provided:

```typescript
export interface IPlayground {
    framework?: 'angular' | 'angularjs';
    files: {
        [key: string]: string;
    };
    modules?: {
        imports?: string | string[];
        providers?: string | string[];
        library?: string;
        importAs?: boolean;
        declaration?: boolean;
        forRoot?: boolean;
    }[];
}
```

This will automatically add an 'Edit in Plunker' link to the section header.

### Site Navigation

The site navigation is driven from `json` files found in the `data` folder. Each section should follow this interface:

```typescript
export interface ISection {
    id: string;
    title: string;
    component: string;
    version: 'AngularJS' | 'Angular';
    hybrid?: boolean;
    deprecated?: boolean;
    deprecatedFor?: string;
    externalUrl?: string;
    schematic?: string;
    usage: [{
        title: string;
        content: string;
    }];
}
```

This is required for your component to be displayed in the documentation site correctly.

## Automated Testing

Most component changes will require an update to the automated tests. UX Aspects uses two kinds of automated tests.

### Karma Tests

Unit tests are implemented using [Karma](https://karma-runner.github.io/latest/index.html) with the [Jasmine](https://jasmine.github.io/) framework. An example unit test case might be described as:

```typescript
it('should show the widget when [showWidget]="true"', ...);
```

Karma tests are implemented in a file named `my-component.component.spec.ts`, and will automatically be picked up by the the Karma runner when running `npm run test:karma`.

### End-to-End Tests

End-to-end tests should focus on use cases or requirements. When fixing a bug, the repro case for the bug will often make a good end-to-end test. For lower level unit tests, use Karma tests. An example end-to-end test case might be:

```typescript
it('should allow all text to be localized', ...);
```

These tests can also use screenshot comparison to verify styling and colors.

For end-to-end testing, there is a separate Angular application which hosts a number of pages containing the test cases. [Protractor](https://www.protractortest.org/#/) is then used to run the tests against this live application. Both the application and the test cases live in the `e2e` top level directory.

> Note: Many existing e2e tests within the project currently work as unit tests. These were written before the Karma suite was added. Please stick to the above guidelines for unit tests vs. end-to-end tests when creating new tests.

#### Implementing e2e Tests

To implement a new test page, create a new component under `e2e/pages/app` which defines the UI of the test case. Update `routes` in `e2e/pages/app/app.module.ts` to link the test page into the app. Run the command `npm run start:e2e` to start up the e2e application, and visit `http://localhost:4000/#/my-test-case` to verify the functionality of the test UI.

To implement the tests for the new test page, create a directory under `e2e/tests/components`. Create `my-test-case.po.spec.ts`, which contains the page object that the tests will use. By convention, this includes a `getPage` function which loads the appropriate page from the e2e application.

```ts
async getPage(): Promise<void> {
    await browser.get('#/my-test-case');
}
```

Next, create `my-test-case.e2e-spec.ts`, which will contain the Jasmine specs used to run the test cases. Set up the page object using `beforeEach`.

```typescript
describe('My test case', () => {

    let page: MyTestCasePage;

    beforeEach(async () => {
        page = new MyTestCasePage();
        await page.getPage();
    });

    it('should allow all text to be localized', async () => {
        //...
    });
});
```

#### Screenshot Testing

To prevent style regressions we can add screenshot comparisons to e2e tests:

```typescript
expect(await imageCompare('checkbox-initial')).toEqual(0);
```

If this test is run and there is no baseline image to compare against one will be generated in the `e2e/screenshots` folder. Subsequent runs
will then test against the previous baseline image.

If a component has been updated and has visually changed, the baseline image needs to be updated otherwise tests will fail.
Our CI build runs in a Linux environment, which has different font rendering than a Windows environment, therefore to prevent differences in the font variation baseline images should be generated in a Linux environment.

We provide an `npm` script that allows you to use Docker to run a CI environment on your local machine. Your current developer environment will be
mounted allowing you to run the `e2e` tests and produce baseline images.

Follow these steps to run the tests in a CI environment locally:

1. `npm run docker:ci`
    * This starts a Linux Docker container, and spawns an interactive shell. Enter the subsequent commands at the resulting prompt in order to execute them within the container.
2. `npm ci`
    * Note that `npm run docker:ci` uses `.node_modules__docker` on your host environment to store node modules for the Linux platform. Therefore `npm ci` is only required when package updates have been made.
3. `npm run build:library`
4. `npm run test:e2e`

The Docker container can continue to be used for additional test runs. If you wish to exit the container simply type `exit` in the Linux bash shell.
Periodic use of `docker ps` from your host terminal, will show you any running Docker images. These can be terminated using `docker kill CONTAINER ID`.

If there are any differences, the generated screenshots will be found under `target/e2e/screenshots`.
