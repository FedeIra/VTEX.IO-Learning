import {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  LRUCache,
  method,
  Service,
} from '@vtex/api'

import { Clients } from './clients' // librería de API's de vtex para consumir servicios de vtex
// import { status } from './middlewares/status'
// import { validate } from './middlewares/validate'

import { search } from './middlewares/search'
import { balance } from './middlewares/balance'
import { transactions } from './middlewares/transactions'
import { transactions_update } from './middlewares/transactions_update'
// import { createProduct } from './middlewares/createProduct'

const TIMEOUT_MS = 500 //? 500ms de timeout para las peticiones a los servicios de vtex (API's)

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 }) //? 5000 es el número máximo de elementos que se pueden almacenar en la caché de memoria de la aplicación (5000 peticiones)

metrics.trackCache('status', memoryCache) //? Se registra la caché de memoria para que se pueda monitorear en la consola de métricas de VTEX

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
    transactionData: any //? se declara el tipo de dato que se va a guardar en el state del contexto
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    // Con esto tenemos los puntos de acceso:
    search: method({
      POST: [search],
    }),
    balance: method({
      GET: [balance],
    }),
    transaction: method({
      POST: [transactions, transactions_update], //? se agregan los middlewares que se van a ejecutar en el orden en que se declaran (se ejecuta el primero y luego el segundo)
    }),
    // createProduct: method({
    //   POST: [createProduct],
    // }),
  },
})
