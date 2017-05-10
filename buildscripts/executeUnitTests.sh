#!/bin/bash

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_0_10_0=0.10.0
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.10.0

echo
echo
echo Workspace is $WORKSPACE
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
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
        docker run --rm --volume "$PWD":/workspace --workdir /workspace \
		    --user $UID:$GROUPS $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST "$@"
    fi
}

cd $WORKSPACE/ux-aspects

# Ensure files match those in origin/develop. First remove untracked files (except those in .gitignore)
git clean -f
# Then reset any changed, tracked files
git fetch --all
git reset --hard origin/develop

# Start creation of the test results file. The file will contain some styling settings needed for display of the results of the unit tests.
echo Starting creation of the results file
# Delete any existing file
rm -f UnitTestResults.txt
rm -f UXAspectsTestsResults.html
# Split the stored copy of a Selenium tests results file at the <body> tag. Everything before that point will be stying information
# and will be placed at the start of our results file.
csplit buildscripts/emailable-report.html '/\<body\>/'
# Some additional adjustments to header charset and CSS settings are needed to allow display of special characters (tick and cross)
# in the unit test results. Update the first chunk, xx00, created when the file was split.
sed -i.bak 's/<head>/<head><meta http-equiv=\"Content-Style-Type\" content=\"text\/css\"; charset=\"utf-8\">/' xx00
sed -i.bak 's/<style type=\"text\/css\">/<style type=\"text\/css\">p,ul,ol{text-align: left; text-indent: 0px; \
padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;}/' xx00
# Remove the <body> tag from the start of the second chunk, xx01.
sed -i 's/<body>//g' xx01
# Copy the lines in the first chunk to our results file
cp xx00 UXAspectsTestsResults.html
echo "<body>" >> UXAspectsTestsResults.html

# Record information about the build in the results file
echo "<h2>Build number: " >> UXAspectsTestsResults.html
echo "$BUILD_NUMBER" >> UXAspectsTestsResults.html
echo "</h2>" >> UXAspectsTestsResults.html

echo "<h2>" >> UXAspectsTestsResults.html
date -u >> UXAspectsTestsResults.html
echo "</h2></br>" >> UXAspectsTestsResults.html

# Remove old image
docker_image_remove $UX_ASPECTS_BUILD_IMAGE_NAME $UX_ASPECTS_BUILD_IMAGE_TAG_0_10_0; echo

# Create the latest ux-aspects-build image if it does not exist
docker_image_build; echo

echo Executing the unit tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container
cd $WORKSPACE/ux-aspects
chmod a+rw .
date -u > $WORKSPACE/ux-aspects/BeforeUnitTestsStarted
ls -al BeforeUnitTestsStarted
docker_image_run bash buildscripts/executeUnitTestsDocker.sh; echo

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
echo "</body></html>" >> UXAspectsTestsResults.html

cd $WORKSPACE/ux-aspects
cp UXAspectsTestsResults.html index.html
cp index.html index-${BUILD_NUMBER}.html
mkdir -p $WORKSPACE/reports
cp index.html $WORKSPACE/reports/index.html
mkdir -p $WORKSPACE/ux-aspects/reports
cp UXAspectsTestsResults.html reports/index.html

# Test for success i.e. zero failures. If there were failures, exit with status 1.
if grep -q  ">> 0 failures" UnitTestResults.txt;
then
    echo Unit tests passed
else
    echo "Unit test(s) failed"
    exit 1
fi

# Clear up previous documentation builds
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
