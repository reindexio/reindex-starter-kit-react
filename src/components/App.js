import React, {Component} from 'react';
import Relay from 'react-relay';

import Reindex from '../Reindex';
import Profile from './Profile';
import Login from './Login';
import ProfileRoute from '../routes/ProfileRoute';

export default class App extends Component {
  state = { isLoggedIn: Reindex.isLoggedIn() };

  handleLogin = (type) => {
    Reindex.login(type).catch((error) => {
      alert(error.message);
    });
  };

  handleLogout = () => {
    Reindex.logout();
  };

  handleTokenChange = () => {
    this.setState({ isLoggedIn: Reindex.isLoggedIn() });
  };

  componentDidMount() {
    Reindex.addListener('tokenChange', this.handleTokenChange);
  }

  componentWillUnmount() {
    Reindex.removeListener('tokenChange', this.handleTokenChange);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Relay.RootContainer
          Component={Profile}
          route={new ProfileRoute}
          forceFetch={true}
          renderFetched={(data) => {
            return (
              <Profile {...data} onLogout={this.handleLogout} />
            );
          }} />
      );
    } else {
      return (
        <Login onLogin={this.handleLogin} />
      );
    }
  }
}
