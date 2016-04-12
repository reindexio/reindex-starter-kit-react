import React from 'react';
import Relay from 'react-relay';

import User from './User';

const AllUsers = (props) => (
  <div>
    <h2>All Users</h2>
    <ul>
      {props.viewer.allUsers.edges.map((edge, i) => (
        <li key={i}>
          <User user={edge.node} />
        </li>
      ))}
    </ul>
  </div>
);

export default Relay.createContainer(AllUsers, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        allUsers(first: 10000) {
          edges {
            node {
              ${User.getFragment('user')}
            }
          }
        }
      }
    `,
  },
});
