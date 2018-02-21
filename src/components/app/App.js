import React, { Component } from 'react';
import CurrentConditions from '../current-conditions/CurrentConditions';
import '../../style/mystyle.css';

class App extends Component {

  render() {
    return (
      <div className="container app has-text-centered">
        <h1 className="title has-text-white">Weather Application</h1>
        <hr/>
        <CurrentConditions/>
      </div>
    );  
  }
}

export default App;
