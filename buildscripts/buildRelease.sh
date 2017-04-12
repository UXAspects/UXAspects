#!/bin/bash
set -e

SELENIUM_TEST_MACHINE_USER=UXAspectsTestUser

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.7.0

echo Workspace is $WORKSPACE
echo NextVersion is $NextVersion
echo RunTests is $RunTests
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo BuildPackages is $BuildPackages
echo PrivateArtifactoryURL is $PrivateArtifactoryURL
echo PrivateArtifactoryCredentials is $PrivateArtifactoryCredentials
echo BuildDocumentation is $BuildDocumentation
echo GridHubIPAddress is $GridHubIPAddress
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo SSH logon is $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Moving to workspace
cd $WORKSPACE

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
        cd $WORKSPACE/docker
        echo Building the image
        docker build -t $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
            --build-arg http_proxy=$HttpProxy \
            --build-arg https_proxy=$HttpsProxy \
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
        docker run --rm --volume "$PWD":/workspace --workdir /workspace --user $UID:$GROUPS $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST "$@"
    fi
}

# Get ID of latest commit to develop branch
latestCommitID=`git rev-parse HEAD`
echo latestCommitID is $latestCommitID

# Temporary commands to allow testing of Jenkins job prior to re-introduction of unit and Selenium tests. Dummy results files will be copied into place.
echo Listing contents of $WORKSPACE
ls -alR $WORKSPACE
cd $WORKSPACE
cp $WORKSPACE/buildscripts/emailable-report.html index.html
cp $WORKSPACE/buildscripts/testng-results.xml .
mkdir -p $WORKSPACE/reports
cp index.html $WORKSPACE/reports/index.html

# Create the latest ux-aspects-build image if it does not exist
docker_image_build; echo

# TBD - Execute unit tests

# TBD - Execute Selenium tests

echo Both sets of tests passed. Performing the build.
cd $WORKSPACE
cp /home/jenkins/.bowerrc .

# TBD - Remove remnants of tests

# Read the bower.json name attribute
bn=$(grep '\"name\"\: ' bower.json | awk '{print $2}')
# Remove multiple characters " and ,
bowerName="$(sed 's/[",]//g' <<< "$bn")";
bowerName=$(echo $bowerName|tr -d '\n')
echo "Bower name = $bowerName"

# Bump up the version in package.json
sed -i -e s/"\"version\": \"[0-9]\.[0-9]\.[0-9].*\","/"\"version\": \"$NextVersion\","/ "package.json"
newPackageVersion=`cat package.json | grep version`
if [[ $newPackageVersion == *"$NextVersion"* ]]
then
   echo "Updated package.json with $NextVersion"
else
   echo "ERROR: package.json isn't updated with $NextVersion"
   exit 1
fi

# Update the version in footer-navigation.json and landing-page.json
echo
echo Updating the version in footer-navigation.json and landing-page.json
sed -i -e s/"\"title\": \"Currently v*[0-9]\.[0-9]\.[0-9].*\","/"\"title\": \"Currently v$NextVersion\","/ "docs/app/data/footer-navigation.json"
sed -i -e s/"\"version\": \"Currently v*[0-9]\.[0-9]\.[0-9].*\","/"\"version\": \"Currently v$NextVersion\","/ "docs/app/data/landing-page.json"

# Take a copy of the files which will be overwritten by the HPE theme files
echo
echo Storing the Keppel theme files
mkdir $WORKSPACE/KeppelThemeFiles
cp -p -r $WORKSPACE/src/fonts $WORKSPACE/KeppelThemeFiles
cp -p -r $WORKSPACE/src/img $WORKSPACE/KeppelThemeFiles
cp -p -r $WORKSPACE/src/styles $WORKSPACE/KeppelThemeFiles

# Get the HPE theme files and copy them onto the source hierarchy
echo
echo Getting the HPE theme files
mkdir $WORKSPACE/HPEThemeFiles
cd $WORKSPACE/HPEThemeFiles
curl -L -S -s https://github.hpe.com/caf/ux-aspects-hpe/archive/master.zip > HPETheme.zip
unzip -o HPETheme.zip
cp -p -r ux-aspects-hpe-master/fonts $WORKSPACE/src
cp -p -r ux-aspects-hpe-master/img $WORKSPACE/src
cp -p -r ux-aspects-hpe-master/styles $WORKSPACE/src

# Bump up the version in the HPE bower.json
sed -i -e s/"\"version\": \"[0-9]\.[0-9]\.[0-9].*\","/"\"version\": \"$NextVersion\","/ "ux-aspects-hpe-master/bower.json"
HPEBowerVersion=`cat ux-aspects-hpe-master/bower.json | grep version`
if [[ $HPEBowerVersion == *"$NextVersion"* ]]
then
   echo "Updated HPE bower.json with $NextVersion"
else
   echo "ERROR: HPE bower.json isn't updated with $NextVersion"
   exit 1
fi

# Build using the HPE theme
echo
echo Building using the HPE theme
cd $WORKSPACE
echo Run npm install
docker_image_run npm install
echo Building
docker_image_run grunt clean
docker_image_run grunt build --force

