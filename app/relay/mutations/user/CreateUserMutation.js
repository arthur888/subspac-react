import Relay from 'react-relay/classic';

export class CreateUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createUser }`;
  }

  getVariables() {
    const {
      userName,
      fullName,
      photoUrl,
      emailAddress,
      password,
      provider,
      providerId,
      firebaseId,
      accessToken,
    } = this.props

    return {
      userName,
      fullName: fullName || null,
      photoUrl: photoUrl || null,
      emailAddress: emailAddress || null,
      password,
      provider,
      providerId: providerId || null,
      firebaseId: firebaseId || null,
      accessToken: accessToken || null,
    };
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.user,
        },
      },
    ];
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateUserPayload @relay(pattern: true) {
        user
      }
    `;
  }
}