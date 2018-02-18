import React, { Component } from 'react';
import superagent from 'superagent';
const API_KEY = process.env.REACT_APP_API_KEY || null;

class LocationConditions extends Component {

  state = { loading: false };

  handleSubmit = event => {
    event.preventDefault();
    const { value: zipCode } = event.target.elements.zip;
    return this.getConditions(zipCode);
  };

  getConditions = zipCode => {
    this.setState({ loading: true });
    const url = `http://api.wunderground.com/api/${API_KEY}/conditions/q/${zipCode}.json`;
    const { id, handleLoadConditions } = this.props;

    return superagent.get(url) 
      .then(({ body }) => {
        if(body.response.error) {
          const { description: error } =  body.response.error;
          body = { id, error };
        } else {
          const { weather, temp_f: temperature, icon } = body.current_observation;
          body = { id, weather, temperature, icon };
        }
        handleLoadConditions(body);
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

export default LocationConditions;