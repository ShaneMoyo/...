import React, { Component } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';

const API_KEY = process.env.REACT_APP_API_KEY || null;

class LocationConditions extends Component {

  state = { loading: false, validationFailed: false };

  componentDidMount(){
    const { id } = this.props;
    const storedZip = localStorage.getItem(id);
    if(storedZip) this.getConditions(storedZip);
  }

  checkZip = zipCode => {
    const regex = /^\d{5}$/;
    if(!regex.test(zipCode)){
      return false;
    }
    if(zipCode === ' '){
      return false;
    }
    return true;
  }

  handleSubmit = event => {
    event.preventDefault();
    const { value: zipCode } = event.target.elements.zip;
    if(this.checkZip(zipCode)) {
      this.setState({ validationFailed: false });
      return this.getConditions(zipCode);
    }
    this.setState({ validationFailed: true });
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
          const { weather, temp_f: temperature, icon, display_location } = body.current_observation;
          body = { id, weather, temperature, icon, location: display_location.full };
          localStorage.setItem(id, zipCode);
        }
        handleLoadConditions(body);
        this.setState({ loading: false });
      });
  }

  render(){
    const { weather, temperature, error, icon, location } = this.props.conditions;
    const { loading, validationFailed } = this.state;

    const buttonStyle = loading ? 'button is-loading is-small is-info' : 'button is-outlined is-small is-info';
    const inputStyle = validationFailed ? 'input is-danger is-small' : 'input is-small';

    const view = !error ? 
      <div>
        <h1 class="title is-4 has-text-grey">{location}</h1>
        { icon ? <img src={icon} alt="weather status icon"/> : null}
        <h1 class="title is-4 has-text-grey">{weather}</h1>
        <h1 class="subtitle has-text-info">{temperature}</h1>
        <br/>
      </div> : 
      <div>
        <h1 class="title is-4 has-text-grey">{error}</h1>
      </div>;

    return(
      <div class="column is-one-third has-text-centered">
        <div class="box is-offset-2">
          {view}
          <form onSubmit={event => this.handleSubmit(event)}>
            <div class="field">
              <div class="control">
                <input class={inputStyle} type="text" placeholder="enter zip-code" name="zip"/>
                { validationFailed ? <p class="help is-danger">The lenght of zip code must be five digits</p> : null}
              </div>
            </div>
            <button class={buttonStyle} type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

LocationConditions.propTypes = {
  conditions: PropTypes.object,
  id: PropTypes.string,
  handleLoadConditions: PropTypes.func
};

export default LocationConditions;