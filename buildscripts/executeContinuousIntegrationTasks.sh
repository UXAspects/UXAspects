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

echo === Checking files at start

bash ListFiles.sh
bash RemoveUntrackedFiles.sh
bash DiffChanges.sh

# Ensure files match those in origin/develop. First remove untracked files (except those in .gitignore)
echo git clean -f
git clean -f
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git clean failed, returned $exitCode"
    exit 1
fi
echo

# Then reset any changed, tracked files
echo git fetch --all
git fetch --all
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git fetch failed, returned $exitCode"
    exit 1
fi
echo

echo git reset --hard origin/develop
git reset --hard origin/develop
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git reset failed, returned $exitCode"
    exit 1
fi
echo

echo === Checking files before exit

bash ListFiles.sh
bash RemoveUntrackedFiles.sh
bash DiffChanges.sh

echo === Exiting
exit 0





# Run the unit tests
echo Executing unit tests
bash buildscripts/executeUnitTests.sh
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== executeUnitTests.sh failed returning $exitCode"
    # Handling of unit test failure to be addressed in a later JIRA
fi

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
curl -L -S -s https://github.houston.softwaregrp.net/caf/ux-aspects-hpe/archive/master.zip > HPETheme.zip
unzip -o HPETheme.zip
cp -p -r ux-aspects-hpe-master/fonts ../src
cp -p -r ux-aspects-hpe-master/img ../src
cp -p -r ux-aspects-hpe-master/styles ../src

# Build using the HPE theme
echo Build using the HPE theme
cd $WORKSPACE/ux-aspects
buildFailed="false"
bash buildscripts/buildTheme.sh "HPE"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo Building of HPE theme failed with error $exitCode
    buildFailed="true"
fi

# Remove the HPE theme files
echo
echo Deleting the HPE theme files
rm -rf $WORKSPACE/ux-aspects/src/fonts
rm -rf $WORKSPACE/ux-aspects/src/img
rm -rf $WORKSPACE/ux-aspects/src/styles

# Remove the HPE theme build artifacts
echo
echo === Deleting the HPE build artifacts
rm -rf $WORKSPACE/ux-aspects/HPEThemeFiles
rm -rf $WORKSPACE/ux-aspects/docs-gh-pages-HPE

# Copy back the Keppel theme files
echo
echo Restoring the Keppel theme files
cp -p -r $WORKSPACE/ux-aspects/KeppelThemeFiles/* $WORKSPACE/ux-aspects/src
rm -rf $WORKSPACE/ux-aspects/KeppelThemeFiles
if [ "$buildFailed" == "true" ]; then
    echo Exiting as HPE-themed build failed
    exit 1
fi

# Build using the Keppel theme
echo
echo Build using the Keppel theme
cd $WORKSPACE/ux-aspects
bash buildscripts/buildTheme.sh "Keppel"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo Building of Keppel theme failed with error $exitCode
    exit 1
fi

# Update the HPE theme respository
echo
echo Update the HPE theme respository
cd $WORKSPACE/ux-aspects
bash buildscripts/updateSEPGRepository.sh "HPE"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo Update of HPE-themed repository failed with error $exitCode
    exit 1
fi

# Update the Keppel theme respository
echo
echo Update the Keppel theme respository
cd $WORKSPACE/ux-aspects
bash buildscripts/updateSEPGRepository.sh "Keppel"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo Update of Keppel-themed repository failed with error $exitCode
    exit 1
fi

exit 0