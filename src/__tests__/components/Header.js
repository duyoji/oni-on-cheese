import React from 'react'; // eslint-disable-line no-unused-vars
import Header from '../../components/Header'; // eslint-disable-line no-unused-vars
import { Navbar, NavbarBrand } from 'reactstrap';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';

describe('src/components/Header.jsx', () => {
  it('uses Navbar of reactstrap.', () => {
    const wrapper = shallow( <Header/> );

    expect(wrapper.find(Navbar).length).toEqual(1);
    expect(wrapper.find(NavbarBrand).length).toEqual(1);
  });
});
