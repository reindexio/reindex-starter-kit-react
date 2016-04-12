import { fromCallback } from 'bluebird';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { RelayRouter } from 'react-router-relay';
import { Route, Link, IndexRoute, browserHistory } from 'react-router';
import Reindex from 'reindex-js';
import Auth0Lock from 'auth0-lock';

import Config from './config';

import CurrentUser from './components/CurrentUser';
import AllUsers from './components/AllUsers';
import User from './components/User';

const reindex = new Reindex(Config.REINDEX_URL);
Relay.injectNetworkLayer(reindex.getRelayNetworkLayer());

class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: reindex.isLoggedIn(),
    };
  }

  componentDidMount() {
    reindex.addListener('tokenChange', this.handleTokenChange);
  }

  componentWillUnmount() {
    reindex.removeListener('tokenChange', this.handleTokenChange);
  }

  handleTokenChange = () => {
    this.setState({ isLoggedIn: reindex.isLoggedIn() });
  };

  makeContent() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <h2>Routes</h2>
          <div>
            <Link to="/">Logged-in user</Link>
          </div>
          <div>
            <Link to="/user">All users</Link>
          </div>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          You are not logged-in
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.isLoggedIn ?
           <Link to="/logout">Logout</Link> :
           <Link to="/login">Login</Link>}
        </div>
        {this.makeContent()}
      </div>
    );
  }
}

async function handleLogin(nextState, replace, callback) {
  if (!reindex.isLoggedIn()) {
    try {
      const lock = new Auth0Lock(Config.AUTH0_CLIENT_ID, Config.AUTH0_DOMAIN);
      const auth0Result = await fromCallback(
       (callback) => lock.show({}, callback),
       { multiArgs: true },
      );

      console.log(auth0Result);

      // Login to Reindex
      const reindexResponse = await reindex.loginWithToken(
        'auth0',
        auth0Result[1],
      );
      for (const error of reindexResponse.errors || []) {
        console.log(error);
      }
    } catch (e) {
      console.log(e);
    }
  }

  replace('/');
  callback();
}

function handleLogout() {
  reindex.logout();
  // Clear Relay Store
  document.location.href = '/';
}

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const UserQueries = {
  user: () => Relay.QL`query { userById(id: $userId) }`,
}

ReactDOM.render(
  <RelayRouter history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={CurrentUser} queries={ViewerQueries} />
      <Route path="/user" component={AllUsers} queries={ViewerQueries} />
      <Route path="/user/:userId" component={User} queries={UserQueries} />
      <Route onEnter={handleLogin} path="/login" />
      <Route onEnter={handleLogout} path="/logout" />
    </Route>
  </RelayRouter>,
  document.getElementById('app')
);
