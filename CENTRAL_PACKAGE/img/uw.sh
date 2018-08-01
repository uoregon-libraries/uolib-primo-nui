#! /bin/bash

URL_BASE=https://alliance-primo.hosted.exlibrisgroup.com/primo-explore/custom/UW/img

for f in *.png
do
	echo "${URL_BASE}/${f}"
	echo "${f}-2"
	curl "${URL_BASE}/${f}" -o "${f}-2"
done

