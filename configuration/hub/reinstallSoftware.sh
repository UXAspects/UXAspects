#!/bin/bash

echo Re-installing software on Selenium Grid hub ...
echo WORKSPACE is $WORKSPACE
echo PWD is $PWD
echo Build number is $BUILD_NUMBER
echo Displaying id
id

echo Changing to $WORKSPACE/configuration
cd $WORKSPACE/configuration

# Revert the machine
bash revertToSnapshot.sh 'RelEng' 'SOUELEMVMCOS' 'Before deployment' 'HubRebuilt'
revertResult=$?
echo revertToSnapshot.sh returned $revertResult
if [ $revertResult -eq 1 ]; then
    exit 1;
fi

# Download the required Ansible roles
bash downloadRoles.sh

# Deploy software to the machine
echo
sleepFor=30
echo Sleeping for $sleepFor seconds ...
sleep $sleepFor
bash reinstallSoftware.sh '/workspace/tasks/hub.yml'