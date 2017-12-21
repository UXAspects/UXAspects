#!/bin/bash

failureStatus=0

cd $WORKSPACE/ux-aspects
source $PWD/buildscripts/functions.sh

echo
echo
echo Workspace is $WORKSPACE
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo UID is $UID
echo GROUPS is $GROUPS
echo GID is $GID
echo EUID is $EUID
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

rm -f E2ETestResults.txt

# Execute the Protractor tests
echo Executing the E2E tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container
cd $WORKSPACE/ux-aspects
chmod a+rw .
date -u > $WORKSPACE/ux-aspects/BeforeE2ETestsStarted
ls -al BeforeE2ETestsStarted
docker_image_run "$WORKSPACE/ux-aspects" "bash buildscripts/executeE2ETestsDocker.sh"; echo
failureStatus=$?
if [ $failureStatus -ne 0 ] ; then
    echo $failureStatus tests returned failure status 
fi
echo

echo Adding E2E test results to the results file

exit $failureStatus
