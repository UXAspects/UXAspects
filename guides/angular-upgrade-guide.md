# Upgrading an AngularJS Application

### Overview

##### Step One
- Adding TypeScript
- Adding Webpack
- Create Hybrid Application
- Consuming Angular Components

##### Step Two
- Begin Migration
- Upgrade Tips and Notes

##### Step Three
- Deprecate AngularJS


## Adding TypeScript

TypeScript is a superset of Javascript that allow us to use static typing in our web applications. It comes with many benefits such as better tooling, intelligent code completion in editors and compile time error checking. 

Angular recommends the use of TypeScript for building applications and provides the most comprehensive support and documentation for TypeScript.

We can easily add TypeScript to an existing project using NPM:

```
npm install typescript --save-dev
```

To configure TypeScript we should add a `tsconfig.json` file to the root directory of the project. The example below should provide a good starting point:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false,
    "suppressImplicitAnyIndexErrors": true,
    "lib": ["es2015", "dom"]
  }
}
```

## Adding Webpack

Traditionally when building your application, you would run some automated task that bundles all your code together into one file. This worked well, but with the advent of modules in JavaScript we can handle this process much more intelligently.

Webpack is a module loader and bundler tool that allows us to use JavaScript modules in our code. It builds up a dependency graph so it can detect when you change some code and only updates the parts that have changed. It can also detect if there is any code that is never used and can safely discard it, reducing your bundle size. Using modules provides us with better encapsulation and prevents the need to pollute the global scope, potentially reducing conflicts.

Webpack is very extensible, and is not limited to JavaScript. It can handle TypeScript, SCSS, LESS, CSS, and just about every other popular format as well.

Additionally Webpack has many additional features such as providing a local web server, automatic reloading, and hot module replacement which can allow you to make changes to your code and see them on the page without losing the current state of the application.

We can include Webpack in our project by running the following command in the command prompt:

```
npm install webpack --save-dev
```

To allow us to run Webpack from the command line you should also install Webpack globally:

```
npm install webpack -g
```

We will configure Webpack after we have our Hybrid application set up.

## Create Hybrid Application

#### Installing Dependencies

To begin creating our hybrid application we need to install Angular and its dependencies. We can do this by running the following in the command prompt:

```
npm install @angular/common @angular/compiler @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/router @angular/upgrade core-js rxjs zone.js --save
```

Additionally we should install typings for AngularJS. Type Definition files are files used by TypeScript to know which functions and properties a library (not written in TypeScript) exposes and what types they accept and return. You should install types for any additional libraries your application uses also (see [here](http://definitelytyped.org/) for more info).

```
npm install @types/angular @types/angular-route @types/jquery @types/node --save-dev
```

We recommend moving to use NPM over Bower for all your existing dependencies as Webpack and TypeScript will require additional configuration to work correctly with Bower.

#### Creating Angular Application

We can now begin creating our Angular application that will run alongside the AngularJS application. 

It is often useful to create a separate folder under the `src` folder to contain our Angular files so that we can easily identify which files are part of the AngularJS app and which are part of the Angular app.

We need to start by adding an entry point for our Angular application, which is usually done by creating a `main.ts` file. In this file we can import some required libraries and bootstrap our Angular application.

```typescript
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

The `main.ts` references an `AppModule` file which we need to create in a file named `app.module.ts`. 

In our `AppModule` we need to import the `UpgradeAdapter` tool which allows us to both upgrade AngularJS components to Angular and to downgrade Angular components to AngularJS which can be very useful when migrating our applications.

We should export the instance of the `UpgradeAdapter` so it is a singleton that can be used throughout the application.

We also need to bootstrap the AngularJS from this file also - this mean you should remove the existing AngularJS bootstrapping which is usually an `ng-app` attribute in your `index.html` file.

```typescript
import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';

// create a singleton of the upgrade adapter
export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
    imports: [
        BrowserModule
    ]
})
export class AppModule {
    ngDoBootstrap() {}
}

// bootstrap the AngularJS application here
upgradeAdapter.bootstrap(document.documentElement, ['app']);
```

#### Configuring Webpack

Now that we have our Angular application set up we can configure Webpack to bundle it for us. We do this in a `webpack.config.js` file in the root directory of our project. Below is an example of how the file may initially look.

