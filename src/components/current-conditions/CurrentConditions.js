import React, { Component } from 'react';
import superagent from 'superagent';
import LocationView from './LocationView';
import SelectLocation from './SelectLocation';
import TemperatureDifference from './TemperatureDifference';

const API_KEY = process.env.REACT_APP_API_KEY || null;

class CurrentConditions extends Component {
  constructor(){
    super();
    this.state = { 
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
  }

  componentDidMount() {
    const storedLocationA = localStorage.getItem('locationA');
    const storedLocationB = localStorage.getItem('locationB');
    if(storedLocationA) this.getConditions(storedLocationA, 'locationA');
    if(storedLocationB) this.getConditions(storedLocationB, 'locationB');
  }

  getConditions = (zipCode, id) => {
    const url = `http://api.wunderground.com/api/${API_KEY}/conditions/q/${zipCode}.json`;
    const update = this.state[id];
    update.loading = true;
    this.setState({ [id]: update });

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
      })
      .catch(() => {
        this.setState({ [id]: { error: 'Something went wrong. Database not responding', loading: false } });
      });
  }

  render() {
    const { locationA, locationB } = this.state;
    return (
      <div className="container is-fluid" >
        <div className="columns is-multiline is-centered">

          <div className="column is-one-third has-text-centered">
            <LocationView conditions={locationA}/>
            <SelectLocation 
              loading={locationA.loading} 
              handleGetConditions={zipCode => this.getConditions(zipCode, 'locationA')}/>
          </div>

          <div className="column is-one-third has-text-centered">
            <LocationView conditions={locationB}/>
            <SelectLocation 
              loading={locationB.loading} 
              handleGetConditions={zipCode => this.getConditions(zipCode, 'locationB')}/>
          </div>

          <div className="column is-12 has-text-centered">
            <TemperatureDifference
              locationA={locationA.location}
              temperatureA={locationA.temperature}
              locationB={locationB.location} 
              temperatureB={locationB.temperature}/>
          </div>

        </div> 
      </div>
    );
  }
}

export default CurrentConditions;
