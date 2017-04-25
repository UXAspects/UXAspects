#!/bin/bash
UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.9.0

echo USER is $USER
echo PWD IS $PWD
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST

HOME_FOLDER="$PWD"
echo HOME_FOLDER = $HOME_FOLDER

# Define a function to remove a specified Docker image
docker_image_remove()
{
    DOCKER_IMAGE_ID=`docker images | grep $1 | grep $2 | awk '{print $3}'`
    echo ID for $1:$2 image is $DOCKER_IMAGE_ID
    if [ ! -z "$DOCKER_IMAGE_ID" ] ; then
        # Remove the docker image
        echo Removing the $1:$2 image
        docker rmi -f $DOCKER_IMAGE_ID
    fi
}

# Define a function to build a specified Docker image.
docker_image_build()
{
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        # Create the docker image
        cd $HOME_FOLDER/docker
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
			--cidfile="$HOME_FOLDER/ContainerID" \
			--volume "$HOME_FOLDER":/workspace --workdir /workspace \
			-p 4000:4000 \
			$UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
			"$@"
    fi
}

# Update Gruntfile.js to allow building of the documentation. Publish on port 4000.
cd $HOME_FOLDER
sed -i.bak 's/hostname: '"'"'localhost'"'"'/hostname: '"'"'0.0.0.0'"'"'/' grunt/connect.js
sed -i.bak 's/livereload: true/livereload: false/g' grunt/connect.js

# Create the latest ux-aspects-build image if it does not exist
docker_image_build; echo
echo Building the web service in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container

# Remove any ContainerID file left behind be the previous container
if [ -f "$HOME_FOLDER/ContainerID" ]; then
    ContainerID=$(<"$HOME_FOLDER/ContainerID")
    echo Previous container ID is $ContainerID
    if [ ! -z $ContainerID ]; then
        echo Killing container ID $ContainerID
    	docker kill $ContainerID
        echo Removing container ID $ContainerID
    	docker rm -f $ContainerID
        echo Removing container ID file
    	rm -f "$HOME_FOLDER/ContainerID"
    fi
fi

# Create a new container which will build the new web service
echo Starting new container
docker_image_run bash buildscripts/executeSeleniumTestsDocker.sh &

# Loop until the container has been created
containerIDCheckDelay=5
while :
do
	if [ -f "$HOME_FOLDER/ContainerID" ]; then
		ContainerID=$(<"$HOME_FOLDER/ContainerID")
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
	rm -f "$HOME_FOLDER/webservice.html"
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
    if [ -f "$HOME_FOLDER/ContainerID" ]; then
        ContainerID=$(<"$HOME_FOLDER/ContainerID")
        echo Container ID is $ContainerID
        if [ ! -z $ContainerID ]; then
            echo Killing container ID $ContainerID
    	    docker kill $ContainerID
            echo Removing container ID $ContainerID
    	    docker rm -f $ContainerID
            echo Removing container ID file
    	    rm -f "$HOME_FOLDER/ContainerID"
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