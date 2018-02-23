#!/bin/bash

echo === Moving to workspace
cd $WORKSPACE

source $PWD/buildscripts/functions.sh

SELENIUM_TEST_MACHINE_USER=UXAspectsTestUser
REMOTE_FOLDER=/home/$SELENIUM_TEST_MACHINE_USER/UXAspectsTestsReleaseBuild

echo === Workspace is $WORKSPACE
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

# Start creation of the test results file. The file will contain some styling settings needed for display of the results of the
# unit tests and, if the unit tests passed, the Selenium tests' results.
echo === Starting creation of the results file
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

# Create the latest ux-aspects-build image if it does not exist
docker_image_build "$WORKSPACE/docker"; echo
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== docker_image_build failed, returned $exitCode"
    exit 1
fi

if [ "$RunTests" == "true" ]; then
    echo === Executing the unit tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container
    chmod a+rw .
    docker_image_run "$WORKSPACE" "bash buildscripts/executeUnitTestsDocker.sh"
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== executeUnitTestsDocker.sh failed, returned $exitCode"
        # Don't exit yet. Copy the results to the HTML file.
    fi

    # The unit tests results file, UnitTestResults.txt, should have been created in this folder. Copy it to our results file and
    # ignore unwanted strings.
    echo === Adding unit test results to the results file
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
        echo === Unit tests passed
    else
        echo "=== Unit test(s) failed"
        echo "</body></html>" >> UXAspectsTestsResults.html
        cp UXAspectsTestsResults.html $WORKSPACE/index-${BUILD_NUMBER}.html
        cp UXAspectsTestsResults.html $WORKSPACE/index.html
        mkdir -p $WORKSPACE/reports
        cp index.html $WORKSPACE/reports/index.html
        exit 1
    fi

    echo "</body></html>" >> UXAspectsTestsResults.html
    cp UXAspectsTestsResults.html $WORKSPACE/index-${BUILD_NUMBER}.html
    cp UXAspectsTestsResults.html $WORKSPACE/index.html
    mkdir -p $WORKSPACE/reports
    cp index.html $WORKSPACE/reports/index.html

    echo === Selenium tests not run
fi

# Create an empty results file if tests were not run
if [ "$RunTests" != "true" ]; then
    echo "=== No tests performed"
    echo "<h2>No tests performed</h2>" >> UXAspectsTestsResults.html
    echo "</body></html>" >> UXAspectsTestsResults.html
    cp UXAspectsTestsResults.html $WORKSPACE/index-${BUILD_NUMBER}.html
    cp UXAspectsTestsResults.html $WORKSPACE/index.html
    mkdir -p $WORKSPACE/reports
    cp index.html $WORKSPACE/reports/index.html
fi

# Exit if there is nothing to be built
if [ "$BuildPackages" != "true" ] && [ "$BuildDocumentation" != "true" ]; then
    echo "=== Nothing to build - exiting"
    exit 0
fi

# Perform the build
echo === Both sets of tests passed. Performing the build.
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
echo === Storing the Keppel theme files
mkdir $WORKSPACE/KeppelThemeFiles
cp -p -r $WORKSPACE/src/fonts $WORKSPACE/KeppelThemeFiles
cp -p -r $WORKSPACE/src/img $WORKSPACE/KeppelThemeFiles
cp -p -r $WORKSPACE/src/styles $WORKSPACE/KeppelThemeFiles

# Get the HPE theme files and copy them onto the source hierarchy
echo
echo === Getting the HPE theme files
mkdir $WORKSPACE/HPEThemeFiles
pushd $WORKSPACE/HPEThemeFiles
curl -L -S -s https://github.houston.softwaregrp.net/caf/ux-aspects-hpe/archive/master.zip > HPETheme.zip
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== curl failed, returned $exitCode"
    exit 1
fi
unzip -o HPETheme.zip
cp -p -r ux-aspects-hpe-master/fonts $WORKSPACE/src
cp -p -r ux-aspects-hpe-master/img $WORKSPACE/src
cp -p -r ux-aspects-hpe-master/styles $WORKSPACE/src
popd

# Update JSON files with the new version number
docker_image_run "$WORKSPACE" "bash buildscripts/updateVersionNumbers.sh $NextVersion"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== updateVersionNumbers.sh failed, returned $exitCode"
    exit 1
fi

# Record the product name read from bower.json
bowerName=$(<"$PWD/bowerName.txt")
echo "=== Bower name = $bowerName"
rm -f bowerName.txt

# Build using the HPE theme
echo
echo === Building using the HPE theme
echo === Run npm install
docker_image_run "$WORKSPACE" "npm install"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== npm install failed, returned $exitCode"
    exit 1
fi

echo === Building
docker_image_run "$WORKSPACE" "grunt cleanup"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== grunt cleanup failed, returned $exitCode"
    exit 1
fi

docker_image_run "$WORKSPACE" "grunt build"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== grunt build failed, returned $exitCode"
    exit 1
fi

