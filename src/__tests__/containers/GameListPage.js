import GameListPageContainer from '../../containers/GameListPage';
import GameListPageComponent from '../../components/GameListPage';

describe('src/containers/App', () => {
  it('should includes GameListPage component as a wrapped component.', () => {
    expect(GameListPageContainer.WrappedComponent).toEqual(GameListPageComponent);
  });
});