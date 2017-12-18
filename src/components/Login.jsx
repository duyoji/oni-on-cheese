import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
  }
  
  onClickButton(){
    fetch('/api/login')
      .then((res) => {
        console.log(res);
      })
  }

  render(){
    return (
      <a href="/auth/facebook">Facebook でログイン</a>
    )
  }
}

export default Login;
