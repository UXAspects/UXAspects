#!/bin/bash

echo
echo
echo In executeE2ETestsDocker.sh
echo UID is $UID
echo GROUPS is $GROUPS
echo GID is $GID
echo EUID is $EUID
echo USER is $USER
echo PWD is $PWD

echo Displaying groups
groups
echo Displaying id
id

cd /workspace

# Create file containing the time tests started, for debugging
echo Writing to ExecutingE2ETests
date -u > /workspace/ExecutingE2ETests

# Install NPM packages and run the tests, recording the number of failures
echo Running npm install
npm install
echo

echo Running grunt task
grunt e2e
echo

echo Running xsltproc to extract number of test filures
testStatus=`xsltproc buildscripts/countFailures.xsl e2e/xml/chrome-xmloutput.xml`

echo Number of failures is $testStatus
exit $testStatus
