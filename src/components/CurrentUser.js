import React from 'react';
import Relay from 'react-relay';

import User from './User';

const CurrentUser = (props) => (
  <div>
    <h2>Current User</h2>
    <User user={props.viewer.user} />
  </div>
);

export default Relay.createContainer(CurrentUser, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        user {
          ${User.getFragment('user')}
        }
      }
    `,
  },
});
