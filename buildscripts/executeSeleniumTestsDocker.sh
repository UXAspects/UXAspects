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

# Define a function which loops while waiting for the grunt connect process to start or finish
wait_for_grunt_connect_process_status_to_change()
{
    processCheckDelay=$1
    processStatusAwaited=$2
    
    echo wait_for_grunt_connect_process_status_to_change - processCheckDelay = $processCheckDelay
    echo wait_for_grunt_connect_process_status_to_change - processStatusAwaited = $processStatusAwaited
    
    while :
    do
        PID_GRUNT_CONNECT=`/bin/fuser -n tcp 4000 2> /dev/null`
        if [ "$processStatusAwaited" == "start" ] ; then
            if [ ! -z "$PID_GRUNT_CONNECT" ] ; then
                echo In executeSeleniumTestsDocker.sh - grunt connect process has started
                break;
            fi
        else
            if [ -z "$PID_GRUNT_CONNECT" ] ; then
                echo In executeSeleniumTestsDocker.sh - grunt connect process has ended
                break;
            fi
        fi
        
        echo Sleeping for $processCheckDelay seconds
        sleep $processCheckDelay
    done
}

cd /workspace

# Create file containing the time tests started, for debugging
echo In executeSeleniumTestsDocker.sh - Writing to ExecutingSeleniumTests
date -u > /workspace/ExecutingSeleniumTests

# Install NPM and bundle packages
echo In executeSeleniumTestsDocker.sh - Running npm install
npm install

#echo Kill any existing process using port 4000
PID_GRUNT_CONNECT=`/bin/fuser -n tcp 4000 2> /dev/null`
echo In executeSeleniumTestsDocker.sh - Old grunt connect process ID is $PID_GRUNT_CONNECT
if [ ! -z "$PID_GRUNT_CONNECT" ] ; then
    echo "Killing grunt connect process" ; kill -9 $PID_GRUNT_CONNECT ;
    # Loop until the old process is gone
    wait_for_grunt_connect_process_status_to_change 1, "finish"
fi

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
    if [ -f "/workspace/GridHubFinished" ]; then
        echo In executeSeleniumTestsDocker.sh - GridHubFinished flag exists
        break
    fi
    sleep $fileCheckDelay
done

exit 0