# Archive the HPE-themed documentation files
echo
echo === Archiving the HPE-themed documentation files
mv dist/docs docs-gh-pages-HPE-$NextVersion
pushd docs-gh-pages-HPE-$NextVersion
tarDocs=`tar -czvf ../$NextVersion-docs-gh-pages-HPE.tar.gz *`
echo "$tarDocs"
popd

# Create HPE Bower package tarball for Artifactory
HPEPackage="${bowerName}-hpe_$NextVersion.tar.gz"
echo
echo === Creating the HPE Bower package $HPEPackage
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
    echo "=== Package $HPEPackage was Successfully created"
    ls -la "$WORKSPACE/HPEThemeFiles/Package/$HPEPackage"
else
    echo "=== Error: Creating package $HPEPackage"
fi
popd

# Upload HPE-themed package to Artifactory
if [ "$BuildPackages" == "true" ]; then
    echo
    echo === Uploading HPE-themed package to Artifactory
    echo "curl -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/HPEThemeFiles/Package/$HPEPackage"
    curl -u $PrivateArtifactoryCredentials -XPUT $PrivateArtifactoryURL/$HPEPackage -T $WORKSPACE/HPEThemeFiles/Package/$HPEPackage
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== curl failed, returned $exitCode"
        exit 1
    fi
fi

# Remove the HPE theme files
echo
echo === Deleting the HPE theme files
rm -rf $WORKSPACE/src/fonts
rm -rf $WORKSPACE/src/img
rm -rf $WORKSPACE/src/styles

# Remove the HPE theme build artifacts
echo
echo === Deleting the HPE build artifacts
rm -rf $WORKSPACE/HPEThemeFiles
rm -rf $WORKSPACE/docs-gh-pages-HPE-$NextVersion
rm -f $WORKSPACE/$NextVersion-docs-gh-pages-HPE.tar.gz

