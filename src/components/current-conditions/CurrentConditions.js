import React, { Component } from 'react';
import LocationConditions from './LocationConditions';

class CurrentConditions extends Component {

  state = {
    locationA: {
      location: null,
      weather: null,
      temperature: null,
      icon: null,
      error: null,
    },
    locationB: {
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
    const { locationA, locationB } = this.state;
    if(!locationA.temperature || !locationB.temperature) return;
    const temperatureDifference = Math.round((locationA.temperature - locationB.temperature) * 100) / 100;
    this.setState({ temperatureDifference });
  };

  render() {
    const { locationA, locationB, temperatureDifference } = this.state;
    const showTemperatureDifference = locationA.temperature && locationB.temperature;

    return (
      <div className="container is-fluid animated fadeIn" >
        <div className="columns is-centered">

          <LocationConditions id="locationA"
            conditions={locationA} 
            handleLoadConditions={response => this.handleLoadConditions(response)}/>
                
          <LocationConditions id="locationB"
            conditions={locationB}
            handleLoadConditions={response => this.handleLoadConditions(response)}/>

        </div>

        { showTemperatureDifference ? 
          <div className="container has-text-centered">
            <h1 className="title is-4 has-text-grey">
              {`Temperature difference between ${locationA.location} and ${locationB.location}: `}
            </h1>
            <p className="subtitle has-text-info" >{`${temperatureDifference} degrees`}</p>
          </div> : null }
          
      </div>
    );
  }
}

export default CurrentConditions;
