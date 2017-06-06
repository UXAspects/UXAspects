#!/bin/bash

rootFolder="/home/UXAspectsTestUser"
echo rootFolder is $rootFolder

cd $rootFolder/ux-aspects
source $PWD/buildscripts/functions.sh

echo Workspace is $WORKSPACE
echo HttpProxy is $HttpProxy
echo HttpsProxy is $HttpsProxy
echo Build number is $BUILD_NUMBER
echo Build image is $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME
echo Displaying groups
groups
echo Displaying id
id

hubProcessPort=4444
echo hubProcessPort is $hubProcessPort

# Get the build number
buildNumber="`head -1 $rootFolder/ux-aspects/buildscripts/build`"
if [ -z "$buildNumber" ]
then
    buildNumber="`head -1 $rootFolder/ux-aspects/jenkins/build`"
    if [ -z "$buildNumber" ]
    then
        echo Build number not set
    else
        echo Build number is $buildNumber
    fi
else
    echo Build number is $buildNumber
fi

# Update connect.js to allow building of the documentation. Publish on port 4000.
cd $rootFolder/ux-aspects
sed -i.bak 's/hostname: '"'"'localhost'"'"'/hostname: '"'"'0.0.0.0'"'"'/' grunt/connect.js
sed -i.bak 's/livereload: true/livereload: false/g' grunt/connect.js

# Create the latest ux-aspects-build image if it does not exist
docker_image_build "$rootFolder/ux-aspects/docker"; echo
echo Executing the Selenium tests in the $UX_ASPECTS_BUILD_IMAGE_NAME:$UX_ASPECTS_BUILD_IMAGE_TAG_LATEST container

# Remove any ContainerID file left behind by the previous container
if [ -f "$PWD/ContainerID" ]; then
    ContainerID=$(<"$PWD/ContainerID")
    echo Previous container ID is $ContainerID
    if [ ! -z $ContainerID ]; then
        echo Killing container ID $ContainerID
        docker kill $ContainerID
        echo Removing container ID $ContainerID
        docker rm -f $ContainerID
        echo Removing container ID file
        rm -f "$PWD/ContainerID"
    fi
fi

# Remove the file indicating that the tests have finished
if [ -f "$PWD/GridHubFinished" ]; then
    echo Removing grid hub flag
    rm -f "$PWD/GridHubFinished"
fi

# Create a new container which will build the new web service
echo Starting new container
docker_image_run_detached "$rootFolder/ux-aspects" 4000 "ContainerID" "bash buildscripts/executeSeleniumTestsDocker.sh &"

# Loop until the container has been created
containerIDCheckDelay=5
while :
do
    if [ -f "$PWD/ContainerID" ]; then
        ContainerID=$(<"$PWD/ContainerID")
        echo New container ID is $ContainerID
        break
    else
        echo No container ID file created yet
    fi
    echo Sleeping for $containerIDCheckDelay seconds
    sleep $containerIDCheckDelay
done

# Display the output of the container
docker logs -f $ContainerID &

# Loop until the web service is available
wgetCheckDelay=5
while :
do
    bash -c 'wget --proxy=off -t 1 -O webservice.html localhost:4000 ; exit $?'
    wgstatus=$?
    echo wget returned $wgstatus
    rm -f "$PWD/webservice.html"
    if [ $wgstatus -eq 0 ]; then
        echo Web service is available
        break
    fi
    echo Sleeping for $wgetCheckDelay seconds
    sleep $wgetCheckDelay
done

# Kill any process using port 4444 (the Selenium Grid hub process)
echo Kill any existing Selenium Grid hub process
PID_SELENIUM=`/usr/sbin/fuser -n tcp 4444 2> /dev/null`
echo Old Selenium Grid hub process ID is $PID_SELENIUM
if [ ! -z "$PID_SELENIUM" ] ; then
    echo "Killing existing Selenium Grid hub process" ; kill -9 $PID_SELENIUM ;
    # Loop until the old process is gone
    wait_for_grid_hub_process_status_to_change 1 "finish" $hubProcessPort
fi

echo Start the new Selenium Grid hub process
cd $rootFolder/ux-aspects/configuration
java -jar $rootFolder/ux-aspects/Selenium/selenium-server-standalone-3.3.1.jar -role hub -hubConfig hub/hubConfig.json &
# Loop until the new process has started
wait_for_grid_hub_process_status_to_change 1 "start" $hubProcessPort