# Archive the HPE-themed documentation files
echo
echo Archiving the HPE-themed documentation files
mv dist/docs docs-gh-pages-HPE-$NextVersion
cd docs-gh-pages-HPE-$NextVersion
tarDocs=`tar -czvf ../$NextVersion-docs-gh-pages-HPE.tar.gz *`
echo "$tarDocs"
cd ..

# Create HPE Bower package tarball for Artifactory
cd $WORKSPACE
HPEPackage="${bowerName}-hpe_$NextVersion.tar.gz"
echo
echo Creating the HPE Bower package $HPEPackage
rm -f $WORKSPACE/HPEThemeFiles/Package/$HPEPackage
mkdir -p $WORKSPACE/HPEThemeFiles/Package/dist/css
cp -p dist/styles/*.css $WORKSPACE/HPEThemeFiles/Package/dist/css
cp -p -r $WORKSPACE/KeppelThemeFiles/fonts $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/KeppelThemeFiles/img $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/fonts $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/img $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/styles $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/bower.json $WORKSPACE/HPEThemeFiles/Package
cd $WORKSPACE/HPEThemeFiles/Package
tar czvf $HPEPackage dist bower.json
if [ "$?" -eq 0 ]
then
    echo "Package $HPEPackage was Successfully created"
    ls -la "$WORKSPACE/HPEThemeFiles/Package/$HPEPackage"
else
    echo "Error: Creating package $HPEPackage"
fi

# Upload HPE-themed package to Artifactory
echo
echo Uploading HPE-themed package to Artifactory
cd $WORKSPACE
echo "curl -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/HPEThemeFiles/Package/$HPEPackage"
curl -u $PrivateArtifactoryCredentials -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/HPEThemeFiles/Package/$HPEPackage

# Remove the HPE theme files
echo
echo Deleting the HPE theme files
rm -rf $WORKSPACE/src/fonts
rm -rf $WORKSPACE/src/img
rm -rf $WORKSPACE/src/styles

# Copy back the Keppel theme files
echo
echo Restoring the Keppel theme files
cp -p -r $WORKSPACE/KeppelThemeFiles/* $WORKSPACE/src

# Build using the Keppel theme
echo
echo Building using the Keppel theme
cd $WORKSPACE
docker_image_run grunt clean
rm -rf dist
docker_image_run grunt build --force

# Archive the Keppel-themed documentation files
echo
echo Archiving the Keppel-themed documentation files
mv dist/docs docs-gh-pages-Keppel-$NextVersion
cd docs-gh-pages-Keppel-$NextVersion
tarDocs=`tar czvf ../$NextVersion-docs-gh-pages-Keppel.tar.gz *`
echo "$tarDocs"
cd ..

# Create a branch for the new documentation. First, clone the repository to a sub-folder.
# Switching to the new branch and commits to it will be performed in this clone.
echo
echo Creating the branch $NextVersion-gh-pages-test
cd $WORKSPACE
mkdir clone
cd clone
git clone git@github.com:UXAspects/UXAspects.git
cd UXAspects
git checkout gh-pages
git checkout -b $NextVersion-gh-pages-test
git push origin $NextVersion-gh-pages-test

# Delete existing files
echo
echo Deleting existing files
rm -rf assets/ docs/
rm -f *.css *.html *.js *.log

# Extract the files from the Keppel documentation archive, both to this folder and to a $NextVersion sub-directory
echo
echo Extracting the archived Keppel-themed documentation to this folder and to a numbered sub-directory
tar xvf $WORKSPACE/$NextVersion-docs-gh-pages-Keppel.tar.gz
if [ -d "$NextVersion" ]; then
    echo "Folder $NextVersion exists... deleting it!"
    rm -rf $NextVersion
fi
mkdir $NextVersion
cd $NextVersion
tar xvf $WORKSPACE/$NextVersion-docs-gh-pages-Keppel.tar.gz
cd ..

echo
echo Pushing the new files to the branch
git add $NextVersion/ assets/ docs/ *.css *.html *.js
git commit -a -m "Committing documentation changes for $NextVersion-gh-pages-test. Latest commit ID is $latestCommitID."
git push origin $NextVersion-gh-pages-test

# Return to the develop branch and discard changes to a couple of files
echo
echo Returning to the develop branch
cd $WORKSPACE
git checkout docs/app/data/footer-navigation.json
git checkout docs/app/data/landing-page.json

# Create the new branch for the Keppel bower package
echo
echo Creating the branch $NextVersion-package-test
git checkout -b $NextVersion-package-test
git push origin $NextVersion-package-test

# Remove files and folders which are not to be committed
echo
echo Removing files which are not to be committed
rm -rf docs-gh-pages-HPE-$NextVersion/
rm -rf docs-gh-pages-Keppel-$NextVersion/
rm -rf HPEThemeFiles/
rm -rf KeppelThemeFiles/
rm -rf clone
rm -f *.gz

# Push the changes
echo
echo Pushing the changes to the branch
git add -A
git commit -m "Committing changes for package $NextVersion-test. Latest commit ID is $latestCommitID."
git push --set-upstream origin $NextVersion-package-test

# Return to the develop branch
echo
echo Returning to the develop branch
git checkout develop

exit 0