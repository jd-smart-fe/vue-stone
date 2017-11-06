#! /usr/bin/env bash

git checkout gh-pages
git merge -Xtheirs master -m "Merge master into gh-pages"
git push
git checkout master
