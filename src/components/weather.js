import React from "react";

class Weather extends React.Component{

    render(){

        return(

            <div className="weather-info">
                {
                    this.props.country && this.props.city && <p className="weather__key">Location:
                        <span className="weather__value">  {this.props.city}, {this.props.country}</span>
                    </p>
                }

                {

                    this.props.temperature && <div><p className="weather__key">Temperature:
                        <span className="weather__value">  {this.props.temperature} {this.props.isTempInCelsius ? 'C' : 'F'}</span>
                    </p></div>
                }

                {
                    this.props.temperatureFeel && <div><p className="weather__key">Temperature Feels:
                        <span className="weather__value">  {this.props.temperatureFeel} {this.props.isTempInCelsius ? 'C' : 'F'}</span>
                    </p></div>
                }

                {
                    this.props.humidity && <p className="weather__key">Humidity:
                        <span className="weather__value">  {this.props.humidity}</span>
                    </p>
                }

                {
                    this.props.description && <p className="weather__key">Conditions:
                        <span className="weather__value">  {this.props.description}</span>
                    </p>
                }

                {
                    this.props.error && <p className="weather__error">{this.props.error}</p>
                }

            </div>
        )
    }
}

export default Weather;
