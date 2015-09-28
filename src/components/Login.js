import React, {Component} from 'react';

import Reindex from '../Reindex';

export default class Login extends Component {
  handleLogin = (type) => {
    if (this.props.onLogin) {
      this.props.onLogin(type);
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to Reindex!</h1>
        <div>
          <button onClick={this.handleLogin.bind(this, 'google')}>
            Login with Google
          </button>
        </div>
        <div>
          <button onClick={this.handleLogin.bind(this, 'facebook')}>
            Login with Facebook
          </button>
        </div>
        <div>
          <button onClick={this.handleLogin.bind(this, 'github')}>
            Login with Github
          </button>
        </div>
        <div>
          <button onClick={this.handleLogin.bind(this, 'twitter')}>
            Login with Twitter
          </button>
        </div>
      </div>
    );
  }
}
