#!/bin/bash

# Run the UX Aspects Build Env Image locally
dockerCommand="docker run --rm -it \
    -e \"http_proxy=$HTTP_PROXY\" \
    -e \"https_proxy=$HTTPS_PROXY\" \
    -v \"$(pwd -W)\"://wd \
    -w //wd \
    --entrypoint //bin/bash \
    uxaspects/buildenv:latest"

# Run the docker image
eval $dockerCommand