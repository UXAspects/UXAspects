#!/bin/bash

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

# Ensure files match those in origin/develop. First remove untracked files (except those in .gitignore)
git clean -f
# Then reset any changed, tracked files
git fetch --all
git reset --hard origin/develop

# Run the unit tests
bash buildscripts/executeUnitTests.sh

# Clear up previous builds
rm -rf $WORKSPACE/ux-aspects/KeppelThemeFiles
rm -rf $WORKSPACE/ux-aspects/HPEThemeFiles
rm -rf $WORKSPACE/ux-aspects/docs-gh-pages-HPE
rm -rf $WORKSPACE/ux-aspects/docs-gh-pages-Keppel
rm -f $WORKSPACE/ux-aspects/docs-gh-pages-HPE.tar.gz
rm -f $WORKSPACE/ux-aspects/docs-gh-pages-Keppel.tar.gz

# Take a copy of the files which will be overwritten by the HPE theme files
echo
echo Storing the Keppel theme files
mkdir $WORKSPACE/ux-aspects/KeppelThemeFiles
cp -p -r $WORKSPACE/ux-aspects/src/fonts $WORKSPACE/ux-aspects/KeppelThemeFiles
cp -p -r $WORKSPACE/ux-aspects/src/img $WORKSPACE/ux-aspects/KeppelThemeFiles
cp -p -r $WORKSPACE/ux-aspects/src/styles $WORKSPACE/ux-aspects/KeppelThemeFiles

# Get the HPE theme files and copy them onto the source hierarchy
echo
echo Getting the HPE theme files
mkdir $WORKSPACE/ux-aspects/HPEThemeFiles
cd $WORKSPACE/ux-aspects/HPEThemeFiles
curl -L -S -s https://github.hpe.com/caf/ux-aspects-hpe/archive/master.zip > HPETheme.zip
unzip -o HPETheme.zip
cp -p -r ux-aspects-hpe-master/fonts ../src
cp -p -r ux-aspects-hpe-master/img ../src
cp -p -r ux-aspects-hpe-master/styles ../src

# Build using the HPE theme
echo Build using the HPE theme
cd $WORKSPACE/ux-aspects
buildFailed="false"
bash buildscripts/buildTheme.sh "HPE"
if [ $? -ne 0 ]; then
    echo Building of HPE theme failed with error $?
    buildFailed="true"
fi

# Remove the HPE theme files
echo
echo Deleting the HPE theme files
rm -rf $WORKSPACE/ux-aspects/src/fonts
rm -rf $WORKSPACE/ux-aspects/src/img
rm -rf $WORKSPACE/ux-aspects/src/styles

# Copy back the Keppel theme files
echo
echo Restoring the Keppel theme files
cp -p -r $WORKSPACE/ux-aspects/KeppelThemeFiles/* $WORKSPACE/ux-aspects/src
if [ "$buildFailed" == "true" ]; then
    echo HPE-themed build failed
    exit 1;
fi

# Build using the Keppel theme
echo
echo Build using the Keppel theme
cd $WORKSPACE/ux-aspects
bash buildscripts/buildTheme.sh "Keppel"
if [ $? -ne 0 ]; then
    echo Keppel-themed build failed
    exit 1;
fi

# Update the HPE theme respository
echo
echo Update the HPE theme respository
cd $WORKSPACE/ux-aspects
bash buildscripts/updateSEPGRepository.sh "HPE"
if [ $? -ne 0 ]; then
    echo Update of HPE-themed repository failed
    exit 1;
fi

# Update the Keppel theme respository
echo
echo Update the Keppel theme respository
cd $WORKSPACE/ux-aspects
bash buildscripts/updateSEPGRepository.sh "Keppel"
if [ $? -ne 0 ]; then
    echo Update of Keppel-themed repository failed
    exit 1;
fi

exit 0
