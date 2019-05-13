This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions

To run this swipeable weather card app you can simply run:

### `npm start`

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Alternatively, you can visit [snaphunt-tech-test hosted on heroku](https://snaphunt-tech-test.herokuapp.com/) to try it live.

Loading the page with chrome-dev-tools on desktop with a mobile emulator or from a mobile web browser enables swipe functionality. When switching between the two, a refresh is required.

## Dependencies

This project uses the following dependencies:

1. SwipeJS (https://swipe.js.org)
2. styled-components (https://www.styled-components.com)
3. axios (https://github.com/axios/axios)
4. OpenWeatherMap API (https://openweathermap.org/api)
5. ReactAnimatedWeather (https://divyanshu013.github.io/react-animated-weather/)

## Options

1. The app automatically scrolls between each weather card every 3s. To disable or edit this, simply remove or edit ```auto={3000}``` from the ```Swipe``` component.
