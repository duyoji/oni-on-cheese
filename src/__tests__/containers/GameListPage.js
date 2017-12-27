import GameListPageContainer from '../../containers/GameListPage';
import GameListPageComponent from '../../components/GameListPage';
import socket from '../../socketHandlers/index';

describe('src/containers/App', () => {
  afterAll(() => {
    socket.disconnect();
  });

  it('should includes GameListPage component as a wrapped component.', () => {
    expect(GameListPageContainer.WrappedComponent).toEqual(GameListPageComponent);
  });
});