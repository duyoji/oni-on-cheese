import React, { Component } from 'react';
import * as hello from 'hellojs'

class Login extends Component {
  constructor(props){
    super(props);
    this.onClickLogin = this.onClickLogin.bind(this);

  }
  
  onClickLogin(){
    hello.init({
      facebook: '1948552805410537',
    }, {
      redirect_uri: '/',
    });
    hello('facebook').login({
      scope: 'email'
    },)
      .then(() => {
        return hello('facebook').api('me')
      })
      .then((res) => {
        console.log(res);
      })
  }
  
  render(){
    return (
      <button onClick={this.onClickLogin}>facebook</button>
    )
  }
}

export default Login;