```javascript
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        bundle: './src/app4/main.ts'
    },

    output: {
        path: path.join(__dirname, 'dist', 'js'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [{
            test: /\.ts$/,
            include: path.join(__dirname, 'src', 'app4'),
            use: ['awesome-typescript-loader', 'angular2-template-loader']
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, 'docs')
        ),

        new HtmlWebpackPlugin({
          template: './index.html'
        })
    ]
};
```

To run Webpack we first need to install any loaders that our configuration has used and we can do this using NPM:

```
npm install awesome-typescript-loader angular2-template-loader html-loader html-webpack-plugin --save-dev
```

You will notice an HtmlWebpackPlugin, this will automatically create an index.html file in your output folder for you. Any scripts or stylesheets that Webpack creates will automatically be added as script or link tags in this file. You should create an `index.html` file that will act as a template (this will allow you to add any scripts or styles or meta tags etc.. that Webpack is not currently responsible for). See [here](https://github.com/jantimon/html-webpack-plugin) for more information.

If you want to let Webpack handle your stylesheets for you look at [this](https://github.com/webpack-contrib/extract-text-webpack-plugin) plugin.


#### Running Webpack

We can run Webpack from the command line by running the following:

```
webpack --progress --colors
```

Additionally we can supply the `--watch` parameter which will keep Webpack alive, watch for any changes to files and incrementally rebuild anything that is required.

Webpack can also be run as part of an existing Grunt or Gulp build with plugins available through NPM.

#### Setup Complete

The hybrid application is now setup, and you should now have both AngularJS and Angular running in the same application. You can now easily begin to use Angular components in your AngularJS application.


## Consuming Angular Components/Services

We can now begin to use Angular components and services in our AngularJS applications simply by importing them and using the `UpgradeAdapter` to downgrade them to AngularJS components.

This process should work for components or services that are part of UX Aspects or any other components library.

For this example we are going to create a new Angular component and downgrade it to AngularJS. In the folder containing our Angular app create a folder called `components` that will store all our Angular components. Each component should be given its own sub folder.

Let's create a new `test` folder under `components` and add a `test.component.ts` file with the following contents:

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'test',
    template: `<h1>{{ text }}</h1>`
})
export class TestComponent {

    text: string;

    constructor() {
        this.text = 'Component is Working!';
    }
}
```

We can then import this into our `AppModule` and downgrade it to and AngularJS directive:

```typescript
// Inform TypeScript there is a global variable for AngularJS and state the associated type
declare var angular: angular.IAngularStatic;

import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeAdapter } from '@angular/upgrade';

// import Angular components
import { TestComponent } from './components/test/test.component';

// create a singleton of the upgrade adapter
export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        TestComponent
    ]
})
export class AppModule {
    ngDoBootstrap() {}
}

// downgrade the Angular component and register it as an AngularJS directive
angular.module('app').directive('test', upgradeAdapter.downgradeNg2Component(TestComponent) as angular.IDirectiveFactory);

// bootstrap the AngularJS application here
upgradeAdapter.bootstrap(document.documentElement, ['app']);
```

To test this directive simply add the `<test></test>` tag to your HTML.

There is also a `downgradeNg2Provider` function on the `UpgradeAdpater` instance that allows us to use any Angular service in our AngularJS application.

> **Note:** There is no wrapper function for non-component directives.

## Begin Migration

At this point you should now be able to begin migrating your existing application to Angular at a pace that suits you.

Angular provides us with useful upgrade and downgrade tools that allow us to expose components and services to each framework, however there is no tool to upgrade or downgrade non-component directives. So migrating any non-component directives early will help make sure everything you need is available once you start migrating components.

When you are ready to start migrating components/services, it is important to identify which components/services have the fewest dependencies and migrate these first.

Once you have migrated a component to Angular you can remove the AngularJS variant, import it into your `AppModule` and downgrade it as shown in the above section. This will allow you to continue using it within your AngularJS application until you have converted the entire application at which point you would remove AngularJS completely.

If you upgrade a component or service that has a dependency that you have not yet migrated you can use the `UpgradeAdapter` module to upgrade AngularJS components/services to Angular until you have migrated them. For more information on this [look here](https://angular.io/docs/js/latest/api/upgrade/index/UpgradeAdapter-class.html).

#### Components

Converting basic components should be relatively straightforward if your directives follow the most popular best practice guides. The majority of the work is simply converting the directive definition object to the component decorator. 

A complete guide on migrating can be [found here](https://angular.io/docs/ts/latest/guide/upgrade.html).

##### Things to note:

- Each Angular component always has its own isolated scope
- It must have a template
- No longer a concept of `compile` or `link` functions
- No more `$apply` or `$digest`

##### Example

This is an example component that displays some text and changes the text when it is clicked.

###### AngularJS

```javascript
angular.module('app').directive('myComponent', function() {
	return {
    	restrict: 'E',
        scope: {
        	title: "="
        },
        controller: function() {
        	var vm = this;
            
            vm.updateText = function() {
            	vm.title = "Text Clicked";	
            };
        },
        controllerAs: 'vm',
        bindToController: true,
        template: "<h1 ng-click="vm.updateText()">{{ title }}</h1>"
    };
});
```

###### Angular

```typescript
@Component({
	selector: 'my-component',
    template: '<h1 (click)="updateText()">{{ title }}</h1>'
})
export class MyComponent {
	@Input() title: string;
    
