import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Stash from './Stash'

const Stashes = ({
  stashes: { stashes: { edges } },
  relay: { variables },
}) => (
  <div>
    {
      edges.map(({ node, node: { id } }) =>
        <Stash key={id} stash={node} {...variables} />
      )
    }
  </div>
)

Stashes.propTypes = {
  stashes: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
}

export default Relay.createContainer(Stashes, {
  initialVariables: {
    branchHead: 'master',
    userName: null,
    projectName: null,
  },
  fragments: {
    stashes: vars => Relay.QL`
      fragment on Repository {
        stashes(first: 99) {
          edges {
            node {
              id
              ${Stash.getFragment('stash', vars)}
            }
          }
        }
      }
    `,
  },
})