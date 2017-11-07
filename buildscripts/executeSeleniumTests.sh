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

# Create the results file
cd $rootFolder/ux-aspects

# Create file containing the time the file was created, for debugging
echo Before date -u
date -u > HandlingTestResults

rm -f UXAspectsTestsResults.html
cp buildscripts/emailable-report.html .
cp buildscripts/testng-results.xml .

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
cp testng-results.xml $rootFolder/testng-results.xml
cp testng-results.xml $rootFolder/ux-aspects/testng-results.xml

echo "Selenium test(s) passed"
exit 0

