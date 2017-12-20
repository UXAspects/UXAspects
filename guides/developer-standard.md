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
- Any component that may be used in a form e.g. checkboxes or radiobuttons, should support **both** `ngModel` and an alternative two way binding property to get/set the value.
- Use attributes on the template to manipulate the DOM where possible rather than using TypeScript to manipulate the DOM. In the rare occasion where it is not possible, inject `Renderer2` and use it rather than directly touching the DOM. 
- When using key events in the View specify the key in the attribute rather than performing a condition check on the event `keyCode` e.g. (keydown.uparrow)="upKeyPress()".
- When binding directly to a style property in the view, place the unit in the attribute rather than using string interpolation eg. `<div [style.top.px]="topValue"></div>` rather than `<div [style.top]="topValue + 'px'"></div>`.
- TSLint is included in our project and your code should conform to the rules it tests for.
- Where possible components should support a disabled state.
- Components should provide keyboard support for accessibility purposes.
- Each component should have unit tests written for it. A complete guide on writing unit tests can be [found here](https://github.com/UXAspects/UXAspects/blob/develop/UNIT-TESTS.md).

### Component Styling

Each component should have its own stylesheet. While Angular provides component encapsulation, we cannot use this and still allow theming of components. To resolve this issue and still retain style encapsulation, every rule for a component should be inside a tag selector. For example, our `ux-checkbox` component stylesheet would look like this:

```less
ux-checkbox {
    // rules go in here
}
```

The tag element should be styled rather than adding a `div` in the component template and adding a class to it.

We should follow this [style guide](http://codeguide.co/#css-syntax) when writing our stylesheet, below are some of the most important points:

##### Never add a margin to a `component` element.

We should leave it up to the consuming application as to how much spacing is around any component.

```less
// Bad
ux-checkbox {
	margin: 10px;
}
```

##### Use descriptive class names.

```less
// Good
.nav-bar {
}

.nav-bar-logo {
}

.nav-bar-brand {
}
```

##### Use color variables in components.

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

##### One selector per line

```less
// Good
.selector,
.selector-secondary {
}

// Bad
.selector, .selector-secondary {
}
```

##### Include one space before the opening brace of declaration blocks for legibility.

```less
// Good
.selector {
}

// Bad
.selector{
}
```

##### Include one space after `:` for each declaration.

```less
// Good
background-color: #ddd;
color: #fff;

// bad
background-color:#ddd;
color:#fff;
```

##### End all declarations with a semi-colon.

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

##### Comma-separated property values should include a space after each comma.

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

##### Lowercase all hex values and use shorthand hex values where available.

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

##### Avoid specifying units for zero values.

```less
// Good
margin: 0;

// Bad
margin: 0px;
```

##### Avoid using shorthand notation for margin and padding when only setting one or two sides.

```less
// Good
margin-top: 10px;
margin-left: 10px;

// Bad
margin: 10px 0 0 10px;
```

## Documenting Angular Components

Each documentation section should have its own module to enabled code splitting. The module should import any dependencies unless provided by a parent module.

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


### CodePen & Plunker Support

Where possible, a CodePen example (for Angular 1 components) or a Plunker example (for Angular components) should be provided. The code snippets displayed in the section should also be used to produce the example where possible.

#### CodePen

To add CodePen support to a section the class should implement the `ICodePenProvider` interface. This requires having a public `codepen` property on the class. The following options can be provided:

```typescript
export interface ICodePen {
    html: string;
    htmlAttributes?: any;
    htmlTemplates?: ICodePenTemplate[];
    css?: string[];
    js?: string[];
}
```

This will automatically add an 'Edit in CodePen' link to the section header.

#### Plunker

To add a Plunker example to a section the class should implement the `IPlunkProvider` interface. This requires having a public `plunker` property on the class. The following options can be provided:

```typescript
export interface IPlunk {
    files: {
        [key: string]: string;
    };
    modules?: {
        imports?: string | string[];
        library?: string;
        importAs?: boolean;
    }[];
    mappings?: {
        alias: string;
        source: string;
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
    deprecated?: boolean;
    externalUrl?: string;
}
```

This is required for your component to be displayed in the documentation site correctly.
