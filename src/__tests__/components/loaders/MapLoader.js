import React from 'react';
import { shallow } from '../../helpers/configuredEnzymeWithAdapter';
import MapLoader from '../../../components/loaders/MapLoader';
import { BeatLoader } from 'react-spinners';

describe('src/components/loaders/MapLoader.jsx', () => {
  it('uses `BeatLoader` component of `react-spinners`.', () => {
    const wrapper = shallow( <MapLoader/> );

    expect(wrapper.find(BeatLoader).length).toEqual(1);
  });
});