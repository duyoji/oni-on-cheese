import InputUserNameModalContainer from '../../../containers/modals/InputUserNameModal';
import InputUserNameModalComponent from '../../../components/modals/InputUserNameModal';

describe('src/containers/modals/InputUserNameModal', () => {
  it('should includes InputUserNameModal component as a wrapped component.', () => {
    expect(InputUserNameModalContainer.WrappedComponent).toEqual(InputUserNameModalComponent);
  });
});