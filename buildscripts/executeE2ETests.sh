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
chmod a+rw .
date -u > $WORKSPACE/ux-aspects/BeforeE2ETestsStarted
ls -al BeforeE2ETestsStarted
docker_image_run "$WORKSPACE/ux-aspects" "bash buildscripts/executeE2ETestsDocker.sh"; echo
failureStatus=$?
if [ $failureStatus -ne 0 ] ; then
    echo $failureStatus tests returned failure status 
fi
echo

# The unit tests results file, UnitTestResults.txt, should have been created in this folder. Copy it to our results file and
# ignore unwanted strings.
echo Adding Protractor test results to the results file
echo "</p></p></p>" >> UXAspectsTestsResults.html
echo "<h2>Protractor Tests</h2>" >> UXAspectsTestsResults.html
while read line ; do
     echo "$line" >> UXAspectsTestsResults.html
done < e2e_output.html
echo "</body></html>" >> UXAspectsTestsResults.html

cp UXAspectsTestsResults.html index.html
cp index.html index-${BUILD_NUMBER}.html
mkdir -p $WORKSPACE/reports
cp index.html $WORKSPACE/reports/index.html
mkdir -p $WORKSPACE/ux-aspects/reports
cp UXAspectsTestsResults.html reports/index.html

exit $failureStatus
