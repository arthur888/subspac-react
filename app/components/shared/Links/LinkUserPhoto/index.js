import React, { PropTypes } from 'react';
import Relay from 'react-relay/classic';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser } from 'react-icons/lib/fa';
import { getUserProfilePath } from 'utils/path';

const UserIcon = styled(FaUser)`
  font-size: 140px;
  color: rgba(3, 102, 214, 0.54);
`

const LinkUserPhotoBase = ({
  user: { userName, photoUrl },
  relay, // eslint-disable-line no-unused-vars
  ...props
}) => (
  <Link to={getUserProfilePath(userName)}>
    {
      photoUrl ?
        <img
          alt={`@${userName}`}
          src={photoUrl}
          {...props}
        /> :
        <UserIcon {...props} />
    }
  </Link>
)

LinkUserPhotoBase.propTypes = {
  user: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
}

const LinkUserPhoto = Relay.createContainer(LinkUserPhotoBase, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        userName
        photoUrl
      }
    `,
  },
})

export { LinkUserPhoto }
