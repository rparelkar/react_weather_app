import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";

const Api_Key = "89ef02fa81a33ba892549aa1c220b2fc";
let tempToggleCelsius = 1;

class App extends React.Component {

  state = {

    temperature: undefined,
    temperatureFeel: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  
  // have a Farenheit to celsius switch
  tempChange = () => {
    console.log("Inside temp change");
    if(tempToggleCelsius){
      this.setState({
        temperature: (this.state.temperature * 9 / 5 + 32),
        temperatureFeel: (this.state.temperatureFeel * 9 / 5 + 32),
        city: this.state.city,
        country: this.state.country,
        humidity: this.state.humidity,
        description: this.state.description,
        error: this.state.error
      })
    }else{
      this.setState({
        temperature: (this.state.temperature - 32) * 5 / 9,
        temperatureFeel: (this.state.temperatureFeel - 32) * 5 / 9,
        city: this.state.city,
        country: this.state.country,
        humidity: this.state.humidity,
        description: this.state.description,
        error: this.state.error
      })
    }
  }
  getWeather = async (e) => {
    console.log("Inside get weather");
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();
    console.log(response);
    if(city && country){
      this.setState({
        temperature: (response.main.temp-273.15).toFixed(2),
        temperatureFeel: (response.main.feels_like-273.15).toFixed(2),
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  render() {

    return (

      <div>
         <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    temperatureFeel={this.state.temperatureFeel}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default App;
