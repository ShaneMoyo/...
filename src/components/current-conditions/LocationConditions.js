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
    const { loading } = this.state;
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
      <div class="tile is-parent is-vertical">
        <div class="tile is-child notification is-info has-text-white has-text-centered">
          <form onSubmit={event => this.handleSubmit(event)}>
            <div class="field has-text-centered">
              <div class="control has-text-centered">
                <input class="input is-medium" type="text" placeholder="enter zip-code" name="zip"/>
              </div>
            </div>
            <button class={loading ? 'button is-loading is-medium is-primary' : 'button is-medium is-primary'} type="submit">Submit</button>
          </form>
          {view}
        </div>
      </div>
    );

  }
}

export default LocationConditions;