# Run the tests
echo Running the tests
cd $rootFolder/ux-aspects
mvn test

# Create the file indicating to the container that the tests have finished
PID_SELENIUM=`/usr/sbin/fuser -n tcp 4444 2> /dev/null`
echo $PID_SELENIUM > "$PWD/GridHubFinished"

# Kill and remove the container
if [ -f "$PWD/ContainerID" ]; then
    ContainerID=$(<"$PWD/ContainerID")
    echo Existing container ID is $ContainerID
    if [ ! -z $ContainerID ]; then
        echo Killing container ID $ContainerID
        docker kill $ContainerID
        echo Removing container ID $ContainerID
        docker rm -f $ContainerID
        echo Removing container ID file
        rm -f "$PWD/ContainerID"
    fi
fi

# Kill the grid hub process
echo Kill the Selenium Grid hub process
if [ ! -z "$PID_SELENIUM" ] ; then
    echo "Killing the Selenium Grid hub process" ; kill -9 $PID_SELENIUM ;
    # Loop until the old process is gone
    wait_for_grid_hub_process_status_to_change 1 "finish" $hubProcessPort
fi

# Create the results file
cd $rootFolder/ux-aspects

# Create file containing the time the file was created, for debugging
echo Before date -u
date -u > HandlingTestResults

rm -f emailable-report.html UXAspectsTestsResults.html testng-results.xml
cp target/surefire-reports/emailable-report.html .

echo Before csplit
csplit emailable-report.html '/\<body\>/'
sed -i.bak 's/<head>/<head><meta http-equiv=\"Content-Style-Type\" content=\"text\/css\"; charset=\"utf-8\">/' xx00
sed -i.bak 's/<style type=\"text\/css\">/<style type=\"text\/css\">p,ul,ol{text-align: left; text-indent: 0px; \
padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;}/' xx00
sed -i 's/<body>//g' xx01
while read line ; do
    echo "$line" >> UXAspectsTestsResults.html
done < xx00

echo "<body>" >> UXAspectsTestsResults.html

echo Before echo build number
echo "<h2>Build number: " >> UXAspectsTestsResults.html
if [ -z "$buildNumber" ]
then
    echo "not set" >> UXAspectsTestsResults.html
else
    echo "$buildNumber" >> UXAspectsTestsResults.html
fi
echo "</h2>" >> UXAspectsTestsResults.html

echo "<h2>" >> UXAspectsTestsResults.html
date -u >> UXAspectsTestsResults.html
echo "</h2></br>" >> UXAspectsTestsResults.html

echo Before echo Selenium-based Tests
echo "</br><h2>Selenium-based Tests</h2></br>" >> UXAspectsTestsResults.html
while read line ; do
    echo "$line" >> UXAspectsTestsResults.html
done < xx01

rm -f $rootFolder/index.html $rootFolder/ux-aspects/index.html $rootFolder/testng-results.xml $rootFolder/ux-aspects/testng-results.xml
cp UXAspectsTestsResults.html $rootFolder/index.html
cp UXAspectsTestsResults.html $rootFolder/ux-aspects/index.html
cp target/surefire-reports/testng-results.xml $rootFolder/testng-results.xml
cp target/surefire-reports/testng-results.xml $rootFolder/ux-aspects/testng-results.xml

echo Before reading results
cd $rootFolder
numberOfSkipped=$(echo 'cat //testng-results/@skipped' | xmllint --shell \
    $rootFolder/ux-aspects/target/surefire-reports/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')
numberOfFailures=$(echo 'cat //testng-results/@failed' | xmllint --shell \
    $rootFolder/ux-aspects/target/surefire-reports/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')
totalNumber=$(echo 'cat //testng-results/@total' | xmllint --shell \
    $rootFolder/ux-aspects/target/surefire-reports/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')
numberOfPassed=$(echo 'cat //testng-results/@passed' | xmllint --shell \
    $rootFolder/ux-aspects/target/surefire-reports/testng-results.xml  | awk -F'[="]' '!/>/{print $(NF-1)}')

echo numberOfSkipped = $numberOfSkipped
echo numberOfFailures = $numberOfFailures
echo totalNumber = $totalNumber
echo numberOfPassed = $numberOfPassed

if [ "$numberOfSkipped" -eq 0 ] && [ "$numberOfFailures" -eq 0 ]
then
    echo "Selenium test(s) passed"
    exit 0
else
    echo "Selenium test(s) failed"
    exit 1
fi

