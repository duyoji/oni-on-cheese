import React from 'react';
import ReactDOM from 'react-dom';
import MapPage from '../../components/MapPage';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';


describe('src/components/MapPage.jsx', () => {
  it('shows expected page.', () => {
    const wrapper = shallow( <MapPage /> );

    expect(wrapper.find('.mapPage').length).toEqual(1);
  });
});