    updateText() {
    	this.title = "Text Clicked"
    }
}
```

#### Services

Angular injectables tend to be most similar to AngularJS services, and the Angular version is essentially just an annotated class. 

##### Example

###### AngularJS

```javascript
angular.module("app").service("exampleDataService", function() {

	var data = [...];

	return {
    	getData: function() {
        	return data;
        },
        getPage: function(pageNumber, pageSize) {
			var startIndex = pageNumber * pageSize;
            var endIndex = startIndex + pageSize;
            
			return data.slice(startIndex, endIndex);
        }
    };
});
```

###### Angular

```typescript
@Injectable()
export class ExampleDataService {
	
    private data = [...];
    
    getData() {
    	return data;
    }
    
     getPage(pageNumber, pageSize) {
        let startIndex = pageNumber * pageSize;
        let endIndex = startIndex + pageSize;

        return data.slice(startIndex, endIndex);
    }
}
```

#### Pages

In AngularJS it was common practice to have an HTML file as a page in your application and associate a controller with either it or part of it by using a router or the `ng-controller` directive.

In Angular everything should be a component. There should be no html page files that aren't associated with a component. Because of this you should convert each page to a component.

##### Example

###### AngularJS

*HTML*
```html
<div class="wrapper" ng-controller="PageCtrl as vm">
	<table>
    	<thead>
        	...
        </thead>
        <tbody>
        	<tr ng-repeat="row in vm.tableData">
            	...
            </tr>
        </tbody>
    </table>
</div>
```

*Controller*
```javascript
angular.module('app').controller('PageCtrl', function() {
	var vm = this;
    
    vm.tableData = [
    	...
    ];
    
    vm.pageSize = 10;
    
    vm.getPage = function(pageNumber) {
    	let startIndex = pageNumber * vm.pageSize;
        let endIndex = startIndex + vm.pageSize;

        return data.slice(startIndex, endIndex);
    };
});
```

###### Angular

*HTML*
```html
<div class="wrapper">
	<table>
    	<thead>
        	...
        </thead>
        <tbody>
        	<tr *ngFor="let row of tableData">
            	...
            </tr>
        </tbody>
    </table>
</div>
```

*Component*
```typescript
@Component({
	selector: 'page-component',
    templateUrl: './page.component.html'
})
export class PageComponent {
	
    tableData: any[] = [...];
    pageSize: number = 10;
    
    getPage(pageNumber: number) {
    	let startIndex = pageNumber * this.pageSize;
        let endIndex = startIndex + this.pageSize;

        return data.slice(startIndex, endIndex);
    };
}
```

This will allow you to continue using your AngularJS router, but instead of specifying an HTML file for a route, change it to display the downgraded Angular component, eg:

###### Before
```javascript
$stateProvider.state('page', {
  templateUrl: 'pages/page.html'
})
```

###### After
```javascript
$stateProvider.state('page', {
  template: '<page-component></page-component>'
})
```

Once all the pages in your application have been upgraded you can then easily switch out the AngularJS router for the Angular router as it expects components instead of urls.

## Upgrade Tips and Notes

#### Angular Directives

Directives provided as part of Angular do not work when used in an AngularJS application, for example `ngFor`, `ngIf` and also including `ngModel` from the `FormsModule`. 

While this can be inconvenient, the AngularJS equivalent (eg. `ng-if` and `ng-repeat`) directives should work as expected and be able to fulfil your requirements. 

The exception to the rule is `ng-model` which will not work across the two frameworks. To work around this issue all UX Aspects components that accept `ngModel` will have an additional two-way property you can bind to that will provide the same functionality.

#### Component Templates

When using both AngularJS and Angular components within the one application you need to ensure that any component used in a component's template has either been upgraded or downgraded to the appropriate framework. 

For example if I have the following components:

```typescript
@Component({
	selector: 'my-component',
    template: '<h1>{{ title }}</h1>'
})
export class MyComponent {
	public title = "My Component";
}
```

```javascript
angular.module('app').directive('parentComponent', function() {
	return {
    	restrict: 'E',
        template: '<my-component></my-component>'
    };
});
```

You will need to have made sure that the Angular component has been downgraded and registered as an AngularJS directive:

```typescript
angular.module('app').directive('myComponent', upgradeAdapter.downgradeNg2Component(MyComponent) as angular.IDirectiveFactory);
```

Inversely the same is also true. If I have the following components:

```javascript
angular.module('app').directive('myComponent', function() {
	return {
    	restrict: 'E',
        template: '<h1>{{ vm.title }}</h1>',
        controller: function() {
        	var vm = this;
            
            vm.title = "Working";
        },
        controllerAs: 'vm'
    };
});
```

```typescript
@Component({
	selector: 'parent-component',
    template: '<my-component></my-component>'
})
export class ParentComponent {}
```

In this case you will need to make sure the AngularJS component has been upgraded to an Angular component:

```typescript
@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        upgradeAdapter.upgradeNg1Component('myComponent')
    ]
})
export class AppModule {
    ngDoBootstrap() { }
}
```

#### Limitations Upgrading AngularJS Components

There are a few features of AngularJS directives that are not supported by the upgrade tool. These include `compile` function, `postLink` function, `attributes` as a link function parameter, injection of `$attrs` or `$transclude` to a controller and the `replace` property.

Any component directives that use these features can either be modified or a simple wrapper directive can be created, which essentially creates an AngularJS container, in which your existing AngularJS component can run correctly even if it uses some of the unsupported features.

Here is an example of an AngularJS component that uses some unsupported features:

```javascript
angular.module('app').directive('myNg1Component', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            upper: '=',
            lower: '='
        },
        template: '<p>The values are: {{ upper }} and {{ lower }}</p>',
        compile: function() {
            // ...
        }
    };
});
```

That component will likely not work correctly if simply upgraded using the upgrade tool:

```javascript
upgradeAdapter.upgradeNg1Component('myNg1Component')
```

However we can create a wrapper directive that takes the same inputs and simply passes them to the original component, eg:

```javascript
angular.module('app').directive('myNg1ComponentWrapper', function() {
    return {
        restrict: 'E',
        scope: {
            upper: '=',
            lower: '='
        },
        template: '<my-ng1-component lower="lower" upper="upper"></my-ng1-component>'
    };
});
```

As this wrapper directive uses no unsupported features we can simply use the upgrade module to make this component available in Angular:

```javascript
upgradeAdapter.upgradeNg1Component('myNg1ComponentWrapper')
```


#### Interacting with Angular components

When passing data to and from Angular components you must use the appropriate Angular syntax, even though we are running within an AngularJS application.

For example, let's take the `ux-checkbox` component which has several attributes we can use to pass data to and from the component.

##### Literals
If we want to pass a value as a literal we can simply use a regular attribute:

```html
<ux-checkbox simplified="true"></ux-checkbox>
```

##### Bindings

To pass a variable in a controller to a component you should use `[]` to surround the attribute name:

```htlm
<ux-checkbox [simplified]="vm.simplified"></ux-checkbox>
```

##### Two Way Bindings

To pass a value to a component that you expect the component to update you can wrap the attribute name in `[()]`:

```html
<ux-checkbox [(value)]="value"></ux-checkbox>
```

## Deprecate AngularJS

Once you have migrated all your AngularJS components, directives and services and are no longer dependent on any AngularJS libraries you are now ready to deprecate AngularJS. You can simply remove any files containing old AngularJS content, and remove any references to AngularJS and outdated libraries in your `package.json` or `bower.json` files.

Your application is now fully Angular!
