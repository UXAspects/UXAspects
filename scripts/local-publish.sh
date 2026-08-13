#
# Copyright 2015-2026 Micro Focus or one of its affiliates.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# #!/bin/bash

# Prompt the user for a version number
read -p "Enter the version number: " version

# Verdaccio server URL
VERDACCIO_URL="http://localhost:4873"

# Specify the package names to unpublish
packages_to_unpublish=(
    "@ux-aspects/ux-aspects"
    "@ux-aspects/ux-aspects-docs"
)

# Loop through each package and unpublish the specified packages
for package_to_unpublish in "${packages_to_unpublish[@]}"; do
  echo "Unpublishing package: $package_to_unpublish"
  npm unpublish "$package_to_unpublish@$version" --force --registry $VERDACCIO_URL
done

# Run the build tasks
npx grunt build:local-registry

# Run yarn pack in the specified folders
dist_folders=(
    "dist/library"
    "."
)

for folder in "${dist_folders[@]}"; do
    (cd "$folder" && yarn pack && yarn publish --registry http://localhost:4873 --new-version $version --no-git-tag-version -f)
done

# a tgz file is created in the root of the project, we no longer need this, so remove it
rm ux-aspects-ux-aspects-docs-*.tgz
