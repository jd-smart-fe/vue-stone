#! /usr/bin/env bash

git checkout gh-pages
git merge -Xtheirs master -m "Merge master into gh-pages"
git checkout master
