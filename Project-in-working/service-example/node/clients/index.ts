import type { ClientsConfig } from '@vtex/api'
import { IOClients } from '@vtex/api'
import { Products } from './product'

import Status from './status'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get products() {
    return this.getOrSet('products', Products)
  }
}

const REQUESTS_TIMEOUT = 30000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: REQUESTS_TIMEOUT,
    },
    status: {
      memoryCache,
    },
  },
}
