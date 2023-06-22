# Deployed application
[![QR Code pointing to deployed website](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://project-23s1-gevis1.web.app)](https://project-23s1-gevis1.web.app/)

https://project-23s1-gevis1.web.app/

# This is the repo for a online multiplayer poker game application 🃏♠
It is built using react for the front-end with state management and authentication handled by firebase

## Instructions:
1. Clone this repo
2. `npm i`
3. `npm run dev`
4. Play!

## Screenshots
The game is responsive and has interfaces for desktop and mobile play.

![desktop](https://github.com/BIT-Advanced-App-Dev/project-23s1-GEVIS1/assets/79884124/96678bb1-5ca3-4ddc-97e7-5f012d1c092c)

![mobile](https://github.com/BIT-Advanced-App-Dev/project-23s1-GEVIS1/assets/79884124/ab0db078-914f-41e6-a061-e079293fade9)


## This repo is configured to fire pre-commit hooks through husky
When npm i is installed and the prepare stage happens it installs husky.
Husky will configure the pre-commit hook which runs lint-staged.
When lint-staged fires it runs prettier to automagically format the code,
and then it checks for rule violations with eslint.
If the code is not up to the airbnb standards the commit will be denied.

The configuration for this was inspired by [this](https://github.com/pappijx/Vite-react-eslint-prettier-husky-setup/blob/master/readme.md) post.

Credits:
Spinner SVG: https://www.svgrepo.com/svg/69294/poker-chip
Hamburger menu SVG: https://www.svgrepo.com/svg/86620/poker-pieces
