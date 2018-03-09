#!/bin/bash

echo === Moving to workspace
cd $WORKSPACE

source $PWD/buildscripts/functions.sh

# Get the current version
version=`node ./scripts/version.js`
echo Version is $version

HPEPackage=ux-aspects-hpe_$version.tar.gz

echo === Workspace is $WORKSPACE
echo RunTests is $RunTests
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo http_proxy is $http_proxy
echo https_proxy is $https_proxy
echo BuildPackages is $BuildPackages
echo PrivateArtifactoryURL is $PrivateArtifactoryURL
echo HPEPackage is $HPEPackage
echo BuildDocumentation is $BuildDocumentation
echo GridHubIPAddress is $GridHubIPAddress
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo SSH logon is $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress
echo REMOTE_FOLDER is $REMOTE_FOLDER
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

# Get ID of latest commit to develop branch
latestDevelopCommitID=`git rev-parse HEAD`
echo === latestDevelopCommitID is $latestDevelopCommitID


# Create the latest ux-aspects-build image if it does not exist
docker_image_build "$WORKSPACE/docker"; echo

echo Bootstrapping the repository
docker_image_run "$WORKSPACE" "npm install && npm run bootstrap:all"

echo Running the unit tests
docker_image_run "$WORKSPACE" "npm run test"

echo Running the RC build
docker_image_run "$WORKSPACE" "npm run rc"

# TODO email test results

echo
echo === Uploading HPE-themed package to Artifactory - $PrivateArtifactoryURL
curl -u $PrivateArtifactoryCredentials -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/target/theme-hpe/bower/ux-aspects-$version.tgz

echo
echo === Creating the branch $NextVersion-gh-pages-test
rm -rf gh-pages-clone
mkdir gh-pages-clone
pushd gh-pages-clone
git clone -b gh-pages --single-branch git@github.com:UXAspects/UXAspects.git
pushd UXAspects

git checkout -b $version-gh-pages-test

git push origin $version-gh-pages-test

# Delete existing files - clean directory for publish
echo
echo === Deleting existing files
rm -rf assets/ docs/ modules/ showcase/
rm -f *.css *.html *.js *.ico *.log

# Extract the files from the Keppel documentation archive, both to this folder and to a $version sub-directory
echo
echo === Extracting the archived Keppel-themed documentation to this folder and to a numbered sub-directory
tar xvf $WORKSPACE/target/documentation/gh-pages/ux-aspects-docs-KEPPEL-$version.tgz
if [ -d "$version" ]; then
    echo "=== Folder $version exists... deleting it!"
    rm -rf $version
fi
mkdir $version
pushd $version
tar xvf $WORKSPACE/target/documentation/gh-pages/ux-aspects-docs-KEPPEL-$version.tgz
popd

# Push the new files to the branch
echo
echo === Pushing the new files to the branch
git add $version/ assets/ docs/ modules/ showcase/ *.css *.html *.ico *.js

git commit -a -m "Committing documentation changes for $version-gh-pages-test. Latest develop commit ID is $latestDevelopCommitID."

git push origin $version-gh-pages-test

popd; popd
rm -rf $WORKSPACE/gh-pages-clone


echo
echo === Creating the branch $version-package-test
rm -rf package-clone
mkdir package-clone
pushd package-clone
git clone -b bower --single-branch git@github.com:UXAspects/UXAspects.git
pushd UXAspects

git checkout -b $version-package-test

git push origin $version-package-test

# Remove existing files and copy the newly-built package files from the workspace. Only the 'dist'
# folder and bower.json are needed.
rm -rf *
cp -p -r $WORKSPACE/packages/library/dist/* .
cp -p $WORKSPACE/packages/library/bower.json .

# Push the new files to the branch
echo
echo === Pushing the new files to the branch
git add *

git commit -a -m "Committing changes for package $version-package-test. Latest develop commit ID is $latestDevelopCommitID."

git push --set-upstream origin $version-package-test

popd; popd
rm -rf $WORKSPACE/package-clone


# Create a branch for the new NPM package. First, clone the repository to a sub-folder.
# Switching to the new branch and commiting to it will be performed in this clone.
echo
echo === Creating the branch $NextVersion-NPM-package-test
mkdir NPM-package-clone
pushd NPM-package-clone
git clone -b NPM --single-branch git@github.com:UXAspects/UXAspects.git
pushd UXAspects

git checkout -b $NextVersion-NPM-package-test

git push origin $NextVersion-NPM-package-test

# Remove existing files and copy the newly-built package.
echo
echo === Copying the package files
rm -rf *
cp $WORKSPACE/target/library/npm/ux-aspects-ux-aspects-$version.tgz .

# Push the new files to the branch
echo
echo === Pushing the new files to the branch
git add *

git commit -a -m "Committing changes for package $NextVersion-NPM-package-test. Latest develop commit ID is $latestDevelopCommitID."

git push --set-upstream origin $NextVersion-NPM-package-test

popd; popd
rm -rf $WORKSPACE/NPM-package-clone


# Create a branch for the new NPM documentation package. First, clone the repository to a sub-folder.
# Switching to the new branch and commiting to it will be performed in this clone.
echo
echo === Creating the branch $NextVersion-NPM-docs-package-test
rm -rf NPM-docs-package-clone
mkdir NPM-docs-package-clone
pushd NPM-docs-package-clone
git clone -b NPM --single-branch git@github.com:UXAspects/UXAspects.git
pushd UXAspects

git checkout -b $NextVersion-NPM-docs-package-test

git push origin $NextVersion-NPM-docs-package-test

# Remove existing files and copy the newly-built documentation package.
echo
echo === Copying the documentation package files
rm -rf *
cp $WORKSPACE/target/documentation/npm/ux-aspects-ux-aspects-docs-$version.tgz .

# Push the new files to the branch
echo
echo === Pushing the new files to the branch
git add *

git commit -a -m "Committing changes for package $NextVersion-NPM-docs-package-test. Latest develop commit ID is $latestDevelopCommitID."

git push --set-upstream origin $NextVersion-NPM-docs-package-test

popd; popd
rm -rf $WORKSPACE/NPM-docs-package-clone

exit 0