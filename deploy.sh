set -e

yarn run build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f https://github.com/ONIME228/vue-final-project.git master:gh-pages

cd -