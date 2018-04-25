#! /usr/bin/env bash

git checkout gh-pages
git merge -Xtheirs master -m "Merge branch master into branch gh-pages"
git push
git checkout master
