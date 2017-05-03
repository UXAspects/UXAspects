#!/bin/bash

echo Re-installing software on Selenium Grid node 1 ...
echo WORKSPACE is $WORKSPACE
echo PWD is $PWD
echo Build number is $BUILD_NUMBER
echo Displaying id
id

echo Changing to $WORKSPACE/configuration
cd $WORKSPACE/configuration

# Revert the machine
bash revertToSnapshot.sh 'RelEng' 'SOUELEMVMW7' 'Before deployment' 'Node1Rebuilt'
revertResult=$?
echo revertToSnapshot.sh returned $revertResult
if [ $revertResult -eq 1 ]; then
    exit 1;
fi

# Deploy software to the machine. Sleep needed while waiting for machine to become visible again.
echo
sleepFor=300
echo Sleeping for $sleepFor seconds ...
sleep $sleepFor
bash reinstallSoftware.sh '/workspace/tasks/node1.yml'