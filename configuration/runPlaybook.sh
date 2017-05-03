#!/bin/bash

echo
echo Running the playbook ...
echo PWD is $PWD
echo Param 1 is $1

# Write the vault password to a text file in /tmp
echo $2 > /tmp/password.txt

# Decrypt the Maven settings file
cp -p /workspace/settings.xml /tmp
ansible-vault decrypt -vv --vault-password-file=/tmp/password.txt /tmp/settings.xml

# Decrypt the build slave's authorized_keys file
cp -p /workspace/authorized_keys /tmp
ansible-vault decrypt -vv --vault-password-file=/tmp/password.txt /tmp/authorized_keys

# Run the playbook, passing the unencrypted password file to unlock the vault
ansible-playbook -vv -i /workspace/hosts "$1" --vault-password-file=/tmp/password.txt

