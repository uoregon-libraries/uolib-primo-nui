#!/usr/bin/env bash
set -eu

if [[ ! -d ./ve-central-package ]]; then
  git clone https://github.com/alliance-pcsg/ve-central-package.git
fi

cd ve-central-package
git pull
cd ..

rm -rf ./custom/CENTRAL_PACKAGE/
cp -r ./ve-central-package/01ALLIANCE_NETWORK-CENTRAL_PACKAGE/ custom/CENTRAL_PACKAGE
