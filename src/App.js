import React, { Component } from 'react';
import Weather from './Weather';



class App extends Component {

  state = {}

  difference = () => {
    const windows = Object.values(this.state);
    const base = windows.shift().temperature;
    const difference = windows.reduce((total, window) => {
      const temp = window.temperature || 0;
      return total - temp;
    }, base);
    return (Math.round(difference * 100) / 100);
  }
  
  handleGet = (response) => {
    const update = { ...this.state };
    const { id, weather, temperature, icon, error } = response;
    update[id] = !error ? { weather, temperature, icon: `https://icons.wxug.com/i/c/i/${icon}.gif` } : { error };
    this.setState(update);
  }

  render() {
    const { window1, window2 } = this.state;
    const temperatureDifference = Object.keys(this.state).length > 1 ? this.difference() : 0;
    return (
      <div>
        <h1>Temperature Difference</h1>
        <h1>{temperatureDifference}</h1>
        <Weather id="window1" error={window1 ? window1.error : null} icon={window1 ? window1.icon : null} weather={window1 ? window1.weather : null} temperature={window1 ? window1.temperature : null} loadWeather={response => this.handleGet(response)}/>
        <Weather id="window2" error={window2 ? window2.error : null} icon={window2 ? window2.icon : null} weather={window2 ? window2.weather : null} temperature={window2 ? window2.temperature : null} loadWeather={response => this.handleGet(response)}/>
      </div>
    );
  }
}

export default App;
