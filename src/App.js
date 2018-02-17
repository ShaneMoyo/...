import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const apiKey = process.env.REACT_APP_OMDB_API_KEY;
console.log('apikey', apiKey)

class App extends Component {

  state = {
    items: [],
    loading: false,
  }
  
  async loadResource(zip){
    this.setState({ loading: true });
    const url = `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;
    console.log('url.................', url);
    const response = await fetch(url);
    let body = await response.json();
    body.Error ? body = [] : body = body.Search;
    console.log('responseeeeeeeeeee', body);
    this.setState({
      items: body,
      loading: false
    });
  }

  componentDidMount(){
    this.loadResource('97008');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
