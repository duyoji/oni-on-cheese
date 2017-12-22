import MapPageContainer from '../../containers/MapPage';
import MapPageComponent from '../../components/MapPage';

describe('src/containers/MapPage.js', () => {
  it('should includes MapPage component as a wrapped component.', () => {
    expect(MapPageContainer.WrappedComponent).toEqual(MapPageComponent);
  });
});