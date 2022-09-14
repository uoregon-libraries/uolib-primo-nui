#!/bin/bash

echo $1

if [[ $1 == 'bash' ]]; then
  exec bash
  exit 0
fi

jscodeshift -t /var/local/codeshift/transform.js /var/local/custom/01ALLIANCE_UO-UO/js/
