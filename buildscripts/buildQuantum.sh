#!/bin/bash

set -e

cd $WORKSPACE/ux-aspects
source $PWD/buildscripts/functions.sh

theme=micro-focus
stylebookTargetFolder="$WORKSPACE/ux-aspects/stylebook-gh-pages-$theme"

echo WORKSPACE is $WORKSPACE
echo Build number is $BUILD_NUMBER
echo Theme is $theme
echo stylebookTargetFolder is $stylebookTargetFolder
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build image is $UX_ASPECTS_QUANTUM_BUILD_IMAGE_NAME:$UX_ASPECTS_QUANTUM_BUILD_IMAGE_TAG_LATEST
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Moving to repository
cd $WORKSPACE/ux-aspects; echo

# Create the latest ux-aspects-quantum-build image if it does not exist
docker_image_build "$WORKSPACE/ux-aspects/docker" "Dockerfile.quantum" \
    $UX_ASPECTS_QUANTUM_BUILD_IMAGE_NAME $UX_ASPECTS_QUANTUM_BUILD_IMAGE_TAG_LATEST; echo

# Build the Quantum projects
echo Run npm install in quantum-ux
docker_image_run "$WORKSPACE/ux-aspects/quantum" \
    $UX_ASPECTS_QUANTUM_BUILD_IMAGE_NAME $UX_ASPECTS_QUANTUM_BUILD_IMAGE_TAG_LATEST \
    "bash -c \"cd /workspace/quantum-ux && npm install\""; echo
echo Run npm install in quantum-ux-aspects
docker_image_run "$WORKSPACE/ux-aspects/quantum" \
    $UX_ASPECTS_QUANTUM_BUILD_IMAGE_NAME $UX_ASPECTS_QUANTUM_BUILD_IMAGE_TAG_LATEST \
    "bash -c \"cd /workspace/quantum-ux-aspects && rm -rf dist && npm install --unsafe-perm\""; echo
echo Run npm install in quantum-ux-aspects-stylebook
docker_image_run "$WORKSPACE/ux-aspects/quantum" \
    $UX_ASPECTS_QUANTUM_BUILD_IMAGE_NAME $UX_ASPECTS_QUANTUM_BUILD_IMAGE_TAG_LATEST \
    "bash -c \"cd /workspace/quantum-ux-aspects-stylebook && npm install\""; echo
echo Run npm run build in quantum-ux-aspects-stylebook
docker_image_run "$WORKSPACE/ux-aspects/quantum" \
    $UX_ASPECTS_QUANTUM_BUILD_IMAGE_NAME $UX_ASPECTS_QUANTUM_BUILD_IMAGE_TAG_LATEST \
    "bash -c \"cd /workspace/quantum-ux-aspects-stylebook && rm -rf dist && npm run build\""; echo

# Clean up previous build
rm -f $WORKSPACE/ux-aspects/stylebook-gh-pages-$theme.tar.gz
if [ -d "$stylebookTargetFolder" ]; then
    rm -rf $stylebookTargetFolder
fi

# Archive the stylebook files
echo
echo Archiving the stylebook files
mv $WORKSPACE/ux-aspects/quantum/quantum-ux-aspects-stylebook/dist $stylebookTargetFolder
cd $stylebookTargetFolder
tarStylebook=`tar -czvf ../stylebook-gh-pages-$theme.tar.gz *`
cd $WORKSPACE/ux-aspects
rm -rf $stylebookTargetFolder

exit 0;
