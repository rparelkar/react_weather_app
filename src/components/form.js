import React from "react";

class Form extends React.Component{

    render(){

        return(
          <div>
                <form onSubmit = {this.props.loadWeather}>
                    <input type="text" name="city" placeholder="City..."/>
                    <input type="text" name="country" placeholder="Country..."/>
                    <button>Get Weather</button>
                </form>
                <button onClick = {this.tempChange}>Farenheit/Celsius</button>


          </div>
        )
    }
}

export default Form;
