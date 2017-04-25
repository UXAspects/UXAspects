#!/bin/bash
echo
echo
echo In executeSeleniumTestsDocker.sh - In executeSeleniumTestsDocker.sh
echo In executeSeleniumTestsDocker.sh - UID is $UID
echo In executeSeleniumTestsDocker.sh - GROUPS is $GROUPS
echo In executeSeleniumTestsDocker.sh - GID is $GID
echo In executeSeleniumTestsDocker.sh - EUID is $EUID
echo In executeSeleniumTestsDocker.sh - USER is $USER
echo In executeSeleniumTestsDocker.sh - PWD is $PWD

echo In executeSeleniumTestsDocker.sh - Displaying groups
groups
echo In executeSeleniumTestsDocker.sh - Displaying id
id

cd /workspace

# Create file containing the time tests started, for debugging
echo In executeSeleniumTestsDocker.sh - Writing to ExecutingSeleniumTests
date -u > /workspace/ExecutingSeleniumTests

# Install NPM and bundle packages
echo In executeSeleniumTestsDocker.sh - Running npm install
npm install

#echo Kill any existing process using port 4000
PID_GRUNT_SELENIUM_BUILD=`/bin/fuser -n tcp 4000 2> /dev/null`
echo In executeSeleniumTestsDocker.sh - Old grunt selenium_build process ID is $PID_GRUNT_SELENIUM_BUILD
if [ ! -z "$PID_GRUNT_SELENIUM_BUILD" ] ; then echo "Killing the grunt selenium_build process" ; kill -9 $PID_GRUNT_SELENIUM_BUILD ; fi
sleep 10
PID_GRUNT_SELENIUM_BUILD=`/bin/fuser -n tcp 4000 2> /dev/null`
echo In executeSeleniumTestsDocker.sh - After kill, grunt selenium_build process ID is $PID_GRUNT_SELENIUM_BUILD

# Clear up any traces of previous documentation and build the new web service
echo In executeSeleniumTestsDocker.sh - Starting grunt clean
grunt clean

# Build the new web service
echo In executeSeleniumTestsDocker.sh - Starting grunt build
grunt build
echo In executeSeleniumTestsDocker.sh - Starting grunt connect:selenium
grunt connect:selenium &

# Loop until the file indicating that the tests have completed has been created
fileCheckDelay=10
while :
do
    PID_GRUNT_SELENIUM_BUILD=`/bin/fuser -n tcp 4000 2> /dev/null`
    if [ -f "/workspace/GridHubFinished" ]; then
        echo In executeSeleniumTestsDocker.sh - GridHubFinished flag exists
        break
    fi
    sleep $fileCheckDelay
done

exit 0
