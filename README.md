# Oni On Cheese

鬼(👹) on 地図(🗺) - Tag Game

https://oni-on-cheese.herokuapp.com/

## Summary
This app, "Oni On Cheese", is that people can play tag in large area with google maps.
Users can see each user's marker of location on google maps.

## Techs in this app.

- Front-end
  - React, Redux
    - Functionalities
      - react-google-maps, react-redux, react-router-dom, redux-thunk
    - Design
      - reactstrap, react-spinners
    - Others
      - react-scripts
  - LocalStorage (For saving username on local machine.)
  - Geolocation API (To get users' location.)
  - Socket.io (To communicate with others in real time.)
  - Test
    - Jest (Testing framework.)
    - Sinon (For making mock objects/functions.)
    - Enzyme (For components test.)
- Back-end
  - Express (Web framework.)
  - Socket.io, Socket.io-redis
  - Redis (To store data and using it as pub/sub feature.)
  - Babel (To write code in ES6/7 way.)
  - Heroku
    - Deploy this app.
    - CI/CD
    - Bot
      - When issues and pull requests are created, updated and deleted, Sending the information to Slack. (Our dev channel.
  - Test
    - Jest
    - Sinon


## Set Up

To install dependencies.
```javascript
$ yarn install
```

To start server in dev environment (Backend)
```javascript
$ yarn server:dev
```

To start dev server (For frontend. (React))
```javascript
$ yarn hack
```

To create production files.
```javascript
$ yarn build
```

To run all tests (front-end and back-end).
```javascript
$ yarn jest
```

To run eslint to lint files under `src` and `server` directories.
```javascript
$ yarn eslint
```

## Future To-Dos

- Show “👹” icon instead of a normal marker to indicates who is “Oni” now.
- Be able to set room name.
- Show only rooms that includes at least 1 member.
- SNS authentication to get the user’s icon and use that instead of markers.
- Set Game Timer to make this app more game.
- Create some items that has some abilities. (Invisible, Invincible, etc)


## Team
Ryuta, Tsuyoshi