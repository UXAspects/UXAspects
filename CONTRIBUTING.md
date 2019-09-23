# Contributing to UX Aspects

Found a bug or thought of a new feature that would benefit others? Well you can help make UX Aspects even better by contributing to the project.
Contributing is easy, and all fixes are welcome, no matter how small.

## Before you get started

Before you get started it is good to be aware of some of the practices we adhere to. We have a [Developer Standard](https://github.com/UXAspects/UXAspects/blob/develop/guides/developer-standard.md) document that outlines some of the coding best practices we follow. We have several linting tasks that help enforce these standards and they should be run before creating a Pull Request. All new features and fixes should work correctly in the [supported browsers](https://uxaspects.github.io/UXAspects/#/features).

## How to contribute

1. Fork the UX Aspects repository. This can be done on GitHub by clicking the "Fork" button on the UX Aspects repository page.
2. Clone your forked repository. This will create a copy of the repository under your profile, which you can freely modify and push commits to.
3. Make your fix/changes. See **Developing with UX Aspects** below for details.
4. Do a full build, which includes the linting tasks:
```bash
npm run build
```
5. Run the automated tests:
```bash
npm run test
```
6. Commit and Push your changes.
7. Create a Pull Request. This can be done on GitHub by clicking the "New Pull Request" button on the UX Aspects repository page.

Once a Pull Request has been made it will be reviewed by one of our team members. If the Pull Request is approved, it will be merged into UX Aspects allowing everyone else to benefit from your work.

## Developing with UX Aspects

Prerequisites:
* [Git](https://git-scm.com/)
* NPM (v5 or higher) - part of [Node.js](https://nodejs.org/).

To build the project, which includes UX Aspects and the documentation site:

1. Clone the respository:
```bash
git clone https://github.com/UXAspects/UXAspects.git
```
2. Install the dependencies using `npm` in the repository directory:
```bash
npm ci
npm install -g grunt
```
3. Build the Iconset using `grunt` in the repository directory:
```bash
grunt iconset
```
4. Build the project and start the development server. This will automatically rebuild when source changes are made.
```bash
npm start
```
5. The documentation site is hosted at [http://localhost:8080/](http://localhost:8080/). This will automatically reload when changes are made.

To test changes in a specific scenario, you can click "Edit in Plunker" on a documentation section launched via `npm start`. This plunker will point at the development server, although you will have to manually refresh the plunker to pick up new changes.
