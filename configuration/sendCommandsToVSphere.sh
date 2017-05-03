#!/bin/bash

echo
echo Sending commands to vSphere
echo PWD is $PWD
echo Param 1 is $1
echo Param 2 is $2
echo Param 3 is $3
echo Param 4 is $4

# Copy the encrypted vSphere credentials file to /tmp
cp -p /workspace/vsphere.yml /tmp

# Write the vault password to a text file in /tmp
echo $5 > /tmp/password.txt

# Decrypt the credentials file
ansible-vault decrypt -vv --vault-password-file=/tmp/password.txt /tmp/vsphere.yml

# Execute the Python commands which will use the unencrypted credentials to revert the snapshot
python revertToSnapshot.py "$1" "$2" "$3" "$4"

