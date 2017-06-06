#!/bin/bash

source $PWD/buildscripts/functions.sh

echo USER is $USER
echo PWD IS $PWD
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST

rootFolder="$PWD"
echo rootFolder is $rootFolder

# Update Gruntfile.js to allow building of the documentation. Publish on port 4000.
cd $rootFolder
sed -i.bak 's/hostname: '"'"'localhost'"'"'/hostname: '"'"'0.0.0.0'"'"'/' grunt/connect.js
sed -i.bak 's/livereload: true/livereload: false/g' grunt/connect.js

# Create the latest ux-aspects-build image if it does not exist
docker_image_build "$rootFolder/docker"; echo
echo Building the web service in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container

# Remove any ContainerID file left behind be the previous container
if [ -f "$rootFolder/ContainerID" ]; then
    ContainerID=$(<"$rootFolder/ContainerID")
    echo Previous container ID is $ContainerID
    if [ ! -z $ContainerID ]; then
        echo Killing container ID $ContainerID
        docker kill $ContainerID
        echo Removing container ID $ContainerID
        docker rm -f $ContainerID
        echo Removing container ID file
        rm -f "$rootFolder/ContainerID"
    fi
fi

# Create a new container which will build the new web service
echo Starting new container
docker_image_run_detached "$rootFolder" 4000 "bash buildscripts/executeSeleniumTestsDocker.sh &"

# Loop until the container has been created
containerIDCheckDelay=5
while :
do
    if [ -f "$rootFolder/ContainerID" ]; then
        ContainerID=$(<"$rootFolder/ContainerID")
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
    bash -c 'wget --proxy=off -t 1 -O webservice.html localhost:4000 ; exit $?'
    wgstatus=$?
    echo wget returned $wgstatus
    rm -f "$rootFolder/webservice.html"
    if [ $wgstatus -eq 0 ]; then
        echo Web service is available
        break
    fi
    echo Sleeping for $wgetCheckDelay seconds
    sleep $wgetCheckDelay
done

# Trap ctrl-c and call cleanup function
trap ctrl_c INT

function ctrl_c() {
    echo "** Trapped CTRL-C"
    if [ -f "$rootFolder/ContainerID" ]; then
        ContainerID=$(<"$rootFolder/ContainerID")
        echo Container ID is $ContainerID
        if [ ! -z $ContainerID ]; then
            echo Killing container ID $ContainerID
            docker kill $ContainerID
            echo Removing container ID $ContainerID
            docker rm -f $ContainerID
            echo Removing container ID file
            rm -f "$rootFolder/ContainerID"
        fi
    fi
    exit 0
}

# Loop until testing is finished
while :
do
    echo -n .
    sleep 1
done

exit 0
