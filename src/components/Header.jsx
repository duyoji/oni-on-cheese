import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = (props) => (
  <header className="appHeader">
    <Navbar color="dark" light expand="md">
      <NavbarBrand href="/" className="text-white"><span role="img" aria-label="Oni">👹</span> Oni On Cheese <span role="img" aria-label="Map">🗺</span></NavbarBrand>
    </Navbar>
  </header>
);

export default Header;