#!/bin/bash

echo
echo
echo Workspace is $WORKSPACE
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

cd $WORKSPACE/ux-aspects
testsFailed="false"

# Run the unit tests
echo "Running unit tests"
bash buildscripts/executeUnitTests.sh
if [ $? -ne 0 ]; then
    echo "Unit test(s) failed"
    testsFailed="true"
fi
echo

# Run the Protractor tests
echo "Running Protractor tests"
bash buildscripts/executeE2ETests.sh
if [ $? -ne 0 ]; then
    echo "Protractor test(s) failed"
    testsFailed="true"
fi
echo

if [ "$testsFailed" == "true" ]; then
    echo Tests failed, exiting with status 1
    exit 1;
fi

exit 0
