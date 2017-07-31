#!/bin/bash

set -e

theme=micro-focus

echo Workspace is $WORKSPACE
echo Build number is $BUILD_NUMBER
echo UID is $UID
echo GROUPS is $GROUPS
echo USER is $USER
echo PWD is $PWD
echo HOME is $HOME

echo Moving to workspace
cd $WORKSPACE/ux-aspects/quantum

latestCommitID=`git rev-parse HEAD`
echo latestCommitID is $latestCommitID

gitPagesRepoName="UXAspects_Micro_Focus_Theme_CI"
clonePagesURL="git@github.houston.softwaregrp.net:sepg-docs-qa/$gitPagesRepoName.git"
ghPagesCommitMessage="Build #$BUILD_NUM Commit $latestCommitID"
stylebookTargetFolder="$WORKSPACE/ux-aspects/stylebook-gh-pages-$theme"
tarBall="stylebook-gh-pages-$theme.tar.gz"

echo gitPagesRepoName is $gitPagesRepoName
echo clonePagesURL is $clonePagesURL
echo ghPagesCommitMessage is $ghPagesCommitMessage
echo stylebookTargetFolder is $stylebookTargetFolder
echo tarBall is $tarBall

# Create target folder
if [ -d "$stylebookTargetFolder/gh-pages" ]; then
    rm -rf $stylebookTargetFolder/gh-pages
fi
mkdir -p $stylebookTargetFolder/gh-pages
cd $stylebookTargetFolder/gh-pages

echo
echo git clone -b gh-pages $clonePagesURL ./
git clone -b gh-pages $clonePagesURL ./
echo
echo git rm -rf .
git rm -rf .
echo
echo tar zxvf $WORKSPACE/ux-aspects/$tarBall -C .
tar zxvf $WORKSPACE/ux-aspects/$tarBall -C .
echo
echo git add .
git add .
echo
echo git commit --allow-empty -m "$ghPagesCommitMessage"
git commit --allow-empty -m "$ghPagesCommitMessage"
echo
echo git push origin
git push origin

echo Update complete
exit 0

