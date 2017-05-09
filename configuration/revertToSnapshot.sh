#!/bin/bash

echo
echo Reverting to snapshot ...
echo WORKSPACE is $WORKSPACE
echo PWD is $PWD

cd $WORKSPACE/configuration
mkdir -p .ansible/tmp
chmod -R a+rw .

# Include utility functions
source ./utility.shinc
echo Build image is $ANSIBLE_IMAGE_NAME:$ANSIBLE_BUILD_IMAGE_TAG_LATEST

# Remove the file indicating the successful completion of the job
if [ -f $4 ]; then
    rm -f $4
fi

# Ensure the Docker image exists
echo Listing Docker images
docker images
ensure_ansible_image_exists

# Revert the machine
echo Revert the machine to the specified snapshot and restart it
cd $WORKSPACE/configuration
revert_snapshot_run "$1" "$2" "$3" "$4" "$AnsibleVaultPassword"

# Check for the existence of the file indicating the success of the job and return 'success' or 'failure' accordingly
if [ -f $4 ]; then
    echo Job succeeded
	exit 0
else
    echo Job failed
    exit 1
fi
