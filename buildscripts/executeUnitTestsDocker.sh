#!/bin/bash
echo
echo
echo In executeUnitTestsDocker.sh
echo Workspace is $WORKSPACE
echo Build number is $BUILD_NUMBER
echo UID is $UID
echo GROUPS is $GROUPS
echo GID is $GID
echo EUID is $EUID
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Displaying groups
groups
echo Displaying id
id

cd /workspace

# Create file containing the time tests started, for debugging
echo Writing to ExecutingUnitTests
date -u > /workspace/ExecutingUnitTests

# Install NPM packages and run the tests, redirecting test output to a text file.
echo Running npm install
npm install
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== npm install failed returning $exitCode"
    exit 1
fi
echo

echo Running grunt test
grunt test > /workspace/UnitTestResults.txt
exitCode=$?        
echo exitCode is $exitCode
echo

exit $exitCode