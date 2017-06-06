#!/bin/bash
echo
echo
echo executeSeleniumTestsDocker - UID is $UID
echo executeSeleniumTestsDocker - GROUPS is $GROUPS
echo executeSeleniumTestsDocker - GID is $GID
echo executeSeleniumTestsDocker - EUID is $EUID
echo executeSeleniumTestsDocker - USER is $USER
echo executeSeleniumTestsDocker - PWD is $PWD

echo executeSeleniumTestsDocker - Displaying groups
groups
echo executeSeleniumTestsDocker - Displaying id
id

source /workspace/buildscripts/functions.sh

cd /workspace

# Create file containing the time tests started, for debugging
echo executeSeleniumTestsDocker - Writing to ExecutingSeleniumTests
date -u > /workspace/ExecutingSeleniumTests

# Install NPM and bundle packages
echo executeSeleniumTestsDocker - Running npm install
npm install

#echo Kill any existing process using port 4000
PID_GRUNT_CONNECT=`/bin/fuser -n tcp 4000 2> /dev/null`
echo executeSeleniumTestsDocker - Old grunt connect process ID is $PID_GRUNT_CONNECT
if [ ! -z "$PID_GRUNT_CONNECT" ] ; then
    echo "Killing grunt connect process" ; kill -9 $PID_GRUNT_CONNECT ;
    # Loop until the old process is gone
    wait_for_grunt_connect_process_status_to_change 1 "finish" 4000
fi

# Clear up any traces of previous documentation and build the new web service
echo executeSeleniumTestsDocker - Starting grunt clean
grunt clean

# Build the new web service
echo executeSeleniumTestsDocker - Starting grunt build
grunt build
echo executeSeleniumTestsDocker - Starting grunt connect:selenium
grunt connect:selenium &

# Loop until the file indicating that the tests have completed has been created
fileCheckDelay=10
while :
do
    if [ -f "/workspace/GridHubFinished" ]; then
        echo executeSeleniumTestsDocker - GridHubFinished flag exists
        break
    fi
    sleep $fileCheckDelay
done

exit 0
