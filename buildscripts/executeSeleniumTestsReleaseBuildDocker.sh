#!/bin/bash
echo
echo
echo executeSeleniumTestsReleaseBuildDocker - UID is $UID
echo executeSeleniumTestsReleaseBuildDocker - GROUPS is $GROUPS
echo executeSeleniumTestsReleaseBuildDocker - GID is $GID
echo executeSeleniumTestsReleaseBuildDocker - EUID is $EUID
echo executeSeleniumTestsReleaseBuildDocker - USER is $USER
echo executeSeleniumTestsReleaseBuildDocker - PWD is $PWD

echo executeSeleniumTestsReleaseBuildDocker - Displaying groups
groups
echo executeSeleniumTestsReleaseBuildDocker - Displaying id
id

source /workspace/buildscripts/functions.sh

cd /workspace

# Create file containing the time tests started, for debugging
echo executeSeleniumTestsReleaseBuildDocker - Writing to ExecutingSeleniumTests
date -u > /workspace/ExecutingSeleniumTests

# Install NPM and bundle packages
echo executeSeleniumTestsReleaseBuildDocker - Running npm install
npm install

#echo Kill any existing process using port 4001
PID_GRUNT_CONNECT=`/bin/fuser -n tcp 4001 2> /dev/null`
echo executeSeleniumTestsReleaseBuildDocker - Old grunt connect process ID is $PID_GRUNT_CONNECT
if [ ! -z "$PID_GRUNT_CONNECT" ] ; then
    echo "Killing grunt connect process" ; kill -9 $PID_GRUNT_CONNECT ;
    # Loop until the old process is gone
    wait_for_grunt_connect_process_status_to_change 1 "finish" 4001
fi

# Clear up any traces of previous documentation and build the new web service
echo executeSeleniumTestsReleaseBuildDocker - Starting grunt clean
grunt clean

# Build the new web service
echo executeSeleniumTestsReleaseBuildDocker - Starting grunt build
grunt build
echo executeSeleniumTestsReleaseBuildDocker - Starting grunt connect:selenium_release
grunt connect:selenium_release &

# Loop until the file indicating that the tests have completed has been created
fileCheckDelay=10
while :
do
    if [ -f "/workspace/GridHubFinishedReleaseBuild" ]; then
        echo executeSeleniumTestsReleaseBuildDocker - GridHubFinishedReleaseBuild flag exists
        break
    fi
    sleep $fileCheckDelay
done

exit 0
