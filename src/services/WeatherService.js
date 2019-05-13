import axios from "axios";

const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_WEATHER_API_KEY = "61d7fd8b515c68d6a86e12fa4e54f809";
const OPEN_WEATHER_IMG_URL = "http://openweathermap.org/img/w";

const getWeather = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response && response.status === 200) {
          const { main, icon } = response.data.weather[0];
          const { temp, temp_min, temp_max, humidity } = response.data.main;
          const { speed } = response.data.wind;
          const { all } = response.data.clouds;
          const { lon, lat } = response.data.coord;
          const { dt, name } = response.data;
          resolve({
            condition: main,
            date: new Date(dt * 1000),
            icon: `${OPEN_WEATHER_IMG_URL}/${icon}.png`,
            location: {
              name: name,
              latitude: lat,
              longitude: lon
            },
            temperature: {
              current: temp,
              minimum: temp_min,
              maximum: temp_max,
              humidity: humidity
            },
            speed: speed,
            cloudiness: all
          });
        } else {
          reject("Weather data not found");
        }
      })
      .catch(error => reject(error.message));
  });
};

class WeatherService {
  getCurrentWeatherByCity(city, country_code) {
    const url = `${OPEN_WEATHER_BASE_URL}/weather?appid=${OPEN_WEATHER_API_KEY}&q=${city},${country_code}&units=metric`;
    return getWeather(url);
  }
}

export { WeatherService };
