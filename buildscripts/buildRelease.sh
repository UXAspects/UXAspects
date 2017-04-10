#!/bin/bash
set -e

SELENIUM_TEST_MACHINE_USER=UXAspectsTestUser

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.7.0

echo Workspace is $WORKSPACE
echo NextVersion is $NextVersion
echo NextVersion is $next_version
echo RunTests is $RunTests
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo BuildPackages is $BuildPackages
echo PrivateArtifactoryURL is $PrivateArtifactoryURL
echo PrivateArtifactoryCredentials is $PrivateArtifactoryCredentials
echo BuildDocumentation is $BuildDocumentation
echo GridHubIPAddress is $GridHubIPAddress
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo SSH logon is $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME
echo Displaying groups
groups
echo Displaying id
id

latestCommitID=`git rev-parse HEAD`
echo latestCommitID is $latestCommitID

# Temporary commands to allow testing of Jenkins job
echo Listing contents of $WORKSPACE
ls -alR $WORKSPACE
cd $WORKSPACE/ux-aspects
cp $WORKSPACE/ux-aspects/buildscripts/emailable-report.html index.html
cp $WORKSPACE/ux-aspects/buildscripts/testng-results.xml .
mkdir -p $WORKSPACE/reports
cp index.html $WORKSPACE/reports/index.html
mkdir -p $WORKSPACE/ux-aspects/reports
cp index.html $WORKSPACE/ux-aspects/reports/index.html

exit 0