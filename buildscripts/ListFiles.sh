#!/bin/bash

rm -f UntrackedFiles.txt UntrackedFilesExcludingIgnored.txt ModifiedFiles.txt DeletedFiles.txt

echo === Running git ls-files -o and sending output to UntrackedFiles.txt
git ls-files -o > UntrackedFiles.txt
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git ls-files failed, returned $exitCode"
    exit 1
fi
echo

echo === Displaying untracked files \(not using ignore rules\)
cat UntrackedFiles.txt
echo

echo === Running git ls-files -o --exclude-standard and sending output to UntrackedFilesExcludingIgnored.txt
git ls-files -o --exclude-standard > UntrackedFilesExcludingIgnored.txt
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git ls-files failed, returned $exitCode"
    exit 1
fi
echo

echo === Displaying untracked files \(using ignore rules\)
cat UntrackedFilesExcludingIgnored.txt
echo

echo === Running git ls-files -m and sending output to ModifiedFiles.txt
git ls-files -m > ModifiedFiles.txt
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git ls-files failed, returned $exitCode"
    exit 1
fi
echo

echo === Displaying modified files
cat ModifiedFiles.txt
echo

echo === Running git ls-files -d and sending output to DeletedFiles.txt
git ls-files -d > DeletedFiles.txt
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git ls-files failed, returned $exitCode"
    exit 1
fi
echo

echo === Displaying deleted files
cat DeletedFiles.txt
echo

exit 0
