#!/bin/bash

echo === Dry run for git clean -f -x -d \(Show what would be removed if ignore rules were not used\)
git clean -f -x -d -n
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git clean failed, returned $exitCode"
    exit 1
fi
echo

echo === Dry run for git clean -f -d \(Show what would be removed if ignore rules were used\)
git clean -f -d -n
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git clean failed, returned $exitCode"
    exit 1
fi
echo

# echo === Running git clean -f -x -d
# git clean -f -x -d
# exitCode=$?
# if [ "$exitCode" -ne 0 ]; then
    # echo "=== git clean failed, returned $exitCode"
    # exit 1
# fi
# echo

exit 0


