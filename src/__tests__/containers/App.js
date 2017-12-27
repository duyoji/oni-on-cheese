import AppContainer from '../../containers/App';
import AppComponent from '../../components/App';
import socket from '../../socketHandlers/index';

describe('src/containers/App', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should includes App component as a wrapped component.', () => {
    expect(AppContainer.WrappedComponent).toEqual(AppComponent);
  });
});