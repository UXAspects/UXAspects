#!/bin/bash

set -e

theme=$1
echo ${FUNCNAME[0]} - theme is $theme
echo ${FUNCNAME[0]} - PWD is $PWD

# Modify the value of assetsUrl in config.json
tmp=$(mktemp)
newURL="https://pages.github.houston.softwaregrp.net/sepg-docs-qa/UXAspects_"$theme"_Theme_CI/assets"
echo newURL is $newURL
jq --arg newURL "$newURL" '.assetsUrl |= $newURL' docs/app/data/config.json > "$tmp" \
    && mv "$tmp" docs/app/data/config.json

exit 0
