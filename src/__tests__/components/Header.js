import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header';
import { Navbar, NavbarBrand } from 'reactstrap';
import { shallow } from '../helpers/configuredEnzymeWithAdapter';

describe('src/components/Header.jsx', () => {
  it('uses Navbar of reactstrap.', () => {
    const wrapper = shallow( <Header/> );

    expect(wrapper.find(Navbar).length).toEqual(1);
    expect(wrapper.find(NavbarBrand).length).toEqual(1);
  });
});
