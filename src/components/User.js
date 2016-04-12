import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

const User = (props) => (
  <div>
    User with id {props.user.id}
    {' - '}
    <Link to={`/user/${props.user.id}`} >Go to</Link>
  </div>
);

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
