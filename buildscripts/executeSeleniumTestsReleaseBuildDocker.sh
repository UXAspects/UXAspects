#!/bin/bash
echo
echo
echo In executeSeleniumTestsReleaseBuildDocker.sh - In executeSeleniumTestsReleaseBuildDocker.sh
echo In executeSeleniumTestsReleaseBuildDocker.sh - UID is $UID
echo In executeSeleniumTestsReleaseBuildDocker.sh - GROUPS is $GROUPS
echo In executeSeleniumTestsReleaseBuildDocker.sh - GID is $GID
echo In executeSeleniumTestsReleaseBuildDocker.sh - EUID is $EUID
echo In executeSeleniumTestsReleaseBuildDocker.sh - USER is $USER
echo In executeSeleniumTestsReleaseBuildDocker.sh - PWD is $PWD

echo In executeSeleniumTestsReleaseBuildDocker.sh - Displaying groups
groups
echo In executeSeleniumTestsReleaseBuildDocker.sh - Displaying id
id

cd /workspace

# Create file containing the time tests started, for debugging
echo In executeSeleniumTestsReleaseBuildDocker.sh - Writing to ExecutingSeleniumTests
date -u > /workspace/ExecutingSeleniumTests

# Install NPM and bundle packages
echo In executeSeleniumTestsReleaseBuildDocker.sh - Running npm install
npm install

#echo Kill any existing process using port 4001
PID_GRUNT_SELENIUM_BUILD=`/bin/fuser -n tcp 4001 2> /dev/null`
echo In executeSeleniumTestsReleaseBuildDocker.sh - Old grunt selenium_build process ID is $PID_GRUNT_SELENIUM_BUILD
if [ ! -z "$PID_GRUNT_SELENIUM_BUILD" ] ; then echo "Killing the grunt selenium_build process" ; kill -9 $PID_GRUNT_SELENIUM_BUILD ; fi
sleep 10
PID_GRUNT_SELENIUM_BUILD=`/bin/fuser -n tcp 4001 2> /dev/null`
echo In executeSeleniumTestsReleaseBuildDocker.sh - After kill, grunt selenium_build process ID is $PID_GRUNT_SELENIUM_BUILD

# Clear up any traces of previous documentation and build the new web service
echo In executeSeleniumTestsReleaseBuildDocker.sh - Starting grunt clean
grunt clean

# Build the new web service
echo In executeSeleniumTestsReleaseBuildDocker.sh - Starting grunt selenium_build
grunt build
echo In executeSeleniumTestsReleaseBuildDocker.sh - Starting grunt connect:selenium
grunt connect:selenium &

# Loop until the file indicating that the tests have completed has been created
fileCheckDelay=10
while :
do
    PID_GRUNT_SELENIUM_BUILD=`/bin/fuser -n tcp 4001 2> /dev/null`
    if [ -f "/workspace/GridHubFinishedReleaseBuild" ]; then
        echo In executeSeleniumTestsReleaseBuildDocker.sh - GridHubFinishedReleaseBuild flag exists
        break
    fi
    sleep $fileCheckDelay
done

exit 0
