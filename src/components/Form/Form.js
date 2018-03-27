import React, { Component } from "react";
import Day from "../Day/Day";
import "./Form.css";

class Form extends Component {
    constructor() {
        super();
        this.state = {
            lat: false,
            lon: false,
            weather: {
                icon: null,
                desc: null,
                windspeed: null,
                humidity: null,
                sunrise: null,
                sunset: null,
                tempC: null,
                tempF: null
            },
            main: [],
            forecast: [],
            isF: false
        };
    }

    handleErrors(response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    }

    groupBy(array, property) {
        return array.reduce(function(groups, item) {
            const interval = groups[property];
            groups[interval] = groups[interval] || [];
            groups[interval].push(interval);
            return groups;
        });
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoords.bind(this));

            function getCoords(position) {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    toF() {
        switch (this.state.isF) {
            case true:
                this.setState({
                    isF: false
                });
                break;
            case false:
                this.setState({
                    isF: true
                });
                break;
        }
    }

    getWeather(e) {
        e.preventDefault();
        // const cityname = e.nativeEvent.target.elements[0].value;

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${
                this.state.lat
            }&lon=${
                this.state.lon
            }&APPID=c2646c24f283ab337cddd011d7d75219&units=metric`
        )
            .then(this.handleErrors)
            .then(res => res.json())
            .then(res => {
                let dtSunrise = new Date(res.sys.sunrise * 1000);
                let sunrise =
                    ("0" + dtSunrise.getHours()).substr(-2) +
                    ":" +
                    ("0" + dtSunrise.getMinutes()).substr(-2) +
                    ":" +
                    ("0" + dtSunrise.getSeconds()).substr(-2);
                let dtSunset = new Date(res.sys.sunset * 1000);
                let sunset =
                    ("0" + dtSunset.getHours()).substr(-2) +
                    ":" +
                    ("0" + dtSunset.getMinutes()).substr(-2) +
                    ":" +
                    ("0" + dtSunset.getSeconds()).substr(-2);
                this.setState(
                    {
                        weather: {
                            icon: res.weather[0].icon,
                            desc: res.weather[0].description,
                            windspeed: Math.round(res.wind.speed * 10) / 10,
                            humidity: res.main.humidity,
                            sunrise: sunrise,
                            sunset: sunset,
                            tempC: Math.round(res.main.temp * 10) / 10,
                            tempF:
                                Math.round((res.main.temp * 9 / 5 + 32) * 10) /
                                10
                        }
                    },
                    function() {
                        console.log("Your current state: ", this.state);
                    }
                );
            })
            .catch(function(error) {
                console.log(error);
            });

        fetch(
            `https://api.openweathermap.org/data/2.5/forecast/?lat=${
                this.state.lat
            }&lon=${
                this.state.lon
            }&APPID=c2646c24f283ab337cddd011d7d75219&units=metric`
        )
            .then(this.handleErrors)
            .then(res => res.json())
            .then(res => {
                this.setState(
                    {
                        forecast: res.list
                    },
                    function() {
                        // forecast is now here
                    }
                );
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.lat !== false && this.state.lon !== false ? (
                    <button
                        id="button-getWeather"
                        className="button button-primary"
                        onClick={this.getWeather.bind(this)}
                    >
                        Get Weather
                    </button>
                ) : (
                    <p>Just a sec...</p>
                )}
                {this.state.weather && this.state.weather.icon != null ? (
                    <div className="App-weather">
                        <div id="weather-top">
                            <button
                                id="button-toF"
                                onClick={this.toF.bind(this)}
                            >
                                {this.state.isF === true
                                    ? "Switch to Celsius"
                                    : "Switch to Fahrenheit"}
                            </button>
                            <p>
                                Temperature:{" "}
                                {this.state.isF == true ? (
                                    <span>
                                        {this.state.weather.tempF}&deg; F
                                    </span>
                                ) : (
                                    <span>
                                        {this.state.weather.tempC}&deg; C
                                    </span>
                                )}
                            </p>
                            <p class="weather-desc">
                                {this.state.weather.desc}
                            </p>
                            <div id="weather-icon">
                                <img
                                    src={`http://openweathermap.org/img/w/${
                                        this.state.weather.icon
                                    }.png`}
                                    title="Title goes here"
                                    alt="A weather icon, describing the... weather"
                                />
                            </div>
                        </div>
                        <div id="weather-bot">
                            <p>Windspeed: {this.state.weather.windspeed}m/s</p>
                            <p>Humidity: {this.state.weather.humidity}%</p>
                            <p>Sunrise: {this.state.weather.sunrise}</p>
                            <p>Sunset: {this.state.weather.sunset}</p>
                        </div>
                    </div>
                ) : (
                    <p>
                        Wait for response or use Microsoft Edge (since
                        geolocation is blocked for http)
                    </p>
                )}
                {this.state.forecast && this.state.forecast.length > 0 ? (
                    <div className="App-forecast">
                        {this.state.forecast.map((interval, index) => {
                            return (
                                <Day
                                    key={index}
                                    interval={interval}
                                    isF={this.state.isF}
                                />
                            );
                        })}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Form;
