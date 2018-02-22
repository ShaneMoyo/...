import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentConditions from '../components/current-conditions/CurrentConditions';
import LocationView from '../components/current-conditions/LocationView';
import SelectLocation from '../components/current-conditions/SelectLocation';
import TemperatureDifference from '../components/current-conditions/TemperatureDifference';

const conditions = { 
  location: 'test',
  weather: 'test',
  temperature: 70,
  icon: null,
  error: null
};

describe('component snapshot tests', () => {

  it('should render CurrentConditions component', () => {
    const wrapper = shallow(<CurrentConditions/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render LocationView component', () => {
    const wrapper = shallow(<LocationView conditions={conditions}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render SelectLocation component', () => {
    const wrapper = shallow(<SelectLocation loading={false}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should render TemperatureDifference component', () => {
    const wrapper = shallow(
      <TemperatureDifference 
        temperatureA={30}
        temperatureB={40} 
        locationA={'test'} 
        locationB={'test'}/>
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});