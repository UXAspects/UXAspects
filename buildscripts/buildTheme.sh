#!/bin/bash

cd $WORKSPACE/ux-aspects
source $PWD/buildscripts/functions.sh

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

echo

# Create the latest ux-aspects-build image if it does not exist
docker_image_build "$WORKSPACE/ux-aspects/docker"; echo
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== docker_image_build failed, returned $exitCode"
    exit 1
fi
echo

# Update assetsUrl in config.json
echo Updating assetsUrl in config.json
docker_image_run "$WORKSPACE/ux-aspects" "bash buildscripts/updateConfigJSON.sh $theme"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== updateConfigJSON.sh failed, returned $exitCode"
    exit 1
fi
echo

# Build the documentation
cd $WORKSPACE/ux-aspects
echo Run npm install
docker_image_run "$WORKSPACE/ux-aspects" "npm install"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== npm install failed, returned $exitCode"
    exit 1
fi
echo

echo Building the documentation
docker_image_run "$WORKSPACE/ux-aspects" "grunt cleanup"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== grunt cleanup failed, returned $exitCode"
    exit 1
fi
rm -rf dist
echo

docker_image_run "$WORKSPACE/ux-aspects" "grunt build"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== grunt build failed, returned $exitCode"
    exit 1
fi
echo

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
cd $WORKSPACE/ux-aspects
rm -rf $docsTargetFolder

exit 0
