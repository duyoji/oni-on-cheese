import React, { Component } from 'react';

class Login extends Component {
  render(){
    return (
      <div
        className="fb-login-button"
        data-width="28"
        data-max-rows="1"
        data-size="medium"
        data-button-type="continue_with"
        data-show-faces="false"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div>
    );
  };
}

export default Login;
