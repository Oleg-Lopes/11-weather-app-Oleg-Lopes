import React, { Component } from "react";
import "./Day.css";

class Day extends Component {
    render() {
        return (
            <div className="row">
                <div className="small-10 small-centered column">
                    <div className="forecast-container">
                        <h4>
                            <span>
                                {new Date(
                                    this.props.interval.dt_txt.substr(0, 10)
                                ).toLocaleDateString("en-EN", {
                                    weekday: "long"
                                })}
                            </span>
                            {" at "}
                            {this.props.interval.dt_txt.substr(11)}{" "}
                        </h4>
                        <div className="row collapse">
                            <div className="small-10 medium-9 column">
                                <img
                                    src={`http://openweathermap.org/img/w/${
                                        this.props.interval.weather[0].icon
                                    }.png`}
                                    title="Title goes here"
                                    alt="A weather icon, describing the... weather"
                                />
                                <br />
                                <span>
                                    {this.props.isF == true ? (
                                        <span>
                                            {Math.round(
                                                (this.props.interval.main.temp *
                                                    9 /
                                                    5 +
                                                    32) *
                                                    10
                                            ) / 10}
                                            &deg; F
                                        </span>
                                    ) : (
                                        <span>
                                            {Math.round(
                                                this.props.interval.main.temp *
                                                    10
                                            ) / 10}
                                            &deg; C
                                        </span>
                                    )}
                                </span>
                                <br />
                                <span>
                                    {this.props.interval.weather[0].description}
                                </span>
                                <br />
                                Wind speed{" "}
                                {Math.round(
                                    this.props.interval.wind.speed * 10
                                ) / 10}{" "}
                                m/s
                                <br />
                                Humidity {this.props.interval.main.humidity} %
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Day;
