#!/bin/bash

echo Workspace is $WORKSPACE
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build number is $BUILD_NUMBER
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME
echo Displaying groups
groups
echo Displaying id
id

# Temporary commands to allow testing of Jenkins job
echo Listing contents of $WORKSPACE
ls -alR $WORKSPACE
cd $WORKSPACE/ux-aspects
cp $WORKSPACE/ux-aspects/buildscripts/unitTestResults.html index.html
cp index.html index-${BUILD_NUMBER}.html
mkdir -p $WORKSPACE/reports
cp index.html $WORKSPACE/reports/index.html
mkdir -p $WORKSPACE/ux-aspects/reports
cp index.html $WORKSPACE/ux-aspects/reports/index.html

exit 0