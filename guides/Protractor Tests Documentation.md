
### These instructions apply to Windows machines only.


### Software installation and configuration

#### Required software

Install the [Java SE SDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

- Add the environment variable JAVA\_HOME, setting it to the location of the JDK e.g. C:\Program Files\Java\jdk1.8.0_121.
- Add the location of the JDK's Bin folder to the PATH environment variable.

Install [NodeJS](https://nodejs.org/en/) (version 7.4.0 or higher).

Install [Git for Windows](https://git-scm.com/download/win).

- Ensure that the *Git Bash Here* checkbox is checked in the Select Components page.

Clone the UXAspects repository

- After installing Git, in Windows Explorer right-click in the folder where you wish to clone the UXAspects repository, open a Git Bash command prompt and run `git clone https://github.com/UXAspects/UXAspects.git`.
- cd to the 'UXAspects' folder and check out the required branch e.g. `git checkout develop`.

#### Building UXAspects

The Protractor tests require assets created when UXAspects is built.

- In the 'UXAspects' folder run the commands `npm install` and `grunt build`.

#### Running the Protractor tests

- In the 'UXAspects' folder run the command `grunt e2e`. Results files will be created in the e2e/HTML and e2e/xml folders.

### Adding a new test

Create a test page

- Create a folder under e2e/pages/app. In the folder create a HTML file and a TypeScript file defining the components to be tested.

- Edit e2e/pages/app.module.ts. Import the new test page component. Add the component to the 'ROUTES' and 'declarations' arrays.

Create the new tests

- Create a folder for the tests under e2e/tests.

- Create a PageObject file (named xxxxxx.po.spec.ts) to wrap access to controls on the test page.

- Create a file (names xxxxxx.e2e-spec.ts) containing the Jasmine-based tests. The tests should access elements in the test page through exports from the PageObject file.

#### Screenshot Testing

To prevent style regressions we can add screenshot comparison tests:

```typescript
expect(await imageCompare('checkbox-initial')).toEqual(0);
```

If this test is run and there is no baseline image to compare against one will be generated in the `e2e/screenshots` folder. Subsequent runs
will then test against the previous baseline image.

If a component has been updated and has visually changed, the baseline image needs to be updated otherwise tests will fail.
Our CI build runs in a Linux environment, which has different font rendering than a Windows environment, therefore to prevent differences in the font variation baseline images should be generated in a Linux environment.

We provide an `npm` script that allows you to use Docker to run a CI environment on your local machine. Your current developer environment will be
mounted allowing you to run the `e2e` tests and produce baseline images.

##### Prerequisites

1. Install Docker
3. Configure Docker proxy settings (optional)

##### Run Tests

Follow these steps to run the tests in a CI environment locally:

1. `npm run docker:ci`
2. `npm ci`
3. `npm run build:library`
4. `npm run test:e2e`

To exit the docker container and restore your developer environment run the following:

1. `exit`
2. `npm ci`


### Executing tests in different browsers

By default, tests will be executed in the Chrome browser. To test in other browsers uncomment the appropriate line in the 'capabilities' object in e2e/protracor.config.js. Only one browser may be tested at a time.

### Useful links

Protractor Tutorials
<http://www.protractortest.org>

