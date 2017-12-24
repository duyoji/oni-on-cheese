import HeaderContainer from '../../containers/Header';
import HeaderComponent from '../../components/Header';

describe('src/containers/Header', () => {
  it('should includes Header component as a wrapped component.', () => {
    expect(HeaderContainer.WrappedComponent).toEqual(HeaderComponent);
  });
});