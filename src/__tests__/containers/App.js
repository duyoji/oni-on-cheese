import AppContainer from '../../containers/App';
import AppComponent from '../../components/App';


describe('src/containers/App', () => {
  it('should includes App component as a wrapped component.', () => {
    expect(AppContainer.WrappedComponent).toEqual(AppComponent);
  });
});