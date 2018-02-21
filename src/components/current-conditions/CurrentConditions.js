import React, { Component } from 'react';
import superagent from 'superagent';
import LocationConditions from './LocationConditions';

const API_KEY = process.env.REACT_APP_API_KEY || null;

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

  getConditions = (zipCode, id) => {
    const update = this.state[id];
    update.loading = true;
    this.setState({ [id]: update });

    const url = `http://api.wunderground.com/api/${API_KEY}/conditions/q/${zipCode}.json`;
    return superagent.get(url) 
      .then(({ body: gotConditions }) => {
        if(gotConditions.response.error) {
          const { description: error } =  gotConditions.response.error;
          gotConditions = { error };
        } else {
          const { weather, temp_f: temperature, icon, display_location } = gotConditions.current_observation;
          gotConditions = { 
            weather,
            temperature,
            icon: `https://icons.wxug.com/i/c/i/${icon}.gif`,
            location: display_location.full,
            loading: false 
          };
          localStorage.setItem(id, zipCode);
        }
        this.setState({ [id]: gotConditions });
        this.calculateTemperatureDifference();
      })
      .catch(() => {
        this.setState({ [id]: { error: 'Something went wrong. Database not responding', loading: false } });
      });
  }

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
      <div className="container is-fluid" >
        <div className="columns is-centered">

          <LocationConditions
            conditions={locationA} 
            handleGetConditions={zipCode => this.getConditions(zipCode, 'locationA')}/>
                
          <LocationConditions 
            conditions={locationB}
            handleGetConditions={zipCode => this.getConditions(zipCode, 'locationB')}/>

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
