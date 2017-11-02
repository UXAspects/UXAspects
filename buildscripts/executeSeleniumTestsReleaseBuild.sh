#!/bin/bash

rootFolder="/home/UXAspectsTestUser/UXAspectsTestsReleaseBuild"
echo rootFolder is $rootFolder

cd $rootFolder/ux-aspects
source $PWD/buildscripts/functions.sh

echo Workspace is $WORKSPACE
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME
echo Displaying groups
groups
echo Displaying id
id

exit 0

