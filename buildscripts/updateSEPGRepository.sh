#!/bin/bash

set -e

theme=$1

echo Workspace is $WORKSPACE
echo Build number is $BUILD_NUMBER
echo Theme is $theme
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Moving to workspace
cd $WORKSPACE/ux-aspects

latestCommitID=`git rev-parse HEAD`
echo latestCommitID is $latestCommitID

gitPagesRepoName="UXAspects_$1_Theme_CI"
clonePagesURL="git@github.houston.softwaregrp.net:sepg-docs-qa/$gitPagesRepoName.git"
ghPagesCommitMessage="Build #$BUILD_NUM Commit $latestCommitID"
docsTargetFolder="$WORKSPACE/ux-aspects/docs-gh-pages-$theme"
tarBall="docs-gh-pages-$theme.tar.gz"

echo gitPagesRepoName is $gitPagesRepoName
echo clonePagesURL is $clonePagesURL
echo ghPagesCommitMessage is $ghPagesCommitMessage
echo docsTargetFolder is $docsTargetFolder
echo tarBall is $tarBall

# Create target folder
if [ -d "$docsTargetFolder/gh-pages" ]; then
    rm -rf $docsTargetFolder/gh-pages
fi
mkdir -p $docsTargetFolder/gh-pages
cd $docsTargetFolder/gh-pages

echo
echo git clone -b gh-pages $clonePagesURL ./
git clone -b gh-pages $clonePagesURL ./
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git clone failed, returned $exitCode"
    exit 1
fi

echo
echo git rm -rf .
git rm -rf .
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git rm failed, returned $exitCode"
    exit 1
fi

echo
echo tar zxvf $WORKSPACE/ux-aspects/$tarBall -C .
tar zxvf $WORKSPACE/ux-aspects/$tarBall -C .

echo
echo git add .
git add .
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git add failed, returned $exitCode"
    exit 1
fi

echo
echo git commit --allow-empty -m "$ghPagesCommitMessage"
git commit --allow-empty -m "$ghPagesCommitMessage"
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git commit failed, returned $exitCode"
    exit 1
fi

echo
echo git push origin
git push origin
exitCode=$?
if [ "$exitCode" -ne 0 ]; then
    echo "=== git push failed, returned $exitCode"
    exit 1
fi

echo Update complete
exit 0

