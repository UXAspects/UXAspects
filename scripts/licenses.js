// import dependencies 
const path = require('path');
const fs = require('fs');
const glob = require("glob");

const startToken = 'LICENSE-START';
const endToken = 'LICENSE-END';

const pluginPath = path.join(process.cwd(), 'src', 'ng1', 'plugins');
const externalPath = path.join(process.cwd(), 'src', 'ng1', 'external');
const fontPath = path.join(process.cwd(), 'src', 'fonts');

// Add an extension so we can specify a webpack loader
const assetsLicensePath = path.join(process.cwd(), 'docs', 'app', 'assets', 'licenses.txt');

const outputPath = path.join(process.cwd(), 'dist', 'Licenses');

// wait for all licenses to be retrieved
let pluginPromise = extractLicenses(pluginPath, '.js');
let externalPromise = extractLicenses(externalPath, '.js');
let fontsPromise = extractLicenses(fontPath, '.txt');

Promise.all([pluginPromise, externalPromise, fontsPromise]).then(values => { 

    let licenses = [];

    // merge all license files
    values.forEach(licenseSet => licenses = licenses.concat(licenseSet));

    // create license files
    createLicenseFile(licenses);
});

function extractLicenses(directory, extension) {

    let promise = new Promise((resolve) => {

        glob(`**/*${extension}`, { cwd: directory }, (err, files) => {

            // determine when all files have been processed
            let counter = files.length;

            // if there are no items then resolve promise
            if (counter === 0) {
                resolve([]);
            }

            // store all license headers
            let licenses = [];

            // iterate each file
            files.forEach(file => {

                let filePath = path.join(directory, file);

                fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {

                    var start = data.indexOf('LICENSE-START');
                    var end = data.indexOf('LICENSE-END');

                    var header = data.substr(start, (end - start)).replace(startToken, '').replace(endToken, '').trim();

                    // if there is no license dont push anything
                    if (header.length !== 0) {
                        licenses.push(header);
                    }

                    // check if this is the last file
                    if (--counter <= 0) {
                        resolve(licenses);
                    }
                });
            });
        });
    });

    return promise;
}


function createLicenseFile(licenses) {
    var separator = '\r\n-----------------------------------------------------------------------------------\r\n';
    var output = 'UX ASPECTS OPEN SOURCE LICENSES' + separator + licenses.join(separator);
    fs.writeFileSync(outputPath, output);
    fs.writeFileSync(assetsLicensePath, output);
}
