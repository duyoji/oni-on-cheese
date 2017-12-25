import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = (props) => (
  <header className="appHeader">
    <Navbar color="dark" light expand="md">
      <NavbarBrand href="/" className="text-white">Oni On Cheese</NavbarBrand>
    </Navbar>
  </header>
);

export default Header;