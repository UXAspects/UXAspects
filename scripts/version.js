const { env, cwd, exit } = require('process');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// extract the version from the environment variable
const version = env.VERSION;

// if there is no version specified then throw an error
if (!version) {
    throw new Error('Version has not been specified!');
}

// update the versions in all locations
setVersion(join(cwd(), 'bower.json'));
setVersion(join(cwd(), 'package.json'));
setVersion(join(cwd(), 'package-lock.json'));
setVersion(join(cwd(), 'src', 'package.json'));

// end the script
exit();

function setVersion(path) {
    // read file contents
    const content = readFileSync(path, 'utf8');

    // convert to a json structure
    const schema = JSON.parse(content);

    // alter the version property
    schema.version = version;

    // save the file
    writeFileSync(path, JSON.stringify(schema, null, 2));
}