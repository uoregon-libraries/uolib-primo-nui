#!/bin/bash

BASE_URL="https://alliance-primo.hosted.exlibrisgroup.com/primo-explore/custom/CENTRAL_PACKAGE/"
export BASE_URL

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
# Executing in host context
if [ -d "$DIR/../CENTRAL_PACKAGE" ]; then
  srcDef="$DIR/../CENTRAL_PACKAGE"
fi
# Executing in container context
if [ -d "$DIR/../primo-explore-devenv/primo-explore/custom/CENTRAL_PACKAGE" ]; then
  srcDef="$DIR/../primo-explore-devenv/primo-explore/custom/CENTRAL_PACKAGE"
fi

# Accept first arg as central package base directory
src=${1:-$srcDef}

# For each file in the central package directory, download a new copy from prod
cd $src
find -type f -exec sh -c 'echo "downloading: $BASE_URL$0" && echo "  Into: $(pwd)/$0" && curl "$BASE_URL$0" -o "$(pwd)/$0"' {} \;
