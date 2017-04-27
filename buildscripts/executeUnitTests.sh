#!/bin/bash

UX_ASPECTS_BUILD_IMAGE_NAME=ux-aspects-build
UX_ASPECTS_BUILD_IMAGE_TAG_LATEST=0.9.0

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

# Create the latest elements-build image if it does not exist
docker_image_build; echo

echo Executing the unit tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container
cd $WORKSPACE/ux-aspects
chmod a+rw .
# ls -al
# echo Objects under dist
# ls -alR dist
# echo Directories containing root
# find . -type d -exec ls -ld {} \; | grep root
# echo Files containing root
# ls -alR | grep root
date -u > $WORKSPACE/ux-aspects/BeforeUnitTestsStarted
ls -al BeforeUnitTestsStarted
docker_image_run bash buildscripts/executeUnitTestsDocker.sh; echo

# The unit tests results file, UnitTestResults.txt, should have been created in this folder. Copy it to our results file and
# remove unwanted strings.
echo Adding unit test results to the results file
echo "<h2>Unit Tests</h2>" >> UXAspectsTestsResults.html
while read line ; do
    echo "<p><span class=rvts6>$line</span></p>" >> UXAspectsTestsResults.html
done < UnitTestResults.txt
sed -i 's/\[1m//g' UXAspectsTestsResults.html
sed -i 's/\[4m//g' UXAspectsTestsResults.html
sed -i 's/\[22m//g' UXAspectsTestsResults.html
sed -i 's/\[24m//g' UXAspectsTestsResults.html
sed -i 's/\[31m//g' UXAspectsTestsResults.html
sed -i 's/\[32m//g' UXAspectsTestsResults.html
sed -i 's/\[33m//g' UXAspectsTestsResults.html
sed -i 's/\[39m//g' UXAspectsTestsResults.html
sed -i 's/\r\n/\n/g' UXAspectsTestsResults.html
echo "</body></html>" >> UXAspectsTestsResults.html

cd $WORKSPACE/ux-aspects
cp UXAspectsTestsResults.html index.html
cp index.html index-${BUILD_NUMBER}.html
mkdir -p $WORKSPACE/reports
cp index.html $WORKSPACE/reports/index.html
mkdir -p $WORKSPACE/ux-aspects/reports
cp UXAspectsTestsResults.html reports/index.html

# echo Listing WORKSPACE
# ls -alR $WORKSPACE
# echo Listing /home/jenkins/jobs/HPElements/jobs/ux-aspects-unit-tests
# ls -alR /home/jenkins/jobs/HPElements/jobs/ux-aspects-unit-tests

# Test for success i.e. zero failures. If there were failures, exit with status 1.
if grep -q  ">> 0 failures" UnitTestResults.txt;
then
    echo Unit tests passed
    exit 0
else
    echo "Unit test(s) failed"
    exit 1
fi
