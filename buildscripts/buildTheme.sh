#!/bin/bash

set -e

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.10.0

theme=$1
docsTargetFolder="$WORKSPACE/ux-aspects/docs-gh-pages-$theme"

echo WORKSPACE is $WORKSPACE
echo Build number is $BUILD_NUMBER
echo Theme is $theme
echo docsTargetFolder is $docsTargetFolder
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Moving to repository
cd $WORKSPACE/ux-aspects

# Define a function to build a specified Docker image.
docker_image_build()
{
    DOCKER_IMAGE_ID=`docker images | grep $UX_ASPECTS_BUILD_IMAGE_NAME | grep $UX_ASPECTS_BUILD_IMAGE_TAG_LATEST | awk '{print $3}'`
    echo ID for $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST image is $DOCKER_IMAGE_ID
    if [ -z "$DOCKER_IMAGE_ID" ] ; then
        # Create the docker image
        cd $WORKSPACE/ux-aspects/docker
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
        docker run --rm --volume "$PWD":/workspace --workdir /workspace --user \
		    $UID:$GROUPS $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST "$@"
    fi
}

echo

# Create the latest ux-aspects-build image if it does not exist
docker_image_build; echo

# Update assetsUrl in config.json
echo Updating assetsUrl in config.json
cd $WORKSPACE/ux-aspects
docker run --rm --volume "$PWD":/workspace --workdir /workspace --user $UID:$GROUPS \
    $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
    bash buildscripts/updateConfigJSON.sh $theme

# Build the documentation
cd $WORKSPACE/ux-aspects
echo Run npm install
docker_image_run npm install
echo Building the documentation
docker_image_run grunt clean
rm -rf dist
docker_image_run grunt build --force

# Clean up previous build
rm -f $WORKSPACE/ux-aspects/docs-gh-pages-$theme.tar.gz
if [ -d "$docsTargetFolder" ]; then
    rm -rf $docsTargetFolder
fi

# Archive the documentation files
echo
echo Archiving the documentation files
mv $WORKSPACE/ux-aspects/dist/docs $docsTargetFolder
cd $docsTargetFolder
tarDocs=`tar -czvf ../docs-gh-pages-$theme.tar.gz *`

exit 0;
