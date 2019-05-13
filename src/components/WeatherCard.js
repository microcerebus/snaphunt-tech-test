import React, { Component } from "react";
import styled from "styled-components";
import { WeatherService } from "../services/WeatherService.js";
import logo from "../img/logo.png";
import refresh from "../img/refresh.png";
import humidity from "../img/humidity.svg";
import visibility from "../img/visibility.svg";
import windspeed from "../img/windspeed.svg";
import ReactAnimatedWeather from "react-animated-weather";

const weatherService = new WeatherService();

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const NormalText = styled.h2`
  font-family: HelveticaNeue;
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
`;

const TemperatureText = styled(NormalText)`
  font-size: 42.4px;
  font-weight: normal;
`;

const MonthText = styled(NormalText)`
  margin: 0px;
  margin-left: 7px;
  font-size: 11px;
  font-weight: bold;
`;

const DateText = styled(NormalText)`
  margin: 0px;
  margin-left: 7px;
  font-size: 30px;
  font-weight: bold;
`;

const CountryText = styled(NormalText)`
  font-size: 11px;
  opacity: 0.6;
  font-weight: normal;
`;

const InfoText = styled(NormalText)`
  margin-left: 0px;
  font-size: 11px;
  font-weight: normal;
`;

const SnaphuntLogo = styled.img`
  width: 30px;
  height: 25px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Refresh = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
`;

const DateBox = styled.div`
  height: 60px;
  width: 60px;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Card = styled.div`
  width: 315px;
  height: 375px;
  border-radius: 15px;
  box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
`;
const LiveLogo = styled.div`
  width: 315px;
  height: 135px;
  margin-top: 50px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoBar = styled.div`
  width: 315px;
  height: 80px;
  background-color: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const BottomBar = styled.div`
  width: 315px;
  height: 85px;
  background-color: #2e3335;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DotRow = styled.div`
  width: 315px;
  height: 25px;
  background-color: #2e3335;
  border-radius: 0px 0px 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilledDot = styled.div`
  height: 7px;
  width: 7px;
  margin: 5px;
  border-radius: 100%;
  border: solid 1.6px #ffffff;
  background-color: #ffffff;
`;
const EmptyDot = styled.div`
  height: 7px;
  width: 7px;
  margin: 5px;
  border-radius: 100%;
  border: solid 1.6px #ffffff;
  opacity: 0.3;
`;

export default class WeatherCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    return weatherService
      .getCurrentWeatherByCity(this.props.location, this.props.code)
      .then(weather => {
        this.setState(() => ({ weather: weather }));
      })
      .catch(error => console.log(error));
  };

  getMonth = () => {
    const date = new Date();
    return date.getMonth();
  };

  getDate = () => {
    const date = new Date();
    return date.getDate();
  };

  createDots = () => {
    let dots = [];
    for (let i = 0; i < 3; i++) {
      if (i === this.props.page) {
        dots.push(<FilledDot key={i} />);
      } else {
        dots.push(<EmptyDot key={i} />);
      }
    }
    return dots;
  };

  render() {
    const month = this.getMonth();
    const date = this.getDate();

    const { current } = this.state.weather
      ? this.state.weather.temperature
      : "25";

    let setWeatherIcon = (condition, cloudiness) => {
      const clouds = cloudiness;
      const hours = new Date().getHours();
      let day = hours >= 18 || hours < 6 ? false : true;

      if (condition === "Clouds") {
        if (clouds > 75) {
          return "CLOUDY";
        } else if (day) {
          return "PARTLY_CLOUDY_DAY";
        } else {
          return "PARTLY_CLOUDY_NIGHT";
        }
      }
      if (condition === "Clear") {
        if (day) {
          return "CLEAR_DAY";
        } else {
          return "CLEAR_NIGHT";
        }
      }
      if (condition === "Rain") {
        return "RAIN";
      }
      if (condition === "Fog" || "Mist" || "Haze" || "Smoke") {
        return "FOG";
      }
      if (condition === "Snow") {
        return "SNOW"
      }
    };

    let setWeatherText = condition => {
      if (condition === "Clouds") {
        return "Cloudy Skies";
      }
      if (condition === "Dust") {
        return "Dusty Skies";
      }
      if (condition === "Clear") {
        return "Clear Skies";
      }
      if (condition === "Rain") {
        return "Heavy Rain";
      }
      if (condition === "Fog") {
        return "Foggy Skies";
      }
      if (condition === "Mist") {
        return "Misty Skies";
      }
      if (condition === "Haze") {
        return "Hazy Skies";
      }
      if (condition === "Smoke") {
        return "Smoky Skies";
      }
      if (condition === "Snow") {
        return "It's Snowing!";
      }
    };

    return this.state.weather ? (
      <Card>
        <SnaphuntLogo src={logo} alt={"logo"} />
        <Refresh
          onClick={() => this.getWeather()}
          src={refresh}
          alt={"refresh"}
        />
        <LiveLogo>
          <ReactAnimatedWeather
            icon={setWeatherIcon(
              this.state.weather.condition,
              this.state.weather.cloudiness
            )}
            size={130}
          />
        </LiveLogo>
        <InfoBar bgColor={this.props.bgColor}>
          <TemperatureText>{`${Math.round(current)}º`}</TemperatureText>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <NormalText style={{ margin: "1px", color: "white" }}>
              {setWeatherText(this.state.weather.condition)}
            </NormalText>
            <CountryText style={{ margin: "1px", marginLeft: "3px" }}>
              {this.props.location}
            </CountryText>
          </div>
          <DateBox>
            <MonthText>{months[month]}</MonthText>
            <DateText>{date}</DateText>
          </DateBox>
        </InfoBar>
        <BottomBar>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <img
              style={{ marginRight: "10px" }}
              src={windspeed}
              alt="wind speed"
            />
            <InfoText>{`${this.state.weather.speed}m/s`}</InfoText>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <img
              style={{ marginRight: "10px" }}
              src={humidity}
              alt="humidity"
            />
            <InfoText>{`${this.state.weather.temperature.humidity}%`}</InfoText>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <img
              style={{ marginRight: "10px" }}
              src={visibility}
              alt="visibility"
            />
            <InfoText>{`${100 - this.state.weather.cloudiness}%`}</InfoText>
          </div>
        </BottomBar>
        <DotRow>{this.createDots()}</DotRow>
      </Card>
    ) : null;
  }
}
