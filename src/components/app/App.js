import React, { Component } from 'react';
import CurrentConditions from '../current-conditions/CurrentConditions';
import '../../style/mystyle.css';

class App extends Component {

  render() {
    return (
      <div className="container app has-text-centered">
        <header className="title has-text-white">Weather Application</header>
        <hr/>
        <CurrentConditions/>
      </div>
    );  
  }
}

export default App;
