# Contributing to UX Aspects

Found a bug, or thought of a new feature that would benefit others? UX Aspects is open to contributions! Please read the following guide to ensure a good understanding of the contribution process.

## Before you get started

It is recommended to contact one of the maintainers of UX Aspects before embarking upon a significant set of changes. Agreeing on the design and user experience of a change up front will save time overall.

We will be able to help make sure that contributions meet the standards of inclusion into a reusable component library, including:
* Offering a user experience consistent with the rest of the library.
* Meeting accessibility requirements.
* Being fully documented.
* Having automated test coverage.
* Adhering to coding standards.

The [Developer Standard](https://github.com/UXAspects/UXAspects/blob/master/guides/developer-standard.md) contains more details on the standards, and how to meet them.

## Pre-requisites

You will need the following software on your development environment:
* [Git](https://git-scm.com/downloads) - see [Set up Git](https://help.github.com/en/github/getting-started-with-github/set-up-git) on GitHub help.
* [Node.js](https://nodejs.org/en/) - v12 is currently required.
* [Docker](https://www.docker.com/get-started) - used to run the e2e test suite.
    * If you encounter an error when pulling the selenium docker image, make sure that you have an account at https://hub.docker.com/ and you are signed in to the docker service on your environment.

The following software is not required, but recommended:
* [GitHub Desktop](https://desktop.github.com/)
* [Visual Studio Code](https://code.visualstudio.com/)
    * [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) - extension pack for Visual Studio Code

If you are using Windows, you may want to consider **Git Bash** (comes with Git for Windows) as an alternative to the CMD shell. It can also be integrated into the terminal panel in Visual Studio Code.

## Fork the repository

The first step is to make a fork of the repository. This will give you a full copy of the repository to experiment with, and open up to other collaborators as you see fit. Pushing changes to your forked repository will not affect the original UX Aspects repository.

> See [Fork a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) on GitHub Help.

After cloning the repository, the default branch will be named `develop-x.y.z`. This will be deleted after the corresponding release, so when starting work on a new feature it is important to create a new branch.

### Reusing an existing fork

If you already have a fork of the repository from previous contributions, you will not be able to create a new one. However a fork works similarly to a branch, so you can pull changes from the original repository.

> See [Configuring a remote for a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork) and [Syncing a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) on GitHub Help.

After pulling the latest changes into your fork's `master` branch, be sure to create a new branch for your work.

## Create a branch

It is strongly recommended to create a new branch every time you start a new piece of work in Git. Even when your branch is merged, but you realise you want to make some additional changes on the same feature, things will be a lot smoother if you go back to the default branch, pull changes, and create a fresh branch.

> See [Understanding the GitHub flow](https://guides.github.com/introduction/flow/) on GitHub Guides for an overview of the standard workflow.

> Note: For compatibility with our continuous build system, please do not use underscores in branch names.

## Build the project

The UX Aspects project consists of the `@ux-aspects/ux-aspects` library (under `src`) and the documentation site (under `docs`).

### Install dependencies

UX Aspects projects use NPM to download 3rd party dependencies. Therefore, after cloning the project, and every time the dependencies are updated for the project, run:

````bash
npm ci
````

We prefer `npm ci` over `npm install` because it ensures that the same version of each dependency in the dependency tree is installed on every environment.

> See [npm-ci](https://docs.npmjs.com/cli/ci.html) on the NPM documentation site for more information.

> Tip: If you see `EPERM` errors when running `npm ci` or `npm install`, it means another application has a lock on one of the files, preventing NPM from deleting it. In most cases this is your IDE, so try closing it and running the command again.

### Start the development server

With all the dependencies in place, you are ready to start development. The following command will build the library and the documentation together, and serve it up using the webpack development server (WDS).

````bash
npm start
````

The documentation site is hosted at http://localhost:8080. This will automatically reload when changes are made.

### Build the library

To test your modified version of `@ux-aspects/ux-aspects` in another project, you will need to make a production build.

````bash
npm run build:library
````

After this is complete, you will find the NPM package in the `target/npm` directory as `ux-aspects-ux-aspects-x.y.z.tgz`. This file can be passed as a parameter to `npm install`, allowing you to deploy to another project.

## Run tests

UX Aspects uses Karma for unit tests, and Protractor for end-to-end (e2e) tests. The tests should always be run before making a pull request.

````bash
npm run test
````

> Note: The first run of the Protractor tests may take longer than expected, in order to download and deploy the required Docker container.

## Start a Jenkins build

> Note: The Jenkins server is only available on the intranet. If the following link is not accessible, this part can be skipped.

See [Using Jenkins](https://github.houston.softwaregrp.net/caf/ux-aspects-micro-focus/blob/master/JENKINS.md) for information on creating a continuous integration (CI) build for your branch.

## Make a pull request

With all changes pushed and (ideally) a passing Jenkins build, it's time to make a pull request on the upstream repositories.

> See [Creating a pull request from a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) on GitHub help.

UX Aspects has a pull request template, and it's important to fill this in as clearly as you can to help the maintainers review your request. Remember that developers may have to refer to this pull request months or years later to find the justification for a change.

* The **Checklist** helps to assert that products can use UX Aspects without legal issues. Check each one with `[x]` if it applies to your submission. If you are unable to check any of the listed items, contact one of the UX Aspects maintainers for advice.
* The **Ticket / Issue** field describes the problem that the pull request addresses. If you have access to the UX Aspects Jira board, or are aware of the ticket number, please fill it in here. Otherwise, describe the problem that the pull request intends to solve, and where possible, include a repro case in the form of a Plunker link.
* The **Description of Proposed Changes** field describes what you have changed and why.
* The **Documentation CI URL** field should be filled in after initiating an automated build with Jenkins. If you don't have access to create a build, please note that here instead.

For example, a completed pull request might look like this:

````markdown
#### Checklist
<!-- Use an 'x' to check those which apply. -->
* [x] The contents of this PR are mine to submit. No third party code or other material is being committed.
* [x] New third party dependencies (if any) are linked via `package.json`. Third party dependencies are
licenced under one of the following: Apache, MIT, BSD, Mozilla Public License, Eclipse Public License, or
Oracle Binary Code License.
* [x] The code in this PR does not contain export-restricted encryption algorithms.

#### Ticket / Issue
<!-- Either a Jira URL or a description of the issue that this PR addresses. -->
I noticed that newly added screenshots have been overlooked in the Micro Focus repo at least once.

#### Description of Proposed Changes
Tests will fail on the build machine if screenshots are missing. This will ensure that screenshots do get
added at some point before the release.

It is still possible to retrieve reference images from the build machine on a failed build.

I'll make the same change in the other repo if approved.

#### Documentation CI URL
<!-- Initiate a build at https://jenkins.swinfra.net/job/SEPG/view/Templates/job/New%20SEPG%20Build/build -->
<!-- Append the branch name to the following URL: -->
https://pages.github.houston.softwaregrp.net/sepg-docs-qa/UXAspects_CI_UXAspects_fail-on-missing-ss
````

After creating the pull request, the maintainers will be notified and someone will be assigned to review your pull request.

### Updating a pull request

Most pull requests need changes of some kind. If a reviewer has requested changes on your pull request, you can push new commits on your branch. This will trigger a new build on Jenkins including the changes.

Since it may be necessary to push multiple commits, please leave a comment to indicate when the pull request is ready for review again.

## Summary of build tasks

This is a complete list of the build tasks available in this project. Not all of these will necessarily be useful on a development environment.

| Task | Description |
|-|-|
| `npm run build:library` | Builds and packages the library only. |
| `npm run build` | Builds and packages both the library and the documentation. |
| `npm run compile` | Builds the library without packaging it. Mainly for use by the build server. |
| `npm run docker:ci` | Starts a Linux docker container and enters the shell. This is the same image used by the Jenkins build server. |
| `npm run generate:iconset` | Regenerate the icon set from the source SVG files. |
| `npm run lint` | Runs the lint task, which checks code for potential errors. |
| `npm run package` | Creates the NPM package and a .tgz archive of the documentation in the `target` directory. Mainly for use by the build server. |
| `npm run setversion` | Updates the version number in several places based on the `VERSION` environment variable. Mainly for use by the build server. |
| `npm run start:e2e` | Builds and serves the e2e test application. This does not run the tests. |
| `npm run start:karma` | Builds and runs the Karma tests. Rebuilds and re-runs after changes are made to the tests. |
| `npm run test:e2e` | Runs the e2e tests. |
| `npm run test:karma` | Runs the Karma tests. |
| `npm run test` | Runs the Jasmine, Karma, and e2e tests. Does not build the library, so `npm run build:library` will be needed beforehand. |
| `npm start` | Builds and serves the library and documentation using the webpack development server. |
