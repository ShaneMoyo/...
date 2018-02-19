import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CurrentConditions from '../components/current-conditions/CurrentConditions';
import LocationConditions from '../components/current-conditions/LocationConditions';

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

  it('should render LocationConditions component', () => {
    const wrapper = shallow(<LocationConditions conditions={conditions}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

});