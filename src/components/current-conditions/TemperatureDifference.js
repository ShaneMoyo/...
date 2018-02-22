import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TemperatureDifference extends Component {
  constructor(props) {
    super(props);
    this.state = { temperatureDifference: null };
  }

  componentWillReceiveProps(props){
    const { temperatureA, temperatureB } = props;
    if(!temperatureA || !temperatureB) return;
    const temperatureDifference = Math.round((temperatureA - temperatureB) * 100) / 100;
    this.setState({ temperatureDifference });
  }

  render(){
    const { temperatureA, temperatureB, locationA, locationB } = this.props;
    const { temperatureDifference } = this.state;
    
    const view = (temperatureA && temperatureB) ? 
      <div className="container has-text-centered">
        <h1 className="title is-4 has-text-grey">
          {`Temperature difference between ${locationA} and ${locationB}: `}
        </h1>
        <p className="subtitle has-text-info" >{`${temperatureDifference} degrees`}</p>
      </div> : null;

    return view;
  }
}

TemperatureDifference.propTypes = {
  temperatureA: PropTypes.number,
  temperatureB: PropTypes.number,
  locationA: PropTypes.string,
  locationB: PropTypes.string,
  handleGetConditions: PropTypes.func
};

export default TemperatureDifference;