# Copy back the Keppel theme files
echo
echo === Restoring the Keppel theme files
cp -p -r $WORKSPACE/KeppelThemeFiles/* $WORKSPACE/src

# Build using the Keppel theme
echo
echo === Building using the Keppel theme
docker_image_run "$WORKSPACE" "grunt cleanup"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== grunt cleanup failed, returned $exitCode"
    exit 1
fi
rm -rf dist
rm -rf $WORKSPACE/KeppelThemeFiles

docker_image_run "$WORKSPACE" "grunt build"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== grunt build failed, returned $exitCode"
    exit 1
fi

# Archive the Keppel-themed documentation files
echo
echo === Archiving the Keppel-themed documentation files
mv dist/docs docs-gh-pages-Keppel-$NextVersion
pushd docs-gh-pages-Keppel-$NextVersion
tarDocs=`tar czvf ../$NextVersion-docs-gh-pages-Keppel.tar.gz *`
echo "$tarDocs"
popd

if [ "$BuildDocumentation" == "true" ]; then
    # Create a branch for the new documentation. First, clone the repository to a sub-folder.
    # Switching to the new branch and commiting to it will be performed in this clone.
    echo
    echo === Creating the branch $NextVersion-gh-pages-test
    rm -rf gh-pages-clone
    mkdir gh-pages-clone
    pushd gh-pages-clone
    git clone -b gh-pages --single-branch git@github.com:UXAspects/UXAspects.git
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git clone failed, returned $exitCode"
        exit 1
    fi
    pushd UXAspects
    
    git checkout -b $NextVersion-gh-pages-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git checkout failed, returned $exitCode"
        exit 1
    fi
    
    git push origin $NextVersion-gh-pages-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    # Delete existing files
    echo
    echo === Deleting existing files
    rm -rf assets/ docs/ modules/ showcase/
    rm -f *.css *.html *.js *.ico *.log

    # Extract the files from the Keppel documentation archive, both to this folder and to a $NextVersion sub-directory
    echo
    echo === Extracting the archived Keppel-themed documentation to this folder and to a numbered sub-directory
    tar xvf $WORKSPACE/$NextVersion-docs-gh-pages-Keppel.tar.gz
    if [ -d "$NextVersion" ]; then
        echo "=== Folder $NextVersion exists... deleting it!"
        rm -rf $NextVersion
    fi
    mkdir $NextVersion
    pushd $NextVersion
    tar xvf $WORKSPACE/$NextVersion-docs-gh-pages-Keppel.tar.gz
    popd

    # Push the new files to the branch
    echo
    echo === Pushing the new files to the branch
    git add $NextVersion/ assets/ docs/ modules/ showcase/ *.css *.html *.ico *.js
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git add failed, returned $exitCode"
        exit 1
    fi
    
    git commit -a -m "Committing documentation changes for $NextVersion-gh-pages-test. Latest develop commit ID is $latestDevelopCommitID."
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git commit failed, returned $exitCode"
        exit 1
    fi
    
    git push origin $NextVersion-gh-pages-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi
    
    popd; popd
    rm -rf $WORKSPACE/gh-pages-clone
fi

if [ "$BuildPackages" == "true" ]; then
    # Create a branch for the new Keppel Bower package. First, clone the repository to a sub-folder.
    # Switching to the new branch and commiting to it will be performed in this clone.
    echo
    echo === Creating the branch $NextVersion-package-test
    rm -rf package-clone
    mkdir package-clone
    pushd package-clone
    git clone -b bower --single-branch git@github.com:UXAspects/UXAspects.git
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git clone failed, returned $exitCode"
        exit 1
    fi
    pushd UXAspects
    
    git checkout -b $NextVersion-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git checkout failed, returned $exitCode"
        exit 1
    fi

    git push origin $NextVersion-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    # Remove existing files and copy the newly-built package files from the workspace. Only the 'dist'
    # folder and bower.json are needed.
    rm -rf *
    cp -p -r $WORKSPACE/dist/* .
    rm -rf ./docs
    cp -p $WORKSPACE/bower.json .

    # Push the new files to the branch
    echo
    echo === Pushing the new files to the branch
    git add *
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git add failed, returned $exitCode"
        exit 1
    fi

    git commit -a -m "Committing changes for package $NextVersion-package-test. Latest develop commit ID is $latestDevelopCommitID."
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git commit failed, returned $exitCode"
        exit 1
    fi

    git push --set-upstream origin $NextVersion-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    popd; popd
    rm -rf $WORKSPACE/package-clone
fi

if [ "$BuildPackages" == "true" ]; then
    # Package the files for the NPM package.
    echo
    echo === Packaging the NPM files
    rm -rf NPM-package-clone
    rm -rf npm
    mkdir -p npm
    pushd npm
    cp -p -r $WORKSPACE/README.md .
    cp -p -r $WORKSPACE/dist/* .
    rm -rf ./docs
    npm pack
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== npm pack failed, returned $exitCode"
        exit 1
    fi
    popd
    
    # Create a branch for the new NPM package. First, clone the repository to a sub-folder.
    # Switching to the new branch and commiting to it will be performed in this clone.
    echo
    echo === Creating the branch $NextVersion-NPM-package-test
    mkdir NPM-package-clone
    pushd NPM-package-clone
    git clone -b NPM --single-branch git@github.com:UXAspects/UXAspects.git
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git clone failed, returned $exitCode"
        exit 1
    fi
    pushd UXAspects
    
    git checkout -b $NextVersion-NPM-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git checkout failed, returned $exitCode"
        exit 1
    fi

    git push origin $NextVersion-NPM-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    # Remove existing files and copy the newly-built package.
    echo
    echo === Copying the package files
    rm -rf *
    cp $WORKSPACE/npm/ux-aspects-ux-aspects-*.tgz .

    # Push the new files to the branch
    echo
    echo === Pushing the new files to the branch
    git add *
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git add failed, returned $exitCode"
        exit 1
    fi

    git commit -a -m "Committing changes for package $NextVersion-NPM-package-test. Latest develop commit ID is $latestDevelopCommitID."
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git commit failed, returned $exitCode"
        exit 1
    fi

    git push --set-upstream origin $NextVersion-NPM-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    popd; popd
    rm -rf $WORKSPACE/NPM-package-clone
    # Deletion of the npm folder can fail sometimes with 'Device or resource busy'. Just delete the contents.
    rm -rf $WORKSPACE/npm/*
fi

if [ "$BuildPackages" == "true" ]; then
    # Package the documentation files.
    echo
    echo === Packaging the documentation package files
    npm pack
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== npm pack failed, returned $exitCode"
        exit 1
    fi
    
    # Create a branch for the new NPM documentation package. First, clone the repository to a sub-folder.
    # Switching to the new branch and commiting to it will be performed in this clone.
    echo
    echo === Creating the branch $NextVersion-NPM-docs-package-test
    rm -rf NPM-docs-package-clone
    mkdir NPM-docs-package-clone
    pushd NPM-docs-package-clone
    git clone -b NPM --single-branch git@github.com:UXAspects/UXAspects.git
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git clone failed, returned $exitCode"
        exit 1
    fi
    pushd UXAspects
    
    git checkout -b $NextVersion-NPM-docs-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git checkout failed, returned $exitCode"
        exit 1
    fi

    git push origin $NextVersion-NPM-docs-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    # Remove existing files and copy the newly-built documentation package.
    echo
    echo === Copying the documentation package files
    rm -rf *
    cp $WORKSPACE/ux-aspects-ux-aspects-docs-*.tgz .

    # Push the new files to the branch
    echo
    echo === Pushing the new files to the branch
    git add *
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git add failed, returned $exitCode"
        exit 1
    fi

    git commit -a -m "Committing changes for package $NextVersion-NPM-docs-package-test. Latest develop commit ID is $latestDevelopCommitID."
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git commit failed, returned $exitCode"
        exit 1
    fi

    git push --set-upstream origin $NextVersion-NPM-docs-package-test
    exitCode=$?
    if [ "$exitCode" -ne 0 ]; then
        echo "=== git push failed, returned $exitCode"
        exit 1
    fi

    popd; popd
    rm -rf $WORKSPACE/NPM-docs-package-clone
fi

exit 0