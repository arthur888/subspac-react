import Relay from 'react-relay/classic'
import { getToken } from 'utils/firebase'
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
  loggerMiddleware, // eslint-disable-line
} from 'react-relay-network-layer'

window.graph_url = process.env.GRAPHQL_ENDPOINT

const getCustomNetworkLayer = token => new RelayNetworkLayer(
  [
    urlMiddleware({
      url: () => (
        process.env.GRAPHQL_ENDPOINT ||
        'http://terrella-api.com/graphql'
      ),
    }),
    // loggerMiddleware(),
    authMiddleware({
      token,
      prefix: '',
      header: 'f_base',
      tokenRefreshPromise: getToken,
    }),
  ],
  { disableBatchQuery: true },
  next => req => {
    req.credentials = 'same-origin'
    return next(req)
  },
)

class CurrentRelay {
  reset = async cb => {
    const env = new Relay.Environment()
    const token = await getToken()

    env.injectNetworkLayer(getCustomNetworkLayer(token))
    // TODO: remove window binding before pushing to production
    window.Store = this.Store = env
    if (cb) cb()
  }

  fetch = ({ query, force }) => new Promise((resolve, reject) => {
    const args = [
      { query },
      ({ done, error }) => {
        if (done) {
          resolve(this.Store.readQuery(query)[0] || {})
        }

        if (error) {
          reject(error)
        }
      },
    ]

    force
      ? this.Store.forceFetch(...args)
      : this.Store.primeCache(...args)
  })
}

export default new CurrentRelay()
