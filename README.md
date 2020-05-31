# Memory Game

In this game, a player is presented with a number of cards. Each card has a number on one side and
is blank (empty) from the other side. To start the game, the player is asked to choose the number
of cards to play (4, 8 or 12). After that, they will see the cards on the screen with random numbers
displayed on them and one button “Play”.
When they click the play button, cards should be flipped to the blank side. The player is then asked
to click on the cards in ascending order of the numbers that are on the other side.

## Project setup

This app is divided into backend and frontend. There is one service for each of them.

The backend will provide data for the frontend. If the backend is not available, the frontend can still
show content to the user, but it will be always the same.

### Backend

The backend is built with node and express having jest and supertest as a dev dependency to run
endpoint tests.
It will be running on the port 3000, so it needs to be available.

### Frontend

The frontend was built via [vue-cli](https://cli.vuejs.org/) using it's installed dependencies.
It will be running on the port 8080, so it needs to be available.

## Dependencies

To run this project you will need to have Node and Yarn locally installed as a first option.

It is possible to also use docker for it, and you'll need docker and docker compose.

## Usage

After running these commands, both apps should be available on:
* Backend: `http://localhost:3000`
* Frontend: `http://localhost:8080`

Running with Node and Yarn
* in the backend folder:
    * `node server.js`
    * it is also possible to run tests with `yarn run test`
* in the frontend folder:
    * `yarn run serve` - this will make available a dev version which has a hot reload in case code is updated
    * it is also possible to run tests with `yarn run test:unit`
    
Running with docker compose
* on the root folder:
    * `docker-compose run up -d --build`
    * this will build both images and should make them available on the same urls as the previous step.
    * the frontend here will be available as a build version from the dist folder that will be created during the build step
    
* to run the tests (note: this will be slower than running locally)
    * after both images are available
    * Frontend: ` docker-compose run --rm memory-game-frontend yarn run test:unit`
    * Frontend: ` docker-compose run --rm memory-game-backend yarn run test`
    
    
    

