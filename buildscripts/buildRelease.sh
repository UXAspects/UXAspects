#!/bin/bash
set -e

SELENIUM_TEST_MACHINE_USER=UXAspectsTestUser
REMOTE_FOLDER=/home/$SELENIUM_TEST_MACHINE_USER/UXAspectsTestsReleaseBuild
REMOTE_NPM_PACKAGE_FOLDER=/home/$SELENIUM_TEST_MACHINE_USER/npm

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.10.0

echo Workspace is $WORKSPACE
echo NextVersion is $NextVersion
echo RunTests is $RunTests
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo http_proxy is $http_proxy
echo https_proxy is $https_proxy
echo BuildPackages is $BuildPackages
echo PrivateArtifactoryURL is $PrivateArtifactoryURL
echo BuildDocumentation is $BuildDocumentation
echo GridHubIPAddress is $GridHubIPAddress
echo NPMUserName is $NPMUserName
echo NPMUserEmailAddress is $NPMUserEmailAddress
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo SSH logon is $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress
echo REMOTE_FOLDER is $REMOTE_FOLDER
echo REMOTE_NPM_PACKAGE_FOLDER is $REMOTE_NPM_PACKAGE_FOLDER
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Moving to workspace
cd $WORKSPACE

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

# Get ID of latest commit to develop branch
latestCommitID=`git rev-parse HEAD`
echo latestCommitID is $latestCommitID

# Start creation of the test results file. The file will contain some styling settings needed for display of the results of the
# unit tests and, if the unit tests passed, the Selenium tests' results.
echo Starting creation of the results file
cd $WORKSPACE
# Delete any existing file
rm -f UXAspectsTestsResults.html
# Split the stored copy of a Selenium tests results file at the <body> tag. Everything before that point will be stying information
# and will be placed at the start of our results file to ensure that the Selenium section of the results will be formatted
# correctly.
csplit buildscripts/emailable-report.html '/\<body\>/'
# Some additional adjustments to header charset and CSS settings are also needed to allow display of special characters (tick
# and cross) in the unit test results. Update the first chunk, xx00, created when the file was split.
sed -i.bak 's/<head>/<head><meta http-equiv=\"Content-Style-Type\" content=\"text\/css\"; charset=\"utf-8\">/' xx00
sed -i.bak 's/<style type=\"text\/css\">/<style type=\"text\/css\">p,ul,ol{text-align: left; text-indent: 0px; padding: \
0px 0px 0px 0px; margin: 0px 0px 0px 0px;}/' xx00
# Remove the <body> tag from the start of the second chunk, xx01.
sed -i 's/<body>//g' xx01
# Copy the lines in the first chunk to our results file
cp xx00 UXAspectsTestsResults.html
echo "<body>" >> UXAspectsTestsResults.html

# Record information about the build in the results file
echo "<h2>Build number: " >> UXAspectsTestsResults.html
echo "$BUILD_NUMBER" >> UXAspectsTestsResults.html
echo "</h2>" >> UXAspectsTestsResults.html

echo "<h2>Build version: " >> UXAspectsTestsResults.html
echo "$NextVersion" >> UXAspectsTestsResults.html
echo "</h2>" >> UXAspectsTestsResults.html

echo "<h2>" >> UXAspectsTestsResults.html
date -u >> UXAspectsTestsResults.html
echo "</h2></br>" >> UXAspectsTestsResults.html

if [ "$RunTests" == "true" ]; then
    # The repository will have been synced to the build slave. Copy it to the UXAspectsTestsReleaseBuild
    # folder on the Selenium Grid Hub machine.
    echo Deleting old copy of repository on Selenium Grid Hub machine
    ssh $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress rm -rf $REMOTE_FOLDER

    echo Copying repository to the Selenium Grid Hub machine
    ssh $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress mkdir -p $REMOTE_FOLDER/ux-aspects
    scp -r . $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress:$REMOTE_FOLDER/ux-aspects
fi

# Create the latest ux-aspects-build image if it does not exist
docker_image_build; echo

