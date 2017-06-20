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

hubProcessPort=4445
echo hubProcessPort is $hubProcessPort
documentationPort=4001
echo documentationPort is $documentationPort

echo Before changing to ux-aspects folder
echo PWD IS $PWD
echo Listing this folder
ls -al
echo Listing the ux-aspects folder
ls -al ux-aspects
echo Listing the $rootFolder/ux-aspects folder
ls -al $rootFolder/ux-aspects
cd $rootFolder/ux-aspects

# Update testng.xml to use the correct ports for testing of the release build
echo Updating testng.xml
sed -i.bak 's/4000/4001/g' testng.xml    # Documentation wil be published on port 4001
sed -i.bak 's/4444/4445/g' testng.xml       # The Selenium Grid hub process will use port 4445

# Create the latest ux-aspects-build image if it does not exist
docker_image_build "$rootFolder/ux-aspects/docker"; echo
echo Executing the Selenium tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container

# Remove any ContainerID file left behind by the previous container
if [ -f "$PWD/ContainerIDReleaseBuild" ]; then
    ContainerID=$(<"$PWD/ContainerIDReleaseBuild")
    echo Previous container ID is $ContainerID
    if [ ! -z $ContainerID ]; then
        echo Killing container ID $ContainerID
        docker kill $ContainerID
        echo Removing container ID $ContainerID
        docker rm -f $ContainerID
        echo Removing container ID file
        rm -f "$PWD/ContainerIDReleaseBuild"
    fi
fi

# Remove the file indicating that the tests have finished
if [ -f "$PWD/GridHubFinishedReleaseBuild" ]; then
    echo Removing grid hub flag
    rm -f "$PWD/GridHubFinishedReleaseBuild"
fi

# Create a new container which will build the new web service
echo Starting new container
docker_image_run_detached "$rootFolder/ux-aspects" $documentationPort "ContainerIDReleaseBuild" "bash buildscripts/executeSeleniumTestsReleaseBuildDocker.sh &"

# Loop until the container has been created
containerIDCheckDelay=5
while :
do
    if [ -f "$PWD/ContainerIDReleaseBuild" ]; then
        ContainerID=$(<"$PWD/ContainerIDReleaseBuild")
        echo New container ID is $ContainerID
        break
    else
        echo No container ID file created yet
    fi
    echo Sleeping for $containerIDCheckDelay seconds
    sleep $containerIDCheckDelay
done

# Display the output of the container
docker logs -f $ContainerID &

# Loop until the web service is available
wgetCheckDelay=5
while :
do
    bash -c 'wget --proxy=off -t 1 -O webservice.html localhost:4001 ; exit $?'
    wgstatus=$?
    echo wget returned $wgstatus
    rm -f "$PWD/webservice.html"
    if [ $wgstatus -eq 0 ]; then
        echo Web service is available
        break
    fi
    echo Sleeping for $wgetCheckDelay seconds
    sleep $wgetCheckDelay
done

# Kill any process using port 4445 (the Selenium Grid hub process) and start a new process
echo Kill any existing Selenium Grid hub process
PID_SELENIUM=`/usr/sbin/fuser -n tcp 4445 2> /dev/null`
echo Old Selenium Grid hub process ID is $PID_SELENIUM
if [ ! -z "$PID_SELENIUM" ] ; then
    echo "Killing existing Selenium Grid hub process" ; kill -9 $PID_SELENIUM ;
    # Loop until the old process is gone
    wait_for_grid_hub_process_status_to_change 1 "finish" $hubProcessPort
fi

echo Start the new Selenium Grid hub process
cd $rootFolder/ux-aspects
rm -rf target
cd $rootFolder/ux-aspects/configuration
java -jar /home/UXAspectsTestUser/ux-aspects/Selenium/selenium-server-standalone-3.3.1.jar -role hub \
    -hubConfig /home/UXAspectsTestUser/ux-aspects/Selenium/hub/hubConfigReleaseBuild.json &
wait_for_grid_hub_process_status_to_change 1 "start" $hubProcessPort

echo Started the Selenium Grid hub process
PID_SELENIUM=`/usr/sbin/fuser -n tcp 4445 2> /dev/null`
echo New Selenium Grid hub process ID is $PID_SELENIUM

# Run the tests
echo Running the tests
cd $rootFolder/ux-aspects
mvn test

# Create the file indicating to the container that the tests have finished
echo $PID_SELENIUM > "$PWD/GridHubFinishedReleaseBuild"

# Kill and remomve the container
if [ -f "$PWD/ContainerIDReleaseBuild" ]; then
    ContainerID=$(<"$PWD/ContainerIDReleaseBuild")
    echo Existing container ID is $ContainerID
    if [ ! -z $ContainerID ]; then
        echo Killing container ID $ContainerID
        docker kill $ContainerID
        echo Removing container ID $ContainerID
        docker rm -f $ContainerID
        echo Removing container ID file
        rm -f "$PWD/ContainerIDReleaseBuild"
    fi
fi

echo Kill the Selenium Grid hub process
if [ ! -z "$PID_SELENIUM" ] ; then
    echo "Killing the Selenium Grid hub process" ; kill -9 $PID_SELENIUM ;
    # Loop until the old process is gone
    wait_for_grid_hub_process_status_to_change 1 "finish" $hubProcessPort
fi

echo Before sleep
sleep 10

exit 0

