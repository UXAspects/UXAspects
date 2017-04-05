#!/bin/bash

echo Re-installing software on Selenium Grid node 1 ...
echo WORKSPACE is $WORKSPACE
echo PWD is $PWD
echo Build number is $BUILD_NUMBER
echo Displaying id
id

# Temporary commands to allow testing of Jenkins job
echo Listing contents of $WORKSPACE
ls -alR $WORKSPACE

exit 0