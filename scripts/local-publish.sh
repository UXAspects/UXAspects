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
