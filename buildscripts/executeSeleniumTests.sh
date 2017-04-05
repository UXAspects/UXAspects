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
HOME_FOLDER="/home/UXAspectsTestUser"
echo HOME_FOLDER is $HOME_FOLDER

# Temporary commands to allow testing of Jenkins job
echo Listing contents of $HOME_FOLDER
ls -alR $HOME_FOLDER
cd $HOME_FOLDER/ux-aspects
cp $HOME_FOLDER/ux-aspects/buildscripts/emailable-report.html index.html
cp $HOME_FOLDER/ux-aspects/buildscripts/emailable-report.html $HOME_FOLDER/index.html
cp $HOME_FOLDER/ux-aspects/buildscripts/testng-results.xml .
cp $HOME_FOLDER/ux-aspects/buildscripts/testng-results.xml $HOME_FOLDER

exit 0