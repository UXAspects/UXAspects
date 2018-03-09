#!/bin/bash

source $WORKSPACE/ux-aspects/buildscripts/functions.sh

echo
echo
echo Workspace is $WORKSPACE
echo UID is $UID
echo GROUPS is $GROUPS
echo GID is $GID
echo EUID is $EUID
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Displaying groups
groups
echo Displaying id
id

cd $WORKSPACE/ux-aspects

# Get the current version
version=`node ./scripts/version.js`
echo Version is $version

# Ensure files match those in origin/develop. First remove untracked files (except those in .gitignore)
echo git clean -f
git clean -f

# Then reset any changed, tracked files
echo git fetch --all
git fetch --all

echo git reset --hard origin/develop
git reset --hard origin/develop

# Create the latest elements-build image if it does not exist
docker_image_build "$WORKSPACE/ux-aspects/docker"

echo Bootstrapping the repository
docker_image_run "$WORKSPACE" "npm install && npm run bootstrap"

echo Running the unit tests
docker_image_run "$WORKSPACE/ux-aspects" "npm run test"

echo Running the CI build
docker_image_run "$WORKSPACE/ux-aspects" "npm run ci"

# Save the unit test report
mkdir -p $WORKSPACE/reports
cp -p $WORKSPACE/ux-aspects/target/library-ng1/reports/html/test-html-report.html $WORKSPACE/reports/index.html

# Update the HPE theme respository
echo
echo Update the HPE theme respository
cd $WORKSPACE/ux-aspects
bash buildscripts/updateSEPGRepository.sh "HPE" $version

# Update the Keppel theme respository
echo
echo Update the Keppel theme respository
cd $WORKSPACE/ux-aspects
bash buildscripts/updateSEPGRepository.sh "Keppel" $version

exit 0