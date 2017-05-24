#!/bin/bash

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.10.0

# Define a function to build a specified Docker image.
docker_image_build()
{
    dockerfileLocation=$1
    
    echo ${FUNCNAME[0]} - dockerfileLocation is $dockerfileLocation
    echo ${FUNCNAME[0]} - HttpProxy is $HttpProxy
    echo ${FUNCNAME[0]} - HttpsProxy is $HttpsProxy
    
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        # Create the docker image
        cd $dockerfileLocation
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
docker_image_run_detached()
{
    rootFolder=$1
    port=$2
    command=$3
    
    echo ${FUNCNAME[0]} - rootFolder is $rootFolder
    echo ${FUNCNAME[0]} - HttpProxy is $HttpProxy
    echo ${FUNCNAME[0]} - HttpsProxy is $HttpsProxy
    echo ${FUNCNAME[0]} - port is $port
    echo ${FUNCNAME[0]} - command is $command
    
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        echo Image $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST does not exist!
    else
        cd $rootFolder
        echo Calling docker run detached with command ... "$command"
        dockerCommand="docker run -d -it --cidfile=\"$PWD/ContainerID\" \
            --volume \"$PWD\":/workspace:rw --workdir /workspace \
            --user $UID:$GROUPS \
            -e \"http_proxy=$HttpProxy\" \
            -e \"https_proxy=$HttpsProxy\" \
            -e \"no_proxy=localhost, 127.0.0.1\" \
            -p $port:$port \
            $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
            $command"
        
        echo dockerCommand is $dockerCommand
        eval $dockerCommand
    fi
}

# Define a function to run a specified Docker image. The job's workspace will be mapped to /workspace in the container.
# The container will run using the UID of the user executing the job.
docker_image_run()
{
    rootFolder=$1
    command=$2
    
    echo ${FUNCNAME[0]} - rootFolder is $rootFolder
    echo ${FUNCNAME[0]} - command is $command
    
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        echo Image $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST does not exist!
    else
        cd $rootFolder
        echo Calling docker run with command ... "$command"
        dockerCommand="docker run --rm --volume \"$PWD\":/workspace \
            --workdir /workspace \
            --user $UID:$GROUPS \
            $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
            $command"
        
        echo dockerCommand is $dockerCommand
        eval $dockerCommand
    fi
}

# Define a function which loops while waiting for the Selenium Grid hub process to start or finish
wait_for_grid_hub_process_status_to_change()
{
    processCheckDelay=$1
    processStatusAwaited=$2
    port=$3
    
    echo ${FUNCNAME[0]} - processCheckDelay is $processCheckDelay
    echo ${FUNCNAME[0]} - processStatusAwaited is $processStatusAwaited
    echo ${FUNCNAME[0]} - port is $port
    
    if [[ "$port" =~ ^[0-9]+$ ]]
    then
        echo $port is a number
    else
        echo $port is not a port number
        exit 1;
    fi
    
    while :
    do
        command="/usr/sbin/fuser -n tcp "$port" 2> /dev/null"        
        echo ${FUNCNAME[0]} - command is $command        
        PID_SELENIUM=`"$command"`
        
        if [ "$processStatusAwaited" == "start" ] ; then
            if [ ! -z "$PID_SELENIUM" ] ; then
                echo ${FUNCNAME[0]} - Selenium Grid hub process has started
                break;
            fi
        else
            if [ -z "$PID_SELENIUM" ] ; then
                echo ${FUNCNAME[0]} - Selenium Grid hub process has finished
                break;
            fi
        fi
        
        echo Sleeping for $processCheckDelay seconds
        sleep $processCheckDelay
    done
}

# Define a function which loops while waiting for the grunt connect process to start or finish
wait_for_grunt_connect_process_status_to_change()
{
    processCheckDelay=$1
    processStatusAwaited=$2
    port=$3
    
    echo ${FUNCNAME[0]} - processCheckDelay = $processCheckDelay
    echo ${FUNCNAME[0]} - processStatusAwaited = $processStatusAwaited
    echo ${FUNCNAME[0]} - port is $port
    
    if [[ "$port" =~ ^[0-9]+$ ]]
    then
        echo $port is a number
    else
        echo $port is not a port number
        exit 1;
    fi
    
    while :
    do
        command="/bin/fuser -n tcp "$port" 2> /dev/null"        
        echo ${FUNCNAME[0]} - command is $command        
        PID_GRUNT_CONNECT=`"$command"`
        
        if [ "$processStatusAwaited" == "start" ] ; then
            if [ ! -z "$PID_GRUNT_CONNECT" ] ; then
                echo ${FUNCNAME[0]} - grunt connect process has started
                break;
            fi
        else
            if [ -z "$PID_GRUNT_CONNECT" ] ; then
                echo ${FUNCNAME[0]} - grunt connect process has ended
                break;
            fi
        fi
        
        echo Sleeping for $processCheckDelay seconds
        sleep $processCheckDelay
    done
}

