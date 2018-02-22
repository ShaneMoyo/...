import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {  validationFailed: false };
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
    const { handleGetConditions } = this.props;
    if(this.checkZip(zipCode)) {
      this.setState({ validationFailed: false });
      return handleGetConditions(zipCode);
    }
    this.setState({ validationFailed: true });
  };

  render(){
    const { validationFailed } = this.state;
    const { loading } = this.props; 

    const buttonStyle = loading ? 'button is-loading is-small is-white' : 'button is-small is-info';
    const inputStyle = validationFailed ? 'input is-danger is-small' : 'input is-small';

    return(
      <form onSubmit={event => this.handleSubmit(event)}>
        <div className="field">
          <div className="control">
            <input className={inputStyle} type="text" placeholder="enter zip-code" name="zip"/>
            { validationFailed ? <p className="help is-danger">The lenght of zip code must be five digits</p> : null}
          </div>
        </div>
        <button className={buttonStyle} type="submit">Submit</button>
      </form>
    );
  }
}

SelectLocation.propTypes = {
  loading: PropTypes.bool,
  handleGetConditions: PropTypes.func
};

export default SelectLocation;