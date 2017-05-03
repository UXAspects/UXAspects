#!/bin/bash

echo
echo Downloading Ansible roles ...
echo WORKSPACE is $WORKSPACE
echo PWD is $PWD

cd $WORKSPACE/configuration

# Include utility functions
source ./utility.shinc
echo Build image is $ANSIBLE_IMAGE_NAME:$ANSIBLE_BUILD_IMAGE_TAG_LATEST

# Ensure the Docker image exists
ensure_ansible_image_exists

# Downlod the roles
echo Download the roles
download_ansible_roles

