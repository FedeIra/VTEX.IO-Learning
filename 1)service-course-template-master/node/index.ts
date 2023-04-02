import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method
} from '@vtex/api';
import { Clients } from './clients';
import { analytics } from './handlers/analytics';

import { updateLiveUsers } from './event/liveUsersUpdate';

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 });
metrics.trackCache('status', memoryCache);

const THREE_SECONDS_MS = 3 * 1000;
const CONCURRENCY = 10;

declare global {
  type Context = ServiceContext<Clients, State>;

  interface State extends RecorderState {
    code: number;
  }
}

export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000
      },
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: THREE_SECONDS_MS,
        concurrency: CONCURRENCY
      }
      //By adding this code to the Service, we are adding to the Client of this Service, the capability to handle events. At this point, we are not yet using the Client itself when handling the event.
    }
  },
  routes: {
    analytics: method({
      GET: [analytics]
    })
  },
  events: {
    liveUsersUpdate: updateLiveUsers
  }
  //? This is the event handler for the event liveUsersUpdate that we created in the file event/liveUsersUpdate.ts and exported as updateLiveUsers. This is the function that will be called when the event liveUsersUpdate is triggered.
});
