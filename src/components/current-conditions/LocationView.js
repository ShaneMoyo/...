import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LocationView extends Component {

  render(){
    const { weather, temperature, error, icon, location } =this.props.conditions;
    const view = !error ? 
      <div>
        <h1 className="title is-4 has-text-grey">{location ? location : 'Enter a ZIP code for live weather information'}</h1>
        {icon ? <img src={icon}  alt="weather status icon"/> : null}
        <h1 className="title is-4 has-text-grey">{weather}</h1>
        <h1 className="subtitle has-text-info">{temperature && `${temperature} ℉`}</h1>
        <br/>
      </div> : 
      <div>
        <h1 className="title is-6 has-text-danger">{error}</h1>
        <br/>
      </div>;

    return(
      <div className="box is-offset-2"> 
        {view}
      </div>  
    );
  }
}

LocationView.propTypes = {
  conditions: PropTypes.object
};

export default LocationView;