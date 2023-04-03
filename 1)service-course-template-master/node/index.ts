import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
  method
} from "@vtex/api";
import { Clients } from "./clients";
import { analytics } from "./handlers/analytics";

import { updateLiveUsers } from "./event/liveUsersUpdate";
import { productList } from "./resolvers/product";

console.log("0) index.ts: Service. Definition of Service");

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 });
metrics.trackCache("status", memoryCache); // This is a function that is used to track the cach of the status of the application. It is used to track the status of the application, which is the status of the application itself, not the status of the data that is being handled by the application.

const THREE_SECONDS_MS = 3 * 1000;
const CONCURRENCY = 10;

declare global {
  type Context = ServiceContext<Clients, State>; //? This is the type of the context that is used in the handlers. It is a ServiceContext, which is a type that is imported from the @vtex/api package. It is a type that has the following fields: Clients, which is the type of the clients that we are using in this application, and State, which is the type of the state that we are using in this application. The State is a type that is defined in this file, and it is an interface that extends the type RecorderState, which is a type that is imported from the @vtex/api package. The RecorderState is a type that has the following fields: code, which is a number, and recording, which is a boolean. The State is an interface that extends the RecorderState, and it adds the field code, which is also a number.

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
  events: {
    liveUsersUpdate: updateLiveUsers
  },
  graphql: {
    resolvers: {
      Query: {
        productList
      }
    }
  },
  routes: {
    analytics: method({
      GET: [analytics]
    })
  }
  //? This is the event handler for the event liveUsersUpdate that we created in the file event/liveUsersUpdate.ts and exported as updateLiveUsers. This is the function that will be called when the event liveUsersUpdate is triggered.
});
