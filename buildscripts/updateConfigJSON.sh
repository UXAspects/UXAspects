#!/bin/bash

set -e

theme=$1
echo "$0" - theme is $theme
echo "$0" - PWD is $PWD

# Create a modified version of config.json with a new assetsUrl value
rm -f jqFilter
echo ".assetsUrl=\"https://pages.github.hpe.com/sepg-docs-qa/UXAspects_"$theme"_Theme_CI/assets\"" > jqFilter
cat docs/app/data/config.json | jq -f jqFilter > docs/app/data/config_updated.json

# Replace config.json with the modified version
rm -f docs/app/data/config.json
mv docs/app/data/config_updated.json docs/app/data/config.json
rm -f jqFilter

exit 0
