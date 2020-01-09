import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";

const Api_Key = "89ef02fa81a33ba892549aa1c220b2fc";

class App extends React.Component {
  constructor() {
    super();
    this.tempChange = this.tempChange.bind(this);
  }

  state = {

    temperature: undefined,
    temperatureFeel: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    isTempInCelsius: 1
  }

  // this.state.isTempInCelsius = True; // Initializing temperature to celsius

  // have a Farenheit to celsius switch
  tempChange = () => {
    if(this.state.isTempInCelsius){
      this.setState({
        temperature: (this.state.temperature * 9 / 5 + 32).toFixed(2),
        temperatureFeel: (this.state.temperatureFeel * 9 / 5 + 32).toFixed(2),
        city: this.state.city,
        country: this.state.country,
        humidity: this.state.humidity,
        description: this.state.description,
        error: this.state.error,
        isTempInCelsius: 0
      })

    }else{
      this.setState({
        temperature: ((this.state.temperature - 32) * 5 / 9).toFixed(2),
        temperatureFeel: ((this.state.temperatureFeel - 32) * 5 / 9).toFixed(2),
        city: this.state.city,
        country: this.state.country,
        humidity: this.state.humidity,
        description: this.state.description,
        error: this.state.error,
        isTempInCelsius: 1
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
                <Form loadWeather={this.getWeather} onClicked={this.tempChange}/>
                  <Weather
                    temperature={this.state.temperature}
                    temperatureFeel={this.state.temperatureFeel}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    isTempInCelsius={this.state.isTempInCelsius}
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
