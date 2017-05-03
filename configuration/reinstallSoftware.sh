#!/bin/bash

echo
echo Re-installing software ...
echo WORKSPACE is $WORKSPACE
echo PWD is $PWD

cd $WORKSPACE/configuration

# Include utility functions
source ./utility.shinc
echo Build image is $ANSIBLE_IMAGE_NAME:$ANSIBLE_BUILD_IMAGE_TAG_LATEST

# Ensure the Docker image exists
ensure_ansible_image_exists

# Deploy software to the machine
echo Deploy to the machine
cd $WORKSPACE/configuration
run_ansible_playbook "$1" "$AnsibleVaultPassword"
