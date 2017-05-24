#!/bin/bash
set -e

NextVersion=$1
echo ${FUNCNAME[0]} - NextVersion is $NextVersion
echo ${FUNCNAME[0]} - PWD is $PWD

# Read the bower.json name attribute
bn=`jq '.name' bower.json`
# Remove multiple characters " and ,
bowerName="$(sed 's/[",]//g' <<< "$bn")";
bowerName=$(echo $bowerName|tr -d '\n')
echo "Bower name = $bowerName"
# Write the name to a text file to be read later
rm -f bowerName.txt
echo $bowerName > bowerName.txt

# Bump up the version in the Bower package.json
tmp=$(mktemp)
jq --arg NextVersion $NextVersion '.version |= $NextVersion' package.json > "$tmp" && mv "$tmp" package.json
newPackageVersion=`jq '.version' package.json`
echo newPackageVersion is $newPackageVersion
if [[ $newPackageVersion == *"$NextVersion"* ]]
then
   echo "Updated package.json with $NextVersion"
else
   echo "ERROR: package.json isn't updated with $NextVersion"
   exit 1
fi

# Bump up the version in the NPM package.json
tmp=$(mktemp)
jq --arg NextVersion $NextVersion '.version |= $NextVersion' src/package.json > "$tmp" && mv "$tmp" src/package.json
newNPMPackageVersion=`jq '.version' src/package.json`
echo newNPMPackageVersion is $newNPMPackageVersion
if [[ $newNPMPackageVersion == *"$NextVersion"* ]]
then
   echo "Updated NPM package.json with $NextVersion"
else
   echo "ERROR: NPM package.json isn't updated with $NextVersion"
   exit 1
fi

# Bump up the version in footer-navigation.json and landing-page.json
tmp=$(mktemp)
NewLinkTitle="Currently v"$NextVersion
echo NewLinkTitle is $NewLinkTitle
jq --arg NewLinkTitle "$NewLinkTitle" '.columns[0].links[0].title |= $NewLinkTitle' docs/app/data/footer-navigation.json > "$tmp" \
    && mv "$tmp" docs/app/data/footer-navigation.json
NewLinkTitle=`jq '.columns[0].links[0].title' docs/app/data/footer-navigation.json`
echo New footer title is $NewLinkTitle
if [[ $NewLinkTitle == *"$NewLinkTitle"* ]]
then
   echo "Updated footer-navigation.json with $NewLinkTitle"
else
   echo "ERROR: footer-navigation.json isn't updated with $NewLinkTitle"
   exit 1
fi

tmp=$(mktemp)
NewVersion="Currently v"$NextVersion
echo NewVersion is $NewVersion
jq --arg NewVersion "$NewVersion" '.brand.version |= $NewVersion' docs/app/data/landing-page.json > "$tmp" \
    && mv "$tmp" docs/app/data/landing-page.json
NewVersion=`jq '.brand.version' docs/app/data/landing-page.json`
echo New landing page version is $NewVersion
if [[ $NewVersion == *"$NextVersion"* ]]
then
   echo "Updated NPM landing-page.json with $NewVersion"
else
   echo "ERROR: NPM landing-page.json isn't updated with $NewVersion"
   exit 1
fi

# Bump up the version in the HPE bower.json
tmp=$(mktemp)
jq --arg NextVersion $NextVersion '.version |= $NextVersion' HPEThemeFiles/ux-aspects-hpe-master/bower.json > "$tmp" \
    && mv "$tmp" HPEThemeFiles/ux-aspects-hpe-master/bower.json
HPEBowerVersion=`jq '.version' HPEThemeFiles/ux-aspects-hpe-master/bower.json`
echo HPEBowerVersion is $HPEBowerVersion
if [[ $HPEBowerVersion == *"$NextVersion"* ]]
then
   echo "Updated HPE bower.json with $NextVersion"
else
   echo "ERROR: HPE bower.json isn't updated with $NextVersion"
   exit 1
fi

exit 0