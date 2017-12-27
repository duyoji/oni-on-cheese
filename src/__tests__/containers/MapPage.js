import MapPageContainer from '../../containers/MapPage';
import MapPageComponent from '../../components/MapPage';
import socket from '../../socketHandlers/index';

describe('src/containers/MapPage.js', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should includes MapPage component as a wrapped component.', () => {
    expect(MapPageContainer.WrappedComponent).toEqual(MapPageComponent);
  });
});