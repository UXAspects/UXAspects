/**
 * This script determijes the name of te ChromeDriver binary and updates
 * the Protractor configuration with the name.
 */
const path = require('path');
const glob = require('glob');
const replace = require('replace');

const driverPath = path.join(process.cwd(), 'node_modules', 'protractor', 'node_modules', 'webdriver-manager', 'selenium');
const configFilePath = path.join(process.cwd(), 'e2e', 'protractor.config.js');

getFile().then(file => {

    console.log('file found = ' + file);
    
    // Update the Protractor configuration file with the name of the driver binary
    replace({
        regex: 'chromedriver.exe',
        replacement: file,
        paths:[configFilePath]
    });    

    // end the script
    process.exit();
});


function getFile() {
    return new Promise((resolve) => {

        // Find non-zip file beginning with 'chromedriver_'
        glob('**/chromedriver_!(*.zip)', {
            cwd: driverPath
        }, (error, matches) => {

            if (error) {
                process.exit(1);
            }

            resolve(matches);
        });

    });
}