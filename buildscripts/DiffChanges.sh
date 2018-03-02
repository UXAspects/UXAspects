#!/bin/bash

rm -f Differences.txt

echo === Running git diff and sending output to Differences.txt
git diff --no-color -w > Differences.txt 2>&1
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git diff failed, returned $exitCode"
    exit 1
fi
echo

echo === Displaying differences
ls -al Differences.txt
cat Differences.txt
echo

exit 0
