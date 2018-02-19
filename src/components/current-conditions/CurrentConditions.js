import React, { Component } from 'react';
import LocationConditions from './LocationConditions';

class CurrentConditions extends Component {

  state = {
    location1: {
      weather: null,
      temperature: null,
      icon: null,
      error: null,
    },
    location2: {
      weather: null,
      temperature: null,
      icon: null,
      error: null,
    }
  };

  handleLoadConditions = gotConditions => {
    const { id, weather, temperature, icon, error } = gotConditions;
    const update = { ...this.state };
    update[id] = !error ? { weather, temperature, icon: `https://icons.wxug.com/i/c/i/${icon}.gif` } : { error };
    this.setState(update);
  };

  temperatureDifference = () => {
    const currentConditions = Object.values(this.state);
    const intialTemperature = currentConditions.shift().temperature;
    const tempDifference = currentConditions.reduce((total, currentCondition) => {
      const temperature = currentCondition.temperature || 0;
      return total - temperature;
    }, intialTemperature);
    return(Math.round(tempDifference * 100) / 100);
  };

  render() {
    const { location1, location2 } = this.state;
    const temperatureDifference = Object.keys(this.state).length > 1 ? this.temperatureDifference() : 0;
    return (
      
      <div class="container">
        <br/>
        <div class="tile">
          
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-12">
            <div class="tile">

              <article class="tile is-child notification is-info has-text-centered">
                <h4 class="title is-4 has-text-white">Temperature Difference</h4>
                <h2>{temperatureDifference}</h2>
              </article>
         
              <LocationConditions id="location1" 
                error={location1.error}
                icon={location1.icon} 
                weather={location1.weather} 
                temperature={location1.temperature} 
                handleLoadConditions={response => this.handleLoadConditions(response)}/>
                
              <LocationConditions id="location2"
                error={location2.error} 
                icon={location2.icon} 
                weather={location2.weather} 
                temperature={location2.temperature} 
                handleLoadConditions={response => this.handleLoadConditions(response)}/>
               
            </div>
          </div> 
        </div>
        <br/>
      </div>
    );
  }
}

export default CurrentConditions;
