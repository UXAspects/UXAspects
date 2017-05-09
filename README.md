# UX Aspects

UX Aspects is an open source user interface framework for building modern, responsive, mobile big data applications on the web.

# Installation

## Bower

1. Install [Node.js](https://nodejs.org/), which provides the npm package manager.
2. Install [TypeScript](https://www.typescriptlang.org/):
```bash
npm install typescript --save-dev
```
3. Install [Angular 4](https://angular.io/) and other dependencies:
```bash
npm install @angular/common @angular/compiler @angular/compiler-cli @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/platform-server @angular/router ngx-bootstrap chart.js ng2-charts @types/chart.js --save
```
4. Install [Bower](https://bower.io/):
```bash
npm install -g bower
```
5. Install the UX Aspects bower package:
```bash
bower install ux-aspects
```

# Documentation and Examples

See the documentation site for full details and interactive examples of UX Aspects components:

[https://uxaspects.github.io/UXAspects/](https://uxaspects.github.io/UXAspects/)

# Contributing

Pull requests are welcome; see the [developer guide](guides/developer-standard.md) for more information.

To build the project, which includes UX Aspects and the documentation site:

1. Clone the respository:
```bash
git clone https://github.com/UXAspects/UXAspects.git
```
2. Install the dependencies using `npm` in the repository directory:
```bash
npm install
```
3. Build the project and start the development server. This will automatically rebuild when source changes are made.
```bash
grunt documentation:serve
```
4. The documentation site is hosted at [http://localhost:8080/](http://localhost:8080/). Use [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) for a frame which will automatically be reloaded when a build completes.

# License

UX Aspects code is released under the MIT License. Licenses for 3rd party code included in this repository can be found in the [licenses summary](https://uxaspects.github.io/UXAspects/assets/licenses.txt).