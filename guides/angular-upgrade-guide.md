# Upgrading an AngularJS Application

### Installing Dependencies

Before we begin our migration we need to install some new dependencies. This can be achieved through a modern package manager tool such as NPM or Yarn (note bower is not supported). 
If your project currently uses one of the supported package managers then you can proceed to install the following packages, however if it is not then a `package.json` file needs to be created. 
This can be done by entering `npm init` or `yarn init` into the console for a step by step wizard to create one for you.

First install the dependencies:

```bash
npm install @angular/common @angular/compiler @angular/core @angular/forms @angular/platform-browser @angular/platform-browser-dynamic @angular/router @angular/upgrade core-js zone.js rxjs
```

Next install the developer tool dependencies:

```bash
npm install typescript webpack @angular/compiler-cli @ngtools/webpack html-loader css-loader --save-dev
```

### Setting up TypeScript

Angular applications are written using TypeScript which allows us to add additional type information to our JavaScript code to more easily detect errors and provide much better developer tooling.

We must provide TypeScript with a `tsconfig.json` file in the root of the project to inform it as to how we want it to transpile our code. The content of this file should be:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "es2015",
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
```


### Setting up Webpack

Traditionally when building your application, you would run an automated task that bundles all your code together into one file. This worked well, but with the advent of modules in JavaScript we can handle this process much more intelligently.

Webpack is a module loader and bundler tool that allows us to use JavaScript modules in our code. It builds up a dependency graph so it can detect when you change some code and only updates the parts that have changed. It can also detect if there is any code that is never used and can safely discard it, reducing your bundle size. Using modules provides us with better encapsulation and prevents the need to pollute the global scope, potentially reducing conflicts.

Webpack is very extensible, and is not limited to JavaScript. It can handle TypeScript, SCSS, LESS, CSS, and just about every other popular format as well.

Webpack has many additional features such as providing a local web server, automatic reloading, and hot module replacement which can allow you to make changes to your code and see them on the page without losing the current state of the application.

Our basic Webpack config will look something like this. Note, we have created an `ng-app` folder in our source directory where we will place our Angular components.

```javascript
const { resolve } = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = {

    mode: 'development',

    entry: './src/ng-app/main.ts',
    
    output: {
        path: resolve('./dist/js'),
        filename: 'ng-app.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    },

    plugins: [
        new AngularCompilerPlugin({
            mainPath: './src/ng-app/main.ts',
            tsConfigPath: './tsconfig.json',
            skipCodeGeneration: true
        })
    ]
};
```

**Note:** You should also create an additional Webpack configuration for production builds. The production config should set `mode` to `production` and the `AngularCompilerPlugin` should have `skipCodeGeneration` set to `false`.

### Create Our Angular Module

To create a hybrid application we must have both AngularJS and Angular running in the same application. You already have an existing AngularJS application, so we need to begin creating our Angular application.

As mentioned before, we want to create a new folder that will contain your Angular components, in this example we have created an `ng-app` folder under the existing `src` folder - use whatever paths are suitable for your application.

#### main.ts

The `main.ts` file is what is known as our entry file. This is the file that first gets run and is responsible for bootstrapping our Angular application. The contents of this file will look like this:

```typescript
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

The first two imports are polyfills and provide older browsers with the functionality required to run an Angular application. The third import is `zone.js`, a library by the Angular team that creates an execution context that is used to determine when to run change detection. It is this library that means we never to have to do anything like `$scope.$apply()` in an Angular application again.

The final two imports are importing the app module and the bootstrapping functionality that will allow Angular to begin.

Lastly we bootstrap our app module.

#### app.module.ts

```typescript
declare const angular: any;

import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule, setAngularJSGlobal } from '@angular/upgrade/static';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [],
    entryComponents: []
})
export class AppModule {

    constructor(private _upgradeModule: UpgradeModule) {}

    ngDoBootstrap() {
        setAngularJSGlobal(angular);
        this._upgradeModule.bootstrap(document.documentElement, ['app']);
    }
}
```

Modules in Angular are quite similar to modules in AngularJS. They group bits of functionality together such as components and services, and just like in AngularJS each application must have an 'app' module.

You will notice a few things related to `Upgrade` in this file. We are importing the `UpgradeModule` to begin with. This allows us to make use Angular components in AngularJS and vice-versa. We also inject the `UpgradeModule` into the constructor of the class. We store it in an instance variable so we can use it in the `ngDoBootstrap` function.

In the `ngDoBootstrap` function we inform Angular what variable contains AngularJS - this refers to the global variable AngularJS creates. Next we tell the upgrade module to bootstrap our AngularJS application. 

**Note**: As we are now bootstrapping our AngularJS application here, you must remove `ng-app` from your existing html (or wherever you were previously bootstrapping AngularJS).

### Building our Hybrid Application

We can now build our hybrid application using Webpack. If you have Webpack installed globally you can simply run:

```bash
webpack --progress --colors
```

** Webpack can be installed globally by running `npm install -g webpack` **

This should build our Angular application to our dist folder.

If Webpack is not installed globally it can be added as a script in your `package.json` file e.g.:

```json
"scripts": {
    "build": "webpack --progress --colors"
}
```

This script can then be run by entering the following into the console:

```bash
npm run build
```

You can also run Webpack in `watch` mode, which will detect any file changes and perform an incremental rebuild. To enable this mode simply add the `--watch` flag when running Webpack.

Finally, you need to include this new build output into your application as a script tag. This script tag should come after the tags that load `jQuery`, `AngularJS` and your AngularJS application.

### Downgrading Components

Now you have a hybrid application set up, any new components should be written using Angular and downgraded if required to be used in AngularJS parts of your application. For this example, lets assume we created a new `HeaderComponent` in Angular. We need to make the following changes to our `app.module.ts` file:

- Add it to `declarations`
- Add it to `entryComponents`
- Downgrade the component

```typescript
import { UpgradeModule, setAngularJSGlobal, downgradeComponent } from '@angular/upgrade/static';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    imports: [
	...
    ],
    declarations: [
    	HeaderComponent
    ],
    entryComponents: [
    	HeaderComponent
    ]
})
export class AppModule {
	...
}

// downgrade the component for use in AngularJS
angular.module('app').directive('appHeader', downgradeComponent({ component: HeaderComponent }));
```

Now you can simply use the `app-header` element in your AngularJS application and it should work as expected.

**Note:** It is common to provide a selector prefix for all components in your application such as `app-`. This will help prevent any selector collisions with third party components.

### Downgrading Services

Downgrading a service to allow it to be used in AngularJS is also simple. For this example assume we are downgrading an `InfoService`. The following changes should be made to `app.module.ts`:

- Add it to `providers`
- Downgrade the service

```typescript
import { UpgradeModule, setAngularJSGlobal, downgradeInjectable } from '@angular/upgrade/static';
import { InfoService } from './services/info.service';

@NgModule({
    imports: [
        ...
    ],
    declarations: [
      	...
    ],
    entryComponents: [
        ...
    ],
    providers: [
        InfoService
    ]
})
export class AppModule {
	...
}

angular.module('app').service('infoService', downgradeInjectable(InfoService));
```

### Upgrading Components

Many components can be upgraded for use within an Angular application, however there are a few cases where they cannot:

1. If it is a directive without a template
2. If the component uses `replace: true`
3. If the component uses the `$transclude` function to manually transclude content
4. If the component uses `$attrs`

In most cases these components can be made upgradeable by removing the use of the non-supported feature.

Let's take an example AngularJS component and make it available to use within Angular applications:

```javascript
function brandingDirective() {
    return {
        restrict: 'E',
        template: '<h1>{{ brandName }}</h1>',
        scope: {
            brandName: '='
        }
    };
}
```

Here we have a simple directive that takes one input and displays it inside a heading element. In our Angular application we should create a new class that extends `UpgradeComponent` and has a `@Directive` decorator. The resulting file would look like this:

```typescript
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'app-branding'
})
export class BrandingComponent extends UpgradeComponent {

    @Input() brandName: string;

    constructor(elementRef: ElementRef, injector: Injector) {
        super('appBranding', elementRef, injector);
    }
}
```

The selector defined in the decorator is the one that will be used in Angular - this can be the same as the selector it uses in AngularJS or something different. In the constructor we call `super` passing it the selector of the directive we want to upgrade, note it is written in camel case.

The last thing you need to do is define any inputs and outputs available to the component. In this case we simply have one input called `brandName`.

The last step is to simply add this component to the declarations array in your app module. This component can now be used inside your Angular components and it should be used as any other Angular component would be.

#### Bindings

There are several other possibilities regarding inputs and outputs. Below is an example of the various kinds that can be used:

```javascript
scope: {
    value: '=', // use @Input (and @Output if two way binding is required)
    header: '@', // use @Input
    selected: '&' // use @Output
}
```

This would result in the following:

```typescript
@Input() value: number;
@Input() header: string;

@Output() selected: EventEmitter<void>;

// note if we want 'value' to be a two way binding we must also create an output for it called 'valueChange'
@Output() valueChange: EventEmitter<number>;
```

### Upgrading Services

Services can easily be upgraded for use in an Angular application. Take the following AngularJS service:

```javascript
angular.module('app').service('versionService', function() {

    this.getVersion = function() {
        return { major: 1, minor: 3, patch: 12 };
    };
});
```

To upgrade this service we need to add the following to the providers array in our app module:

```typescript
providers: [
    {
        provide: 'versionService',
        useFactory: (injector: Injector) => injector.get('versionService'),
        deps: ['$injector']
    }
]
```

It is recommended to create a TypeScript interface for the service to give the best error detection and auto completion, e.g.:

```typescript
export interface VersionService {
    getVersion(): Version;
}

export interface Version { 
    major: number; 
    minor: number; 
    patch: number;
};
```

To use the service in a component we can simply inject in by using the `@Inject` decorator, e.g.:

```typescript
export class AppComponent {
	constructor(@Inject('versionService') versionService: VersionService) {
    }
}
```

### Deprecate AngularJS

Once you have migrated all your AngularJS components, directives and services and are no longer dependent on any AngularJS libraries you are now ready to deprecate AngularJS. You can simply remove any files containing old AngularJS content, remove any references to AngularJS and outdated libraries in your `package.json` or `bower.json` files.

Your application is now fully Angular!

### Additional Resources

For the official documentation on upgrading an application visit the [Angular documentation site](https://angular.io/guide/upgrade).
