import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super(props);
  }
  

  render(){
    return (
      // <a href="http://localhost:9000/auth/facebook">Facebook でログイン</a>
      <a href="http://localhost:9000/auth/github">Github でログイン</a>
    );
  }
}


export default Login;
