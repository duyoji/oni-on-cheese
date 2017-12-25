import React from 'react';
import { shallow } from '../../helpers/configuredEnzymeWithAdapter';
import InputUserNameModal from '../../../components/modals/InputUserNameModal';
import { Modal } from 'reactstrap';

describe('src/components/modals/InputUserNameModal.jsx', () => {
  it('shows modal if props.userName is undefined.', () => {
    const wrapper = shallow( <InputUserNameModal
      setUserName={craeteMockFunctionOfSetUserName()}
    /> );

    expect(wrapper.find(Modal).length).toEqual(1);
    expect(wrapper.find(Modal).first().props().isOpen).toEqual(true);
  });

  it('shows nothing if props.userName is defined.', () => {
    const wrapper = shallow( <InputUserNameModal
      setUserName={craeteMockFunctionOfSetUserName()}
      userName={'DUMMY_NAME'}
    /> );

    expect(wrapper.find(Modal).length).toEqual(1);
    expect(wrapper.find(Modal).first().props().isOpen).toEqual(false);
  });
});

const craeteMockFunctionOfSetUserName = (userName) => {};