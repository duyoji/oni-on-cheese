import React from 'react';
import ReactDOM from 'react-dom';
import MapPage from '../../components/MapPage';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';
import * as utilLocation from '../../utils/location';
import sinon from 'sinon';
import socket from '../../socketHandlers/index';

describe('src/components/MapPage.jsx', () => {

  afterAll(() => {
    socket.disconnect();
  });

  it('shows expected page.', () => {
    sinon.stub(utilLocation, 'getCurrentPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);
    });
    sinon.stub(window, 'setInterval').callsFake((cb) => {
      cb();
    });

    const wrapper = shallow( <MapPage
      users={[]}
      roomId=''
      updateCurrentLocation={() => {}}
    /> );

    expect(wrapper.find('.mapPage').length).toEqual(1);

    utilLocation.getCurrentPosition.restore();
    window.setInterval.restore();
  });
});
