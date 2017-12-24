import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = (props) => (
  <div>
    <Navbar color="dark" light expand="md">
      <NavbarBrand href="/" className="text-white">Oni On Cheese</NavbarBrand>
    </Navbar>
  </div>
);

export default Header;