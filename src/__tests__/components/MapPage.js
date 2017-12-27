import React from 'react';
import ReactDOM from 'react-dom';
import MapPage from '../../components/MapPage';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';
import * as utilLocation from '../../utils/location';
import sinon from 'sinon';
import socket from '../../socketHandlers/index';
import { Redirect } from 'react-router-dom';
import MapLoader from '../../components/loaders/MapLoader';

describe('src/components/MapPage.jsx', () => {

  afterAll(() => {
    socket.disconnect();
  });

  it('shows MapLoader if startLocation has not been set yet.', () => {
    sinon.stub(utilLocation, 'getCurrentPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);
    });
    sinon.stub(utilLocation, 'watchPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);
    });

    const wrapper = shallow( <MapPage
      users={[]}
      roomId='salkdfjas'
      updateCurrentLocation={() => {}}
    /> );

    expect(wrapper.find(MapLoader).length).toEqual(1);
    utilLocation.getCurrentPosition.restore();
    utilLocation.watchPosition.restore();
  });

  it('shows MapPage if startLocation has already been set.', () => {
    sinon.stub(utilLocation, 'getCurrentPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);

      success(createMockLocation());
    });
    sinon.stub(utilLocation, 'watchPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);
    });

    const wrapper = shallow( <MapPage
      users={[]}
      roomId='salkdfjas'
      updateCurrentLocation={() => {}}
    /> );

    expect(wrapper.find('.mapPage').length).toEqual(1);
    utilLocation.getCurrentPosition.restore();
    utilLocation.watchPosition.restore();
  });

  it('redirects TopPage if props.roomId is undefined.', () => {
    sinon.stub(utilLocation, 'getCurrentPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);
    });
    sinon.stub(utilLocation, 'watchPosition').callsFake(({success, error, options}) => {
      expect(typeof success).toEqual('function');
      expect(typeof error).toEqual('function');
      expect(options).toEqual(undefined);
    });


    const wrapper = shallow( <MapPage
      users={[]}
      updateCurrentLocation={() => {}}
    /> );

    expect(wrapper.find(Redirect).length).toEqual(1);

    utilLocation.getCurrentPosition.restore();
    utilLocation.watchPosition.restore();
  });
});

const createMockLocation = () => ({latitude: 1, longitude: -1});