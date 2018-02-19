import React, { Component } from 'react';
import LocationConditions from './LocationConditions';

class CurrentConditions extends Component {

  state = {
    location1: {
      location: null,
      weather: null,
      temperature: null,
      icon: null,
      error: null,
    },
    location2: {
      location: null,
      weather: null,
      temperature: null,
      icon: null,
      error: null,
    }
  };

  handleLoadConditions = gotConditions => {
    const { id, weather, temperature, icon, location, error } = gotConditions;
    const newState = { ...this.state };
    newState[id] = !error ? { weather, temperature, location, icon: `https://icons.wxug.com/i/c/i/${icon}.gif` } : { error };
    this.setState(newState);
    this.calculateTemperatureDifference();
  };

  calculateTemperatureDifference = () => {
    const { location1, location2 } = this.state;
    if(!location1.temperature || !location2.temperature) return;
    const temperatureDifference = Math.round((location1.temperature - location2.temperature) * 100) / 100;
    this.setState({ temperatureDifference });
  };

  render() {
    const { location1, location2, temperatureDifference } = this.state;
    const showTemperatureDifference = location1.temperature && location2.temperature;

    return (
      <div class="container is-fluid" >

        <div class="columns is-centered">

          <LocationConditions id="location1" 
            conditions={location1} 
            handleLoadConditions={response => this.handleLoadConditions(response)}/>
                
          <LocationConditions id="location2"
            conditions={location2}
            handleLoadConditions={response => this.handleLoadConditions(response)}/>

        </div>
        { showTemperatureDifference ? 
          <div class="container has-text-centered">
            <h1 class="title is-4 has-text-grey">
              {`Temperature difference between ${location1.location} and ${location2.location}: `}
            </h1>
            <p class="subtitle has-text-info" >{`${temperatureDifference} degrees`}</p>
          </div> : null }
      </div>
    );
  }
}

export default CurrentConditions;
