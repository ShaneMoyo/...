import React, { Component } from 'react';
import superagent from 'superagent';
const API_KEY = process.env.REACT_APP_API_KEY || null;

class Weather extends Component {

  state = { loading: false }

  handleSubmit = event => {
    event.preventDefault();
    const { value: zipCode } = event.target.elements.zip;
    return this.getWeather(zipCode);
  }

  getWeather = zipCode => {
    this.setState({ loading: true });
    const url = `http://api.wunderground.com/api/${API_KEY}/conditions/q/${zipCode}.json`;
    return superagent.get(url) 
      .then(response => {
        console.log('response', response);
        if(response.body.response.error) {
          response = { id: this.props.id, error: response.body.response.error.description };
        } else {
          const { weather, temp_f: temperature, icon } = response.body.current_observation;
          response = {
            id: this.props.id,
            weather,
            temperature,
            icon
          };
        }
        this.props.loadWeather(response);
        this.setState({ loading: false });
      });
  }

  render(){
    const { weather, temperature, error, icon } = this.props;
    const view = !error ? 
      <div>
        <img src={icon}/>
        <h1>{weather}</h1>
        <h1>{temperature}</h1>
      </div> : 
      <div>
        <h1>{error}</h1>
      </div>;

    return(
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="zip"/>
          <button type="submit">Submit</button>
        </form>
        {view}
      </div>

    );
  }
}

export default Weather;