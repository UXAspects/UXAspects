#!/bin/bash

set -e

PackageLocation=$1
USERNAME=$2
PASSWORD=$3
EMAIL=$4

echo $0 - PackageLocation is $PackageLocation

# Log in to NPM
cd $PackageLocation

/usr/bin/expect <<EOF
set timeout 10
spawn npm login
match_max 100000

expect "Username"
send "$USERNAME\r"

expect "Password"
send "$PASSWORD\r"

expect "Email"
send "$EMAIL\r"

expect {
   timeout      exit 1
   expect eof
}
EOF

# Publish the package
npm publish --access public
npm logout
echo NPM package published

exit 0
