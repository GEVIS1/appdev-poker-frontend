# [Currently in the very early stages! Breakage is expected.](https://en.wiktionary.org/wiki/infancy#Noun)

# This is the repo for a online multiplayer poker game application 🃏♠
It is built using react for the front-end with state management and authentication handled by firebase

## Instructions:
1. Clone this repo
2. `npm i`
3. `npm run dev`
4. Play!

## This repo is configured to fire pre-commit hooks through husky
When npm i is installed and the prepare stage happens it installs husky.
Husky will configure the pre-commit hook which runs lint-staged.
When lint-staged fires it runs prettier to automagically format the code,
and then it checks for rule violations with eslint.
If the code is not up to the airbnb standards the commit will be denied.

The configuration for this was inspired by [this](https://github.com/pappijx/Vite-react-eslint-prettier-husky-setup/blob/master/readme.md) post.

Credits:
Spinner SVG: https://www.svgrepo.com/svg/69294/poker-chip
