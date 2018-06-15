# Angular Update Guide

The following guide will outline the steps required to updated each major version of Angular to the next.

## Angular 4.x -> 5.x

##### Install the latest packages:

`npm install @angular/animations@^5.0.0 @angular/common@^5.0.0 @angular/compiler@^5.0.0 @angular/compiler-cli@^5.0.0 @angular/core@^5.0.0 @angular/forms@^5.0.0 @angular/http@^5.0.0 @angular/platform-browser@^5.0.0 @angular/platform-browser-dynamic@^5.0.0 @angular/router@^5.0.0 @angular/upgrade@^5.0.0 typescript@2.4.2 rxjs@^5.5.2`

##### Prerequisites
- Rename `<template>` to `<ng-template>`
- Rename `OpaqueToken` -> `InjectionToken`.
- Rename `ngOutletContext` -> `ngTemplateOutletContext`.
- Rename `Renderer` -> `Renderer2`.
- Switch from `HttpModule` and the `Http` service to `HttpClientModule` and the `HttpClient` service. `HttpClient` simplifies the default ergonomics (You don't need to map to json anymore) and now supports typed return values and interceptors. Read more on [angular.io](https://angular.io/guide/http)
- If you use `DOCUMENT` from `@angular/platform-browser`, you should start to import this from `@angular/common`

##### Switch to Static Upgrade Adapter (Hybrid Apps Only)

If your app is using the older Upgrade tool you should switch to use the static upgrade tool. This will allow your hybrid apps to be compiled with AOT compilation. A guide on using the static upgrade tool can be [found here](https://github.com/UXAspects/UXAspects/blob/develop/guides/angular-upgrade-guide.md).

## Angular 5.x -> 6.x (Using Angular CLI)

Ensure all steps from the v4 -> v5 migration have been completed before attempting to migrate to v6.

##### Prerequisites

- If you import any animations services or tools from `@angular/core`, you should import them from `@angular/animations`
- If you use `preserveQueryParams`, instead use `queryParamsHandling`

##### Switch to Static Upgrade Adapter (Hybrid Apps Only)

A guide on using the static upgrade tool can be [found here](https://github.com/UXAspects/UXAspects/blob/develop/guides/angular-upgrade-guide.md).

##### Update Angular CLI

Update Angular CLI both globally and locally:
- `npm install -g @angular/cli`
- `npm install @angular/cli@latest`

*Note: Node 8 or higher is required*

##### Update Angular CLI configuration

`ng update @angular/cli`

##### Update all of your Angular framework packages to v6, and the correct version of RxJS and TypeScript.

`ng update @angular/core`

After the update, TypeScript and RxJS will more accurately flow types across your application, which may expose existing errors in your application's typings

If you have TypeScript configured to be strict (if you have set strict to true in your tsconfig.json file), update your tsconfig.json to disable strictPropertyInitialization or move property initialization from ngOnInit to your constructor. You can learn more about this flag on the [TypeScript 2.7 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#strict-class-initialization).

##### Update other packages

Use `ng update` or your normal package manager tools to identify and update other dependencies.

##### Automatically upgrade RxJS

- `npm install -g rxjs-tslint`
- `npm install rxjs-compat`
- `rxjs-5-to-6-migrate -p src/tsconfig.app.json`

## Angular 5.x -> 6.x (Using Webpack)

Ensure all steps from the v4 -> v5 migration have been completed before attempting to migrate to v6.

##### Install the latest packages:

`npm install @angular/animations@^6.0.0 @angular/common@^6.0.0 @angular/compiler@^6.0.0 @angular/compiler-cli@^6.0.0 @angular/core@^6.0.0 @angular/forms@^6.0.0 @angular/http@^6.0.0 @angular/platform-browser@^6.0.0 @angular/platform-browser-dynamic@^6.0.0 @angular/router@^6.0.0 @angular/upgrade@^6.0.0 typescript@2.7.2 rxjs@^6.0.0`

##### Automatically upgrade RxJS

- `npm install -g rxjs-tslint`
- `npm install rxjs-compat`
- `rxjs-5-to-6-migrate -p tsconfig.json`

##### Update other packages

Use package manager tools to identify and update other dependencies.

##### Update Webpack (optional)

Your existing Webpack config should continue to work after the upgrade. You may however wish to upgrade to use the latest `@ngtools/webpack` loader. The latest version requires you to use Webpack 4 or higher. A migration guide for upgrading Webpack can be [found here](https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5).