import { IOClients } from '@vtex/api'
import Analytics from './analytics'

const THREE_SECONDS_MS = 3 * 1000
const CONCURRENCY = 10

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get analytics() {
    return this.getOrSet('analytics', Analytics)
  }
}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: THREE_SECONDS_MS,
        concurrency: CONCURRENCY,
      },
    },
  },
})
