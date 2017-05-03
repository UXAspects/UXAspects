#!/bin/bash

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.9.0

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

HOME_FOLDER="/home/UXAspectsTestUser/UXAspectsTestsReleaseBuild"
echo HOME_FOLDER is $HOME_FOLDER

# Define a function to build a specified Docker image.
docker_image_build()
{
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        # Create the docker image
        cd $HOME_FOLDER/ux-aspects/docker
        echo Building the image
        docker build -t $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
            --build-arg http_proxy=$HttpProxy \
            --build-arg https_proxy=$HttpsProxy \
            --build-arg no_proxy="localhost, 127.0.0.1" \
            --no-cache .
        DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
        echo ID for new $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    fi
}

# Define a function to run a specified Docker image. The job's workspace will be mapped to /workspace in the container.
# The container will run using the UID of the user executing the job.
docker_image_run()
{
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        echo Image $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST does not exist!
    else
        echo Calling docker run ... "$@"
        docker run -d -it \
            --cidfile="$PWD/ContainerIDReleaseBuild" \
            --volume "$PWD":/workspace:rw --workdir /workspace \
            --user $UID:$GROUPS \
            -e "http_proxy=$HttpProxy" \
            -e "https_proxy=$HttpsProxy" \
            -e "no_proxy=localhost, 127.0.0.1" \
            -p 4001:4001 \
            $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
            "$@"
    fi
}

# Define a function which loops while waiting for the Selenium Grid hub process to start or finish
wait_for_grid_hub_process_status_to_change()
{
    processCheckDelay=$1
    processStatusAwaited=$2
    
    echo wait_for_grid_hub_process_status_to_change - processCheckDelay = $processCheckDelay
    echo wait_for_grid_hub_process_status_to_change - processStatusAwaited = $processStatusAwaited
    
    while :
    do
        PID_SELENIUM=`/usr/sbin/fuser -n tcp 4445 2> /dev/null`
        if [ "$processStatusAwaited" == "start" ] ; then
            if [ ! -z "$PID_SELENIUM" ] ; then
                echo Selenium Grid hub process has started
                break;
            fi
        else
            if [ -z "$PID_SELENIUM" ] ; then
                echo Selenium Grid hub process has finished
                break;
            fi
        fi
        
        echo Sleeping for $processCheckDelay seconds
        sleep $processCheckDelay
    done
}

echo Before changing to ux-aspects folder
echo PWD IS $PWD
echo Listing this folder
ls -al
echo Listing the ux-aspects folder
ls -al ux-aspects
echo Listing the $HOME_FOLDER/ux-aspects folder
ls -al $HOME_FOLDER/ux-aspects
cd $HOME_FOLDER/ux-aspects

# Update testng.xml to use the correct ports for testing of the release build
echo Updating testng.xml
sed -i.bak 's/4000/4001/g' testng.xml    # Documentation wil be published on port 4001
sed -i.bak 's/4444/4445/g' testng.xml    # The Selenium Grid hub process will use port 4445

# Create the latest ux-aspects-build image if it does not exist
docker_image_build; echo
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
docker_image_run bash buildscripts/executeSeleniumTestsReleaseBuildDocker.sh &

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
    wait_for_grid_hub_process_status_to_change 1 "finish"
fi

echo Start the new Selenium Grid hub process
cd $HOME_FOLDER/ux-aspects
rm -rf target
cd $HOME_FOLDER/ux-aspects/configuration
java -jar /home/UXAspectsTestUser/ux-aspects/Selenium/selenium-server-standalone-3.3.1.jar -role hub -hubConfig hub/hubConfigReleaseBuild.json &
wait_for_grid_hub_process_status_to_change 1 "start"

echo Started the Selenium Grid hub process
PID_SELENIUM=`/usr/sbin/fuser -n tcp 4445 2> /dev/null`
echo New Selenium Grid hub process ID is $PID_SELENIUM

# Run the tests
echo Running the tests
cd $HOME_FOLDER/ux-aspects
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
    wait_for_grid_hub_process_status_to_change 1 "finish"
fi

echo Before sleep
sleep 10

exit 0