if [ "$RunTests" == "true" ]; then
    echo Executing the unit tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container
    chmod a+rw .
    docker_image_run bash buildscripts/executeUnitTestsDocker.sh

    # The unit tests results file, UnitTestResults.txt, should have been created in this folder. Copy it to our results file and
    # ignore unwanted strings.
    echo Adding unit test results to the results file
    startOutput=false
    echo "<h2>Unit Tests</h2>" >> UXAspectsTestsResults.html
    while read line ; do
        # Ignore all lines before Testing Jasmine specs via PhantomJS
        if [[ $line == *"Testing Jasmine specs via PhantomJS"* ]] ; then
            echo "Found first line to output"
            startOutput=true
        fi
        
        if [ "$startOutput" = true ] ; then
            echo "<p><span class=rvts6>$line</span></p>" >> UXAspectsTestsResults.html
        fi
    done < UnitTestResults.txt

    # Test for success i.e. zero failures. If there were failures, complete the results file and exit with status 1.
    if grep -q  ">> 0 failures" UnitTestResults.txt;
    then
        echo Unit tests passed
    else
        echo "Unit test(s) failed"
        echo "</body></html>" >> UXAspectsTestsResults.html
        cp UXAspectsTestsResults.html $WORKSPACE/index-${BUILD_NUMBER}.html
        cp UXAspectsTestsResults.html $WORKSPACE/index.html
        mkdir -p $WORKSPACE/reports
        cp index.html $WORKSPACE/reports/index.html
        exit 1
    fi

    # Execute the Selenium tests on the remote machine
    echo
    echo Executing the Selenium tests
    rm -f emailable-report.html testng-results.xml index.html
    
    ssh $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress bash $REMOTE_FOLDER/ux-aspects/buildscripts/executeSeleniumTestsReleaseBuild.sh
    # Copy two results files, one HTML and one XML, created on the remote machine
    scp $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress:$REMOTE_FOLDER/ux-aspects/target/surefire-reports/emailable-report.html .
    scp $SELENIUM_TEST_MACHINE_USER@$GridHubIPAddress:$REMOTE_FOLDER/ux-aspects/target/surefire-reports/testng-results.xml .

    # Split the new Selenium tests results file at the <body> tag. Copy everything after that point to our results file.
    echo Adding Selenium test results to the results file
    csplit emailable-report.html '/\<body\>/'
    sed -i 's/<body>//g' xx01
    echo "</br><h2>Selenium-based Tests</h2></br>" >> UXAspectsTestsResults.html
    while read line ; do
        echo "$line" >> UXAspectsTestsResults.html
    done < xx01
    cp UXAspectsTestsResults.html $WORKSPACE/index-${BUILD_NUMBER}.html
    cp UXAspectsTestsResults.html $WORKSPACE/index.html
    mkdir -p $WORKSPACE/reports
    cp index.html $WORKSPACE/reports/index.html

    # Test whether there were any skipped or failed tests. If there were, return status 1.
    numberOfSkipped=$(echo 'cat //testng-results/@skipped' | xmllint --shell \
    $WORKSPACE/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')
    numberOfFailures=$(echo 'cat //testng-results/@failed' | xmllint --shell \
    $WORKSPACE/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')
    totalNumber=$(echo 'cat //testng-results/@total' | xmllint --shell \
    $WORKSPACE/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')
    numberOfPassed=$(echo 'cat //testng-results/@passed' | xmllint --shell \
    $WORKSPACE/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')

    echo numberOfSkipped = $numberOfSkipped
    echo numberOfFailures = $numberOfFailures
    echo totalNumber = $totalNumber
    echo numberOfPassed = $numberOfPassed

    if [ "$numberOfSkipped" -eq 0 ] && [ "$numberOfFailures" -eq 0 ]
    then
        echo Selenium tests passed
    else
        echo "Selenium test(s) failed"
        exit 1
    fi
fi

# Create an empty results file if tests were not run
if [ "$RunTests" != "true" ]; then
    echo "No tests performed"    
    echo "<h2>No tests performed</h2>" >> UXAspectsTestsResults.html
    echo "</body></html>" >> UXAspectsTestsResults.html
    cp UXAspectsTestsResults.html $WORKSPACE/index-${BUILD_NUMBER}.html
    cp UXAspectsTestsResults.html $WORKSPACE/index.html
    mkdir -p $WORKSPACE/reports
    cp index.html $WORKSPACE/reports/index.html
fi

# Exit if there is nothing to be built
if [ "$BuildPackages" != "true" ] && [ "$BuildDocumentation" != "true" ]; then
    echo "Nothing to build - exiting"
    exit 0;
fi

# Perform the build
echo Both sets of tests passed. Performing the build.
cp /home/jenkins/.bowerrc .

# Remove remnants of tests
rm -rf emailable-report.html
rm -rf ExecutingUnitTests
rm -rf UXAspectsTestsResults.html
rm -rf testng-results.xml
rm -rf UnitTestResults.txt
rm -rf xx00
rm -rf xx00.bak
rm -rf xx01

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
pushd $WORKSPACE/HPEThemeFiles
curl -L -S -s https://github.hpe.com/caf/ux-aspects-hpe/archive/master.zip > HPETheme.zip
unzip -o HPETheme.zip
cp -p -r ux-aspects-hpe-master/fonts $WORKSPACE/src
cp -p -r ux-aspects-hpe-master/img $WORKSPACE/src
cp -p -r ux-aspects-hpe-master/styles $WORKSPACE/src
popd

# Update JSON files with the new version number
docker_image_run bash buildscripts/updateVersionNumbers.sh $NextVersion

# Recoed the product name read from bower.json
bowerName=$(<"$PWD/bowerName.txt")
echo "Bower name = $bowerName"
rm -f bowerName.txt

# Build using the HPE theme
echo
echo Building using the HPE theme
echo Run npm install
docker_image_run npm install
echo Building
docker_image_run grunt clean
docker_image_run grunt build --force

# Archive the HPE-themed documentation files
echo
echo Archiving the HPE-themed documentation files
mv dist/docs docs-gh-pages-HPE-$NextVersion
pushd docs-gh-pages-HPE-$NextVersion
tarDocs=`tar -czvf ../$NextVersion-docs-gh-pages-HPE.tar.gz *`
echo "$tarDocs"
popd

# Create HPE Bower package tarball for Artifactory
HPEPackage="${bowerName}-hpe_$NextVersion.tar.gz"
echo
echo Creating the HPE Bower package $HPEPackage
rm -f $WORKSPACE/HPEThemeFiles/Package/$HPEPackage
mkdir -p $WORKSPACE/HPEThemeFiles/Package/dist/css
cp -p dist/styles/*.css $WORKSPACE/HPEThemeFiles/Package/dist/css
cp -p -r $WORKSPACE/dist/fonts $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/dist/img $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/fonts $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/img $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/styles $WORKSPACE/HPEThemeFiles/Package/dist
cp -p -r $WORKSPACE/HPEThemeFiles/ux-aspects-hpe-master/bower.json $WORKSPACE/HPEThemeFiles/Package
pushd $WORKSPACE/HPEThemeFiles/Package
tar czvf $HPEPackage dist bower.json
if [ "$?" -eq 0 ]
then
    echo "Package $HPEPackage was Successfully created"
    ls -la "$WORKSPACE/HPEThemeFiles/Package/$HPEPackage"
else
    echo "Error: Creating package $HPEPackage"
fi
popd

# Upload HPE-themed package to Artifactory
if [ "$BuildPackages" == "true" ]; then
    echo
    echo Uploading HPE-themed package to Artifactory
    echo "curl -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/HPEThemeFiles/Package/$HPEPackage"
    curl -u $PrivateArtifactoryCredentials -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/HPEThemeFiles/Package/$HPEPackage
fi

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
docker_image_run grunt clean
rm -rf dist
docker_image_run grunt build --force

# Archive the Keppel-themed documentation files
echo
echo Archiving the Keppel-themed documentation files
mv dist/docs docs-gh-pages-Keppel-$NextVersion
pushd docs-gh-pages-Keppel-$NextVersion
tarDocs=`tar czvf ../$NextVersion-docs-gh-pages-Keppel.tar.gz *`
echo "$tarDocs"
popd

if [ "$BuildDocumentation" == "true" ]; then
    # Create a branch for the new documentation. First, clone the repository to a sub-folder.
    # Switching to the new branch and commiting to it will be performed in this clone.
    echo
    echo Creating the branch $NextVersion-gh-pages-test
    mkdir gh-pages-clone
    pushd gh-pages-clone
    git clone -b gh-pages --single-branch git@github.com:UXAspects/UXAspects.git
    pushd UXAspects
    git checkout -b $NextVersion-gh-pages-test
    git push origin $NextVersion-gh-pages-test

    # Delete existing files
    echo
    echo Deleting existing files
    rm -rf assets/ docs/ modules/ showcase/
    rm -f *.css *.html *.js *.ico *.log

    # Extract the files from the Keppel documentation archive, both to this folder and to a $NextVersion sub-directory
    echo
    echo Extracting the archived Keppel-themed documentation to this folder and to a numbered sub-directory
    tar xvf $WORKSPACE/$NextVersion-docs-gh-pages-Keppel.tar.gz
    if [ -d "$NextVersion" ]; then
        echo "Folder $NextVersion exists... deleting it!"
        rm -rf $NextVersion
    fi
    mkdir $NextVersion
    pushd $NextVersion
    tar xvf $WORKSPACE/$NextVersion-docs-gh-pages-Keppel.tar.gz
    popd; popd; popd

    # Push the new files to the branch
    echo
    echo Pushing the new files to the branch
    git add $NextVersion/ assets/ docs/ modules/ showcase/ *.css *.html *.ico *.js
    git commit -a -m "Committing documentation changes for $NextVersion-gh-pages-test. Latest commit ID is $latestCommitID."
    git push origin $NextVersion-gh-pages-test
fi

if [ "$BuildPackages" == "true" ]; then
    # Create a branch for the new Keppel Bower package. First, clone the repository to a sub-folder.
    # Switching to the new branch and commiting to it will be performed in this clone.
    echo
    echo Creating the branch $NextVersion-package-test
    mkdir package-clone
    pushd package-clone
    git clone -b bower --single-branch git@github.com:UXAspects/UXAspects.git
    pushd UXAspects
    git checkout -b $NextVersion-package-test
    git push origin $NextVersion-package-test

    # Remove existing files and copy the newly-built package files from the workspace. Only the 'dist'
    # folder and bower.json are needed.
    rm -rf *
    cp -p -r $WORKSPACE/dist .
    cp -p $WORKSPACE/bower.json .

    # Push the new files to the branch
    echo
    echo Pushing the new files to the branch
    git add dist/ bower.json
    git commit -m "Committing changes for package $NextVersion-test. Latest commit ID is $latestCommitID."
    git push --set-upstream origin $NextVersion-package-test
    popd; popd
fi

# Return to the develop branch and discard changes to a couple of files
echo
echo Returning to the develop branch
git checkout docs/app/data/footer-navigation.json
git checkout docs/app/data/landing-page.json

if [ "$BuildPackages" == "true" ]; then
    # Loop while waiting for the $NextVersion-package-test branch to be merged into the Bower
    # branch or deleted. Merging signals that the release is verified and so the NPM package may
    # be created and published.
    branchCheckDelay=30    
    while :
    do
        branchExists=`git ls-remote --heads https://github.com/UXAspects/UXAspects.git $NextVersion-package-test | wc -l`
        if [ $branchExists == 0 ] ; then
            git fetch
            latestBowerCommitID=`git rev-parse origin/bower`
            echo latestBowerCommitID is $latestBowerCommitID
            latestBowerCommitMessage=`git log --format=%s%b -n 1 $latestBowerCommitID`
            echo latestBowerCommitMessage is $latestBowerCommitMessage
            branchMerged=`echo "$latestBowerCommitMessage" | grep "$NextVersion-package-test" | wc -l`
            # If this contains $NextVersion-package-test, the branch was merged
            if [ $branchMerged == 1 ] ; then
                # Create the NPM package, including a valid authentication token
                echo Branch $NextVersion-package-test has been merged into the Bower branch. Create the NPM package.
                echo
                echo Creating the NPM package
                if [ -d "$WORKSPACE/npm" ]; then
                    echo "Folder $WORKSPACE/npm exists... deleting it!"
                    rm -rf $WORKSPACE/npm
                fi
                mkdir -p $WORKSPACE/npm
                pushd $WORKSPACE/npm
                cp -p -r $WORKSPACE/src/package.json .
                cp -p -r $WORKSPACE/dist .
                # Write the token to the .npmrc file
                echo "//registry.npmjs.org/:_authToken="$NPMUserPassword > .npmrc
                # Create a .npmignore file to prevent the .npmrc file ending up in the package
                echo -e ".npmrc\n.npmignore" > .npmignore
                
                # Publish the package
                echo Publishing the NPM package
                docker run --rm \
                    --volume "$PWD":/workspace:rw --workdir /workspace \
                    --user $UID:$GROUPS \
                    -e "http_proxy=$HttpProxy" \
                    -e "https_proxy=$HttpsProxy" \
                    -e "no_proxy=localhost, 127.0.0.1" \
                    $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST \
                    npm publish --access public
                echo NPM package published
                
                # Delete the package
                echo Deleting the package
                popd
                rm -rf $WORKSPACE/npm
            else
                echo Branch $NextVersion-package-test was not merged into the Bower branch.
            fi            
            
            break;
        fi
        
        echo Branch $NextVersion-package-test still exists. Sleeping for $branchCheckDelay seconds
        sleep $branchCheckDelay
    done
fi

exit 0