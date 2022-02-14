#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New deploy'
git push -f git@github.com:b6110401609/my-playlist.git master:gh-pages

cd -