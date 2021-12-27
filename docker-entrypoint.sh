#!/bin/bash
set -eo pipefail

uonpm() {
  echo "Installing npm modules for UO package"
  pushd . >/dev/null
  cd /home/node/primo-explore-devenv/primo-explore/custom/01ALLIANCE_UO-UO
  npm install
  popd >/dev/null
}

# If there's no command, we're running the server with a proxy and view based
# on environment vars
if [[ ${1:0:1} == '' ]]; then
  set -- "--view" "$VIEW" "--proxy" "$PROXY" "$@" "--ve"
fi

# If the command starts with a hyphen, we prepend `gulp run`
if [ "${1:0:1}" = '-' ]; then
  set -- gulp run "$@"
fi

# If we're doing a gulp command, make sure npm is good for the UO package
if [ "${1:0:4}" = "gulp" ]; then
  uonpm
fi

echo "executing $@"
exec "$@